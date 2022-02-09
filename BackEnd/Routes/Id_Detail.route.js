const express = require('express')
const router = express.Router();
const createError = require('http-errors')
const idDetails = require('../Models/Id_Details.model')
const { idDetailJoi } = require('../helpers/validation_schema')
const { format } = require('date-fns');
const PdfGEN = require('./pdf_gen')


const PDFDocument = require('pdfkit');
const fs = require('fs');


/* multer start */
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${file.fieldname}-${+Date.now()}.${file.originalname.split('.')[1]}`
        );
    }
});

const upload = multer({ storage: storage });


const cpUpload = upload.fields([
    { name: 'image', maxCount: 1 }
]);
/* multer end */

//--------------------User-------------------//

//Id Details Insert
router.post('/id_insert', cpUpload, async (req, res, next) => {

    try {

        // console.log(req.body)
        var item = {
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            photo: req.files?.image[0].path, //photo gets proper string name (without fake path)
            course_enrolled: req.body.course_enrolled
        };

        const result = await idDetailJoi.validateAsync(item, { abortEarly: false }) // Joi validation for incoming id Details. 

        const idData = new idDetails(result)
        const savedIdData = await idData.save()

        res.send({ savedIdData })

    } catch (error) {

        if (error.isJoi === true) {

            let errorMessage = "";
            for (const err of error.details) { //to console all Joi validation error("abort early" required)
                errorMessage += " [ " + err.path.join(" > ") + err.message.slice(err.message.lastIndexOf("\"") + 1) + " ] ";
            }
            error.status = 422
            console.log(errorMessage)
        }
        next(error)
    }
})


router.get('/id_access', async (req, res, next) => {

    try {

        const getId = await idDetails.find()
        res.send(getId)

    } catch (error) {
        next(error)

    }



})



//--------------------Admin-------------------//
router.get('/id_access_admin', async (req, res, next) => {
    try {
        const getId = await idDetails.find({
            "admin_approve": false,
            "admin_reject": false
        })
        res.send(getId)

    } catch (error) {
        next(error)
    }
})

//--------------------Approved List-------------------//
router.get('/approved_list', async (req, res, next) => {
    try {
        const approvedList = await idDetails.find({
            "admin_approve": true,
        })
        res.send(approvedList)

    } catch (error) {
        next(error)
    }
})

router.post('/id_admin_approve', async (req, res, next) => {
    try {
        const id = req.body.item
        const approveId = await idDetails.findOneAndUpdate(
            { "_id": id },
            { "admin_approve": true }
        )
        if (approveId) {
            // createPDF(approveId, id);
            PdfGEN(approveId);

            console.log("success")
        } else {
            console.log("error")
        }

        res.send({ approveId })
    } catch (error) {
        next(error)
    }
})

router.put('/id_admin_reject', async (req, res, next) => {
    try {
        console.log(req.body.item)
        const id = req.body.item
        const rejectId = await idDetails.findOneAndUpdate(
            { "_id": id },
            { "admin_reject": true }
        )

        res.send({ rejectId })

    } catch (error) {
        next(error)
    }
})

//----------------------Download PDF------------------//


//*------------------------sda-----------------------------------pdf make




function createPDF(approveID, path) {
    let doc = new PDFDocument(
        {
            size: 'A4',
            margin: 50
        });

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = day + month + year;

    // const date = new Date();
    // const output = format(date, 'DD.MM.YYYY')
    // console.log(output, typeof (output))




    generateHeader(doc);
    generateBody(doc, approveID);
    generateText(doc, approveID);
    generateFooter(doc, output);


    doc.end();
    doc.pipe(fs.createWriteStream('uploads/pdfs/' + path + '.pdf'));

}

function generateHeader(doc) {
    doc.image('uploads/images/cropped-ict-ico.png', 250, 50, {  //ict logo
        width: 80,
        align: 'center',
        valign: 'center'

    })

        .moveDown()

        .fillColor('#444444')
        .fontSize(20)
        .text('ICT Academy of Kerala', 50, 145, {               //ICT header
            width: 500,
            align: 'center',
        })


        .fontSize(10)
        .text('A Govt. of india Supported & Govt. of Kerala Partnered Social Enterprise', 50, 175, {
            width: 500,
            align: 'center',

        })

        .moveDown()
        .moveDown()


        .fontSize(20)
        .text('Student ID Card', 50, 200, {
            width: 500,                 //Student Id card
            align: 'center',
            underline: true
        })
        .moveDown();
}


function generateBody(doc, approveId) {

    doc.image(approveId.photo, 250, 250, {
        width: 100,
        align: 'center',
        valign: 'center'
    })
        .moveDown()

        .fillColor('#444444')
        .fontSize(20)
        .text(approveId.name, 50, 400, {               //User Name
            width: 500,
            align: 'center',

        })
        .moveDown();

}

function generateText(doc, approveId) {

    doc.fillColor('#444444')
        .fontSize(10)
        .text('is undergoing Microskills Training in Buisness Intelligence with Excel & Tablue with ICT Academy of Kerala from  27 Decemebr 2021', 50, 450, {               //User Name
            width: 500,
            align: 'center',

        })
        .moveDown();

}

function generateFooter(doc, output) {

    doc.image('uploads/images/sign.png', 200, 630, {        //CEO Sign
        fit: [250, 75],
        align: 'center',
        valign: 'center'
    })
        .fontSize(15)
        .text('CEO, ICT Academy of Kerala', 190, 700, {     //CEO Name
            align: 'center'
        })
        .image('uploads/images/stamp.png', 40, 680, {       //Office Stamp
            width: 75,
            align: 'left',
        })

        .moveDown()

        .fontSize(10)
        .text(                                              //Valid date
            'Valid Till:' + output,
            50,
            780,
            { align: 'center', width: 500 },
        );
}









module.exports = router;