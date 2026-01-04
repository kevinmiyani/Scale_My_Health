import { format } from "date-fns";

export const prescriptionToHtml = (data) => {

    const medicine = data?.medicine?.length > 0 ? `
        <div class="section-title">Medicines</div>
        <table class="medications">
            <tr>
                <th>No</th>
                <th width="45%">Name</th>
                <th>Dose</th>
                <th>Duration</th>
                <th>Time</th>
            </tr>
            <tr>
                ${data?.medicine?.map((item, index) => '<tr><td>' + (index + 1) + '</td><td>' + item?.name + '</td><td>' + item?.frequency + '</td><td>' + item?.duration + '</td><td>' + item?.time + '</td></tr>')}
            </tr>
        </table>
    `.replaceAll('>,<', '><') : '';

    const labPrescriptions = data?.labPrescriptions?.length ? `
        <div class="section-title">Lab Tests</div>
        <table class="labtest">
            <tr>
                ${data?.labPrescriptions?.map((item) => '<th>' + item?.title + '</th>')}
            </tr>
            <tr>
                ${data?.labPrescriptions?.map((item) => '<td>' + item?.content + '</td>')}
            </tr>
        </table>
    `.replaceAll('>,<', '><') : '';

    const dietaryInstructions = data?.dietaryInstructions?.length > 0 ? `
        <div class="section-title">Dietary Instructions</div>
            <ul>
                ${data?.dietaryInstructions?.map((item) => '<li>' + item + '</li>')}
            </ul>
    `.replaceAll('>,<', '><') : '';

    return `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: #FFFFFF;
                }
                .container {
                    max-width: 850px;
                    background: white;
                    padding: 25px;
                    border-radius: 12px;
                    margin: 20px auto;
                }
                .header {
                    display: flex;
                    align-items: center;
                    border-bottom: 3px solid #007bff;
                    padding-bottom: 15px;
                    margin-bottom: 20px;
                    gap: 15px;
                }
                .doctor-info h4 {
                    color: rgba(232, 98, 48, 1);
                    margin: 0;
                    font-weight: bold;
                    font-size: 25px;
                }
                .text-muted {
                    color: rgba(206, 206, 206, 1);
                    font-size: 12px;
                    text-align: right;
                }
                .doctor-info{
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                }
                .doctor-info p {
                    margin: 0;
                    color:  rgba(200, 200, 200, 1);
                    font-size: 14px;  
                }
                .patient-info {
                    border-radius: 10px;
                    text-align: right;
                    margin-bottom: 15px;
                }
                .section-title {
                    font-weight: bold;
                    border-bottom: 2px solid rgba(251, 239, 227, 1);
                    color: black;
                    padding: 8px;
                    margin-top: 20px;
                    margin-bottom: 10px;
                }
                .medications {
                    width: 100%;
                    border-collapse: collapse;
                }
                .medications th, .medications td {
                    border-bottom: 1px solid rgba(245, 245, 245, 1);
                    padding: 8px 10px;
                    font-size: 12px;
                    text-align: left;
                    color: black;
                }
                .medications th {
                    border-top: 1px solid rgba(245, 245, 245, 1);
                    background: rgba(245, 245, 245, 1) !important;
                    font-weight: bold;
                    font-size: 14px;
                }
                .footer {
                    text-align: center;
                    font-size: 14px;
                    color: gray;
                    margin-top: 20px;
                    padding-top: 10px;
                    border-top: 2px solid #ddd;
                }
                ul{
                    font-size: 12px;
                    margin: 0px;
                    color: black;
                }
                li{
                    padding: 5px;
                }
                .inner-section-title{
                    font-size: 12px;
                    flex-direction: row;
                    display: flex;
                    padding: 10px;
                    border: 1px solid rgba(206, 206, 206, 1);
                    margin-top: 10px;
                    border-radius: 10px;
                }
                .labtest {
                    width: 100%;
                    border-collapse: collapse;
                }
                .labtest th, .labtest td {
                    border-bottom: 1px solid rgba(245, 245, 245, 1);
                    padding: 8px 10px;
                    font-size: 12px;
                    text-align: left;
                    color: black;
                    vertical-align: top;
                }
                .labtest ul{
                    padding-left: 10px;
                }
                .labtest th {
                    border-top: 1px solid rgba(245, 245, 245, 1);
                    background: rgba(245, 245, 245, 1) !important;
                    font-weight: bold;
                    font-size: 14px;
                }
                img{
                    width: 60px;
                    aspect-ratio: 1/1;
                    border-radius: 50%;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <img src="${data?.doctor?.image}" alt="Doctor">
                    <div class="doctor-info">
                        <h4>Dr ${data?.doctor?.firstName} ${data?.doctor?.lastName}</h4>
                        <p>${data?.doctor?.designation}</p>
                    </div>
                    <div>
                        <p class="text-muted" style="font-size: 10px;">Written On ${format(new Date(data?.updatedAt), 'dd MMM yyyy').toString()}</p>
                        <p class="text-muted">${data?._id}</p>
                    </div>
                </div>

                <!-- Patient Info -->
                <div class="patient-info">
                    <strong>Patient Name:</strong> ${data?.prescribeFor} <br>
                </div>

                <!-- Prescription Table -->
                ${medicine}

                <!-- Lab Tests -->
               ${labPrescriptions}

                <!-- Dietary Instructions -->
                ${dietaryInstructions}
                <!-- Footer -->
                <div class="footer">
                </div>
            </div>
        </body>
        </html>
    `;
}