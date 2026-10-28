const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const {checkForAuthentication, restrictTo} = require("./middlewares/auth");

const URL = require('./models/url');
const app = express();
const PORT = 8001;

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log('MongoDB Connected !!'));

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/", checkForAuthentication, staticRoute);
app.use("/user", userRoute);

app.get("/test", async (req, res) => {
    const allUrls = await URL.find();
    return res.render("home", {
        urls: allUrls,
    });
});

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    );
    if (!entry) {
        return res.status(404).json({ error: 'URL not found' });
    }
    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`));