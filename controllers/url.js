const shortid  = require("shortid");
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {

    const body = req.body;
    if(!body.url) return res.status(400).json({ error: 'url is required' })
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user.id,
    });

    return res.render("home", {
        id: shortID,
    })
    // return res.json({ id: shortID});
}

async function handleGetAnalytics(req, res) {
    console.log ("req.params \n", req.params);
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    if (!entry) {
        return res.status(404).json({ error: 'URL not found' });
    }
    return res.json({ totalVisits: entry.visitHistory.length, visitHistory: entry.visitHistory });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};