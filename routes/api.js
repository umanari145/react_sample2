const express = require("express");
const router = express.Router();
const { google } = require("googleapis");

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

/* GET users listing. */
router.get("/videos/search/:keyword", async (req, res, next) => {
  try {
    const { keyword } = req.params;
    const { pageToken } = req.query;

    // APIにGETリクエストを送信
    const {
      data: { items: idItems, nextPageToken },
    } = await youtube.search.list({
      part: "id",
      q: keyword,
      type: "video",
      maxResults: 20,
      pageToken,
    });

    const ids = idItems.map(({ id: { videoId } }) => videoId);
    const {
      data: { items },
    } = await youtube.videos.list({
      part: "statistics,snippet",
      id: ids.join(","),
    });

    res.json({ items, nextPageToken });
  } catch (error) {
    // エラー処理
    res.status(500).send("Error occurred: " + error.message);
  }
});

module.exports = router;
