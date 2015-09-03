import url from "url";
import osmosis from "osmosis";

class AllegroCrawler {
    search(query, done) {
        let link = "http://allegro.pl/listing/listing.php?order=t&string=" + encodeURIComponent(query);

        this._searchAllPages(link, (err, data) => {
            done(err, data);
        });
    }

    _searchAllPages(link, done) {
        let allPagesData = {
            results: []
        };

        this._searchPage(link, (err, pageData) => {
            if (err) {
                done(err);
                return;
            }

            allPagesData.results = allPagesData.results.concat(pageData.results);

            if (pageData.nextLink) {
                this._searchAllPages(pageData.nextLink, (err, nextPagesData) => {
                    if (err) {
                        done(err);
                        return;
                    }

                    allPagesData.results = allPagesData.results.concat(nextPagesData.results);

                    done(null, allPagesData);
                });
            }
            else {
                done(null, allPagesData);
            }
        });
    }

    _searchPage(link, done) {
        let pageData = {
            results: [],
            nextLink: null
        };

        let instance = osmosis
            .get(link)
            .config({
                "tries": 8,
                "open_timeout": 60000,
                "follow_max": 8
            })
            // .log(console.log)
            .error((err) => {
                // console.error(err);

                instance.stop();
                done(err);
            })
            .doc()
            .find("section.offers article.offer")
            .set({
                "productTitle": ".details header h2 span",
                "productLink": ".details header h2 a @href",
                "ownerName": ".products .user .uname a",
                "ownerLink": ".products .user .uname a @href"
            })
            .then((context, data, next) => {
                pageData.results.push({
                    "productTitle": data.productTitle || null,
                    "productLink": data.productLink && url.resolve(link, data.productLink) || null,
                    "ownerName": data.ownerName || null,
                    "ownerLink": data.ownerLink && url.resolve(link, data.ownerLink) || null
                });
                next(context, {});
            })
            .doc()
            .set({
                "nextLink": ".pager-top .pager-nav .next a @href"
            })
            .then((context, data, next) => {
                pageData.nextLink = data.nextLink && url.resolve(link, data.nextLink) || null;
                next(context, {});
            })
            .done(() => {
                done(null, pageData);
            });
    }
}

AllegroCrawler.service = () => new AllegroCrawler();
AllegroCrawler.service.$inject = [];

export default AllegroCrawler;
