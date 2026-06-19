// Each registerTestCase() is one decodingInfo() or encodingInfo() query.
// worker: true also runs the case in a worker.

var WEBRTC_VIDEO = { width: 1280, height: 720, bitrate: 2000000, framerate: 30 };
var FILE_VIDEO = { width: 1920, height: 1080, bitrate: 5000000, framerate: 30 };
var WEBRTC_H264 =
  "video/H264;profile-level-id=42e01f;packetization-mode=1;level-asymmetry-allowed=1";

registerTestCase({
  name: "decode-webrtc-video-vp8",
  kind: "decode",
  worker: true,
  config: { type: "webrtc", video: { ...WEBRTC_VIDEO, contentType: "video/VP8" } },
});
registerTestCase({
  name: "decode-webrtc-video-vp9",
  kind: "decode",
  worker: true,
  config: { type: "webrtc", video: { ...WEBRTC_VIDEO, contentType: "video/VP9" } },
});
registerTestCase({
  name: "decode-webrtc-video-h264",
  kind: "decode",
  worker: true,
  config: { type: "webrtc", video: { ...WEBRTC_VIDEO, contentType: WEBRTC_H264 } },
});
registerTestCase({
  name: "decode-webrtc-video-av1",
  kind: "decode",
  worker: true,
  config: { type: "webrtc", video: { ...WEBRTC_VIDEO, contentType: "video/AV1" } },
});
registerTestCase({
  name: "decode-webrtc-audio-opus",
  kind: "decode",
  worker: true,
  config: { type: "webrtc", audio: { contentType: "audio/opus" } },
});
registerTestCase({
  name: "decode-webrtc-audio-g722",
  kind: "decode",
  worker: true,
  config: { type: "webrtc", audio: { contentType: "audio/G722" } },
});
registerTestCase({
  name: "decode-webrtc-audio-pcmu",
  kind: "decode",
  worker: true,
  config: { type: "webrtc", audio: { contentType: "audio/PCMU" } },
});
registerTestCase({
  name: "decode-webrtc-audio-pcma",
  kind: "decode",
  worker: true,
  config: { type: "webrtc", audio: { contentType: "audio/PCMA" } },
});

registerTestCase({
  name: "encode-webrtc-video-vp8",
  kind: "encode",
  worker: true,
  config: { type: "webrtc", video: { ...WEBRTC_VIDEO, contentType: "video/VP8" } },
});
registerTestCase({
  name: "encode-webrtc-video-vp9",
  kind: "encode",
  worker: true,
  config: { type: "webrtc", video: { ...WEBRTC_VIDEO, contentType: "video/VP9" } },
});
registerTestCase({
  name: "encode-webrtc-video-h264",
  kind: "encode",
  worker: true,
  config: { type: "webrtc", video: { ...WEBRTC_VIDEO, contentType: WEBRTC_H264 } },
});
registerTestCase({
  name: "encode-webrtc-video-av1",
  kind: "encode",
  worker: true,
  config: { type: "webrtc", video: { ...WEBRTC_VIDEO, contentType: "video/AV1" } },
});
registerTestCase({
  name: "encode-webrtc-audio-opus",
  kind: "encode",
  worker: true,
  config: { type: "webrtc", audio: { contentType: "audio/opus" } },
});
registerTestCase({
  name: "encode-webrtc-audio-g722",
  kind: "encode",
  worker: true,
  config: { type: "webrtc", audio: { contentType: "audio/G722" } },
});
registerTestCase({
  name: "encode-webrtc-audio-pcmu",
  kind: "encode",
  worker: true,
  config: { type: "webrtc", audio: { contentType: "audio/PCMU" } },
});
registerTestCase({
  name: "encode-webrtc-audio-pcma",
  kind: "encode",
  worker: true,
  config: { type: "webrtc", audio: { contentType: "audio/PCMA" } },
});

// The file and media-source video paths create a real decoder, so they are far
// slower and use fewer iterations. Only one (AVC) also runs in a worker.
registerTestCase({
  name: "decode-file-video-avc",
  kind: "decode",
  iterations: 10,
  worker: true,
  config: { type: "file", video: { ...FILE_VIDEO, contentType: 'video/mp4; codecs="avc1.640028"' } },
});
registerTestCase({
  name: "decode-file-video-vp9",
  kind: "decode",
  iterations: 10,
  config: { type: "file", video: { ...FILE_VIDEO, contentType: 'video/webm; codecs="vp09.00.41.08"' } },
});
registerTestCase({
  name: "decode-file-audio-aac",
  kind: "decode",
  config: { type: "file", audio: { contentType: 'audio/mp4; codecs="mp4a.40.2"' } },
});
registerTestCase({
  name: "decode-media-source-video-avc",
  kind: "decode",
  iterations: 10,
  config: { type: "media-source", video: { ...FILE_VIDEO, contentType: 'video/mp4; codecs="avc1.640028"' } },
});
