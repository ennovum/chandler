var gulp = require("gulp");

var config = require("./gulpconfig.js");

var jobs = {
    run: require("./gulp/jobs/run.js"),
    exec: require("./gulp/jobs/exec.js"),
    copy: require("./gulp/jobs/copy.js"),
    watch: require("./gulp/jobs/watch.js"),
    babel: require("./gulp/jobs/babel.js"),
    webpack: require("./gulp/jobs/webpack.js"),
    sass: require("./gulp/jobs/sass.js"),
    eslint: require("./gulp/jobs/eslint.js")
};

var src = config.path.root + config.dir.src;
var dev = config.path.root + config.dir.dev;
var dist = config.path.root + config.dir.dist;

var client = config.dir.client;
var server = config.dir.server;
var shared = config.dir.shared;

gulp.task("client.documents", jobs.copy(src + client + "/*.html", dev + client + "/"));
gulp.task("client.documents:watch", jobs.watch(src + client + "/*.html", {tasks: ["client.documents"]}));

gulp.task("client.scripts", jobs.webpack(src + client + "/*.js", dev + client + "/", {target: "web"}));
gulp.task("client.scripts:watch", jobs.webpack(src + client + "/*.js", dev + client + "/", {target: "web", watch: true}));
gulp.task("client.scripts:lint", jobs.eslint(src + client + "/**/*.js"));

gulp.task("client.styles", jobs.sass(src + client + "/*.scss", dev + client + "/"));
gulp.task("client.styles:watch", jobs.watch(src + client + "/**/*.scss", {tasks: ["client.styles"]}));

gulp.task("client:build", jobs.run(["client.documents", "client.scripts", "client.styles"]));
gulp.task("client:watch", jobs.run(["client.documents:watch", "client.scripts:watch", "client.styles:watch"]));
gulp.task("client:lint", jobs.run(["client.scripts:lint"]));

gulp.task("server.scripts", jobs.babel(src + server + "/**/*.js", dev + server + "/"));
gulp.task("server.scripts:watch", jobs.watch(src + server + "/*.js", {tasks: ["server.scripts"]}));
gulp.task("server.scripts:lint", jobs.eslint(src + server + "/**/*.js"));

gulp.task("server:build", jobs.run(["server.scripts"]));
gulp.task("server:watch", jobs.run(["server.scripts:watch"]));
gulp.task("server:lint", jobs.run(["server.scripts:lint"]));
gulp.task("server:start", jobs.exec("node", [dev + server + "/index.js"]));

gulp.task("shared.scripts", jobs.babel(src + shared + "/**/*.js", dev + shared + "/"));
gulp.task("shared.scripts:watch", jobs.watch(src + shared + "/*.js", {tasks: ["shared.scripts"]}));
gulp.task("shared.scripts:lint", jobs.eslint(src + shared + "/**/*.js"));

gulp.task("shared:build", jobs.run(["shared.scripts"]));
gulp.task("shared:watch", jobs.run(["shared.scripts:watch"]));
gulp.task("shared:lint", jobs.run(["shared.scripts:lint"]));

gulp.task("build", jobs.run(["client:build", "server:build", "shared:build"]));
gulp.task("server", jobs.run(["server:start"]));
gulp.task("start", jobs.run(["client:build", "server:build", "shared:build"], "server:start"));
gulp.task("dev", jobs.run(["client:build", "server:build", "shared:build"], "server:start", ["client:watch", "server:watch", "shared:watch"]));
gulp.task("lint", jobs.run(["client:lint"], ["server:lint"], ["shared:lint"]));
gulp.task("test", jobs.run(["lint"]));
