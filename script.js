function extractEmails() {
    const text = document.getElementById('inputText').value;
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = text.match(emailPattern);

    const output = document.getElementById('outputEmails');
    output.innerHTML = '';

    if (emails) {
        emails.forEach(email => {
            const emailElement = document.createElement('div');
            emailElement.textContent = email;
            output.appendChild(emailElement);
        });
        document.getElementById('copyButton').style.display = 'block';
    } else {
        output.textContent = 'No email addresses found.';
        document.getElementById('copyButton').style.display = 'none';
    }
}

function clearData() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputEmails').innerHTML = '';
    document.getElementById('copyButton').style.display = 'none';
}

function copyEmails() {
    const output = document.getElementById('outputEmails');
    const range = document.createRange();
    range.selectNode(output);
    window.getSelection().removeAllRanges(); 
    window.getSelection().addRange(range);
    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        alert('Copying text command was ' + msg);
    } catch (err) {
        alert('Oops, unable to copy');
    }
    window.getSelection().removeAllRanges();
}