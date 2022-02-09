
module.exports = function pdfGEN(approveID) {

    try {

        console.log("entered try block")


        const PDFDocument = require('pdfkit');
        const fs = require('fs');

        const doc = new PDFDocument({
            layout: 'landscape',
            size: 'A4',
        });

        // Helper to move to next line
        function jumpLine(doc, lines) {
            for (let index = 0; index < lines; index++) {
                doc.moveDown();
            }
        }

        doc.pipe(fs.createWriteStream('uploads/pdfs/' + approveID._id + '.pdf'));


        doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');

        doc.fontSize(10);

        // Margin
        const distanceMargin = 18;

        doc
            .fillAndStroke('#021c27')
            .lineWidth(2)
            .lineJoin('round')
            .rect(
                distanceMargin,
                distanceMargin,
                doc.page.width - distanceMargin * 2,
                doc.page.height - distanceMargin * 2,
            )
            .stroke();

        //! ------------------------- Header
        const maxWidth = 100;
        const maxHeight = 50;

        doc.image('uploads/images/cropped-ict-ico.png', doc.page.width / 2 - maxWidth / 2, 60, {
            fit: [maxWidth, maxHeight],
            align: 'center',
        });

        jumpLine(doc, 5)

        doc.fontSize(20)
            .fill('#021c27')
            .text('ICT ACADEMY OF KERALA', {
                align: 'center',
            });

        // jumpLine(doc, 1)

        doc.fontSize(10)
            .fill('#021c27')
            .text('A Govt. of india Supported & Govt. of Kerala Partnered Social Enterprise', {
                align: 'center',
            });

        jumpLine(doc, 2)

        //!---------------------------------- Content
        doc.fontSize(16)
            .fill('#021c27')
            .text('STUDENT ID CARD', {
                align: 'center',
                underline:true
            });

        jumpLine(doc, 1)


        doc.image(approveID.photo, doc.page.width / 2 - 50, 220, {
            fit: [100, 200],
            align: 'center',
        });



        jumpLine(doc, 8)

        doc.fontSize(24)
            .fill('#021c27')
            .text(approveID.name, {
                align: 'center',
            });

        jumpLine(doc, 1)

        doc
            .fontSize(10)
            .fill('#021c27')
            .text('is undergoing Microskills Training in Buisness Intelligence with Excel & Tablue with ICT Academy of Kerala from  27 Decemeber 2021 ', {
                align: 'center',
            });

        // jumpLine(doc, 8)

        doc.lineWidth(1);

        //!----------------------------- Signatures
        const lineSize = 174;
        const signatureHeight = 500;

        const startLine1 = 128;
        const endLine1 = 128 + lineSize;


        const startLine2 = endLine1 + 32;
        const endLine2 = startLine2 + lineSize;

        const startLine3 = endLine2 + 32;



        doc

            .fontSize(10)
            .fill('#021c27')
            .text('Office Stamp', startLine1, signatureHeight + 10, {
                columns: 1,
                columnGap: 0,
                height: 40,
                width: lineSize,
                align: 'center',
            });

        doc
            .fontSize(10)
            .fill('#021c27')
            .text('ICT Academy of Kerala', startLine1, signatureHeight + 25, {
                columns: 1,
                columnGap: 0,
                height: 40,
                width: lineSize,
                align: 'center',
            });



        doc

            .fontSize(10)
            .fill('#021c27')
            .text('CEO', startLine3, signatureHeight + 10, {
                columns: 1,
                columnGap: 0,
                height: 40,
                width: lineSize,
                align: 'center',
            });

        doc
            .fontSize(10)
            .fill('#021c27')
            .text('ICT Academy of Kerala', startLine3, signatureHeight + 25, {
                columns: 1,
                columnGap: 0,
                height: 40,
                width: lineSize,
                align: 'center',
            });


        jumpLine(doc, 4)

        // Footer

        const link = 'Valid Upto:';

        const linkWidth = doc.widthOfString(link);
        const linkHeight = doc.currentLineHeight();


        const bottomHeight = doc.page.height - 150;

        doc
            .text(link, doc.page.width / 2 - 30, bottomHeight, 448,
                linkWidth,
                linkHeight
            );

        doc.end();


    } catch (error) {
        console.log("catch error", error)

    }



}