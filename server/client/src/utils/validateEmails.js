const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {

    const invalidEmails = emails
        .split(',')
        .map(e => e.trim())
        .filter(e => emailRegex.test(e) === false)

    if (invalidEmails.length) {
        return `Invalid emails: ${invalidEmails}`;
    }

    return null;
}