var gulp = require("gulp");

var config = require("./gulpconfig.js");

var jobs = {
    run: require("./gulp/jobs/run.js"),
    exec: require("./gulp/jobs/exec.js"),
    copy: require("./gulp/jobs/copy.js"),
    watch: require("./gulp/jobs/watch.js"),
    babel: require("./gulp/jobs/babel.js"),
    webpack: require("./gulp/jobs/webpack.js"),
    nodepack: require("./gulp/jobs/nodepack.js"),
    sass: require("./gulp/jobs/sass.js"),
    eslint: require("./gulp/jobs/eslint.js"),
    mocha: require("./gulp/jobs/mocha.js")
};

var src = config.path.root + config.dir.src;
var dev = config.path.root + config.dir.dev;
var test = config.path.root + config.dir.test;
var dist = config.path.root + config.dir.dist;

var client = config.dir.client;
var server = config.dir.server;
var shared = config.dir.shared;

gulp.task("client.documents:build", jobs.copy(src + client + "/*.html", dev + client + "/"));
gulp.task("client.documents:dev", jobs.watch(src + client + "/*.html", {tasks: ["client.documents:build"]}));

gulp.task("client.scripts:build", jobs.webpack(src + client + "/*.js", dev + client + "/", {target: "web"}));
gulp.task("client.scripts:dev", jobs.webpack(src + client + "/*.js", dev + client + "/", {target: "web", watch: true}));
gulp.task("client.scripts:lint", jobs.eslint(src + client + "/**/*.js"));

gulp.task("client.styles:build", jobs.sass(src + client + "/*.scss", dev + client + "/"));
gulp.task("client.styles:dev", jobs.watch(src + client + "/**/*.scss", {tasks: ["client.styles:build"]}));

gulp.task("client:build", jobs.run(["client.documents:build", "client.scripts:build", "client.styles:build"]));
gulp.task("client:dev", jobs.run(["client.documents:dev", "client.scripts:dev", "client.styles:dev"]));
gulp.task("client:lint", jobs.run("client.scripts:lint"));

gulp.task("client-test:build", jobs.webpack(src + client + "/**/*.test.js", test + client + "/", {target: "web"}));
gulp.task("client-test:start", jobs.mocha(test + client + "/**/*.js"));
gulp.task("client-test:dev", jobs.watch(src + client + "/**/*.test.js", {tasks: ["client-test:build", "client-test:start"]}));

gulp.task("server.scripts:build", jobs.nodepack(src + server + "/*.js", dev + server + "/", {target: "node"}));
gulp.task("server.scripts:dev", jobs.nodepack(src + server + "/*.js", dev + server + "/", {target: "node", watch: true}));
gulp.task("server.scripts:lint", jobs.eslint(src + server + "/**/*.js"));

gulp.task("server:build", jobs.run("server.scripts:build"));
gulp.task("server:dev", jobs.run("server.scripts:dev"));
gulp.task("server:lint", jobs.run("server.scripts:lint"));
gulp.task("server:start", jobs.exec("node", [dev + server + "/index.js"]));

gulp.task("server-test:build", jobs.nodepack(src + server + "/**/*.test.js", test + server + "/", {target: "node"}));
gulp.task("server-test:start", jobs.mocha(test + server + "/**/*.js"));
gulp.task("server-test:dev", jobs.watch(src + server + "/**/*.test.js", {tasks: ["server-test:build", "server-test:start"]}));

gulp.task("build", jobs.run(["client:build", "server:build"]));
gulp.task("server", jobs.run("server:start"));
gulp.task("start", jobs.run(["client:build", "server:build"], "server:start"));
gulp.task("dev", jobs.run(["client:dev", "server:dev"], "server:start", ["client-test:dev", "server-test:dev"]));
gulp.task("lint", jobs.run("client:lint", "server:lint"));
gulp.task("test", jobs.run("lint", ["client-test:build", "server-test:build"], ["client-test:start", "server-test:start"]));
