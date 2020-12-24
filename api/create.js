const AirtablePlus = require('airtable-plus');

module.exports = async (req, res) => {
    if (req.query.baseid && req.query.tablename && req.query.body) {
        const airtable = new AirtablePlus({
            baseID: req.query.baseid,
            apiKey: process.env.AIRTABLE_API_KEY,
            tableName: req.query.tablename,
        });
        let aiRes = await airtable.create(JSON.parse(req.query.body));
        res.json({
            status: 200,
            message: `Created record ${aiRes.id}`,
            req: req.query,
            res: aiRes,
        });
    } else {
        res.json({
            status: 400,
            message: 'Malformed request.',
            req: req.query,
        });
    }
}