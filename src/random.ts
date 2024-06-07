const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

function generate12CharUUID() {
    // Generate a UUID
    const uuid = uuidv4();
    
    // Convert UUID to a buffer
    const buffer = Buffer.from(uuid.replace(/-/g, ''), 'hex');
    
    // Encode the buffer to base64 and remove padding
    const base64UUID = buffer.toString('base64').replace(/=/g, '');
    
    // Trim the base64 string to 12 characters
    const shortUUID = base64UUID.substring(0, 12);
    
    return shortUUID;
}

// Example usage
const uniqueID = generate12CharUUID();
console.log(uniqueID);
