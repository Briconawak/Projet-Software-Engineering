const sql = require('./db.js');

async function initDB() {
    await sql`
    CREATE TABLE IF NOT EXISTS messages (
        channel VARCHAR(36) NOT NULL CHECK (LENGTH(channel) >= 1 AND LENGTH(channel) <= 36),
        username VARCHAR(36) NOT NULL CHECK (LENGTH(username) >= 1 AND LENGTH(username) <= 36),
        body VARCHAR(512) NOT NULL CHECK (LENGTH(body) >= 1 AND LENGTH(body) <= 512),
        created_at TIMESTAMP NOT NULL
    );
  `;
}

async function resetDB() {
    await sql`DROP TABLE IF EXISTS messages;`;
}

/**
 * Fonction pour récupérer les messages d'un canal spécifique avec pagination.
 * @param {string} channelName - Nom du canal.
 * @param {number} page - Numéro de la page (0 pour la première page, 1 pour la deuxième, etc.).
 * @returns {Promise<Array>} - Liste des messages.
 */
async function getChannelMessages(channelName, page = 0) {
    const limit = 50;
    const offset = page * limit;

    try {
        const messages = await sql`
        SELECT channel, username, body,
                (created_at AT TIME ZONE 'UTC') AT TIME ZONE 'Europe/Paris' AS created_at
        FROM messages
        WHERE channel = ${channelName}
        ORDER BY created_at DESC
        LIMIT ${limit}
        OFFSET ${offset};
      `;
        return messages;
    } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
        throw error;
    }
}

/**
 * Fonction pour insérer un message dans un canal donné.
 * @param {string} channel - Nom du canal.
 * @param {object} param1 - Objet contenant le nom de l'utilisateur et le message.
 * @param {string} param1.username - Nom de l'utilisateur.
 * @param {string} param1.body - Contenu du message.
 * @returns {Promise<void>}
 */
async function insertChannelMessage(channel, { username, body, createdAt = new Date() }) {
    console.log('Inserting message:', { channel, username, body, createdAt });
    try {
        await sql`
        INSERT INTO messages (channel, username, body, created_at)
        VALUES (${channel}, ${username}, ${body}, (${createdAt} AT TIME ZONE 'Europe/Paris'));
      `;
        console.log('Message inséré avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'insertion du message:', error);
        throw error;
    }
}


module.exports = {
    initDB,
    resetDB,
    getChannelMessages,
    insertChannelMessage,
};