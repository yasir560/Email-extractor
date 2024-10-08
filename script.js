function extractEmails() {
    const inputTextArea = document.getElementById('inputText');
    const text = inputTextArea.value;

    // Updated regex pattern to match emails with specific domains and remove trailing letters
    const emailPattern = /([A-Za-z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com))/g;
    const emails = text.match(emailPattern) || []; // Use empty array if no match

    const output = document.getElementById('outputEmails');
    const emailCountElement = document.getElementById('emailCount');
    output.innerHTML = '';

    // Remove duplicates
    const uniqueEmails = [...new Set(emails)];

    if (uniqueEmails.length > 0) {
        // Display each email with its serial number in the output container
        uniqueEmails.forEach((email, index) => {
            const emailElement = document.createElement('div');
            emailElement.className = 'output-email'; // Add class for styling
            emailElement.textContent = `${index + 1}. ${email}`;  // Serial number + email
            output.appendChild(emailElement);
        });

        emailCountElement.textContent = `Emails Extracted: ${uniqueEmails.length}`;
        document.getElementById('copyButton').style.display = 'block';
    } else {
        output.textContent = 'No valid email addresses found.';
        emailCountElement.textContent = 'Emails Extracted: 0';
        document.getElementById('copyButton').style.display = 'none';
    }
}

function clearData() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputEmails').innerHTML = '';
    document.getElementById('emailCount').textContent = 'Emails Extracted: 0';
    document.getElementById('copyButton').style.display = 'none';
}

function copyEmails() {
    const output = document.getElementById('outputEmails');
    let emailsText = '';

    // Extract all text content (emails) from the output div
    const emails = output.querySelectorAll('.output-email');
    emails.forEach(emailDiv => {
        emailsText += emailDiv.textContent + '\n'; // Add each email with its serial number
    });

    // Copy the extracted emails to clipboard
    if (emailsText) {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = emailsText;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
            alert('Copying emails was ' + msg);
        } catch (err) {
            alert('Oops, unable to copy');
        }
        document.body.removeChild(tempTextArea); // Remove the temporary textarea
    } else {
        alert('No emails to copy!');
    }
}
