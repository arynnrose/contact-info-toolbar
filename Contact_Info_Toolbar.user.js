// ==UserScript==
// @name         Contact Info Toolbar AUTO BUTTON IN SETTINGS
// @namespace    https://manage.wallstjobs.com/
// @version      9.6.448
// @description  Version 9.6 toolbar with only the Name detection pipeline restored from 9.9.15.
// @match        *://manage.wallstjobs.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @connect      raw.githubusercontent.com
// @connect      iwznzjgvlthyqsnxrbyo.supabase.co
// @updateURL    https://raw.githubusercontent.com/arynnrose/contact-info-toolbar/main/Contact_Info_Toolbar.user.js
// @downloadURL  https://raw.githubusercontent.com/arynnrose/contact-info-toolbar/main/Contact_Info_Toolbar.user.js
// @run-at       document-idle
// ==/UserScript==


// Tampermonkey compatibility layer for the original Firefox extension APIs.
const __FRT_AREA_CODE_LOOKUP = {"201":{"city":"Jersey City","state":"NJ"},"202":{"city":"Washington","state":"DC"},"203":{"city":"New Haven","state":"CT"},"205":{"city":"Birmingham","state":"AL"},"206":{"city":"Seattle","state":"WA"},"207":{"city":"Portland","state":"ME"},"208":{"city":"Boise","state":"ID"},"209":{"city":"Stockton","state":"CA"},"210":{"city":"San Antonio","state":"TX"},"212":{"city":"New York","state":"NY"},"213":{"city":"Los Angeles","state":"CA"},"214":{"city":"Dallas","state":"TX"},"215":{"city":"Philadelphia","state":"PA"},"216":{"city":"Cleveland","state":"OH"},"217":{"city":"Springfield","state":"IL"},"218":{"city":"Duluth","state":"MN"},"220":{"city":"Columbus","state":"OH"},"224":{"city":"Elgin","state":"IL"},"225":{"city":"Baton Rouge","state":"LA"},"228":{"city":"Gulfport","state":"MS"},"229":{"city":"Albany","state":"GA"},"231":{"city":"Muskegon","state":"MI"},"234":{"city":"Akron","state":"OH"},"239":{"city":"Fort Myers","state":"FL"},"240":{"city":"Rockville","state":"MD"},"248":{"city":"Troy","state":"MI"},"251":{"city":"Mobile","state":"AL"},"252":{"city":"Greenville","state":"NC"},"253":{"city":"Tacoma","state":"WA"},"254":{"city":"Waco","state":"TX"},"256":{"city":"Huntsville","state":"AL"},"260":{"city":"Fort Wayne","state":"IN"},"262":{"city":"Racine","state":"WI"},"267":{"city":"Philadelphia","state":"PA"},"269":{"city":"Kalamazoo","state":"MI"},"270":{"city":"Bowling Green","state":"KY"},"272":{"city":"Scranton","state":"PA"},"276":{"city":"Danville","state":"VA"},"281":{"city":"Houston","state":"TX"},"301":{"city":"Silver Spring","state":"MD"},"302":{"city":"Wilmington","state":"DE"},"303":{"city":"Denver","state":"CO"},"304":{"city":"Charleston","state":"WV"},"305":{"city":"Miami","state":"FL"},"307":{"city":"Cheyenne","state":"WY"},"308":{"city":"Grand Island","state":"NE"},"309":{"city":"Peoria","state":"IL"},"310":{"city":"Los Angeles","state":"CA"},"312":{"city":"Chicago","state":"IL"},"313":{"city":"Detroit","state":"MI"},"314":{"city":"St. Louis","state":"MO"},"315":{"city":"Syracuse","state":"NY"},"316":{"city":"Wichita","state":"KS"},"317":{"city":"Indianapolis","state":"IN"},"318":{"city":"Shreveport","state":"LA"},"319":{"city":"Cedar Rapids","state":"IA"},"320":{"city":"St. Cloud","state":"MN"},"321":{"city":"Orlando","state":"FL"},"323":{"city":"Los Angeles","state":"CA"},"325":{"city":"Abilene","state":"TX"},"330":{"city":"Akron","state":"OH"},"331":{"city":"Aurora","state":"IL"},"334":{"city":"Montgomery","state":"AL"},"336":{"city":"Greensboro","state":"NC"},"337":{"city":"Lafayette","state":"LA"},"339":{"city":"Boston","state":"MA"},"346":{"city":"Houston","state":"TX"},"347":{"city":"New York","state":"NY"},"351":{"city":"Lowell","state":"MA"},"352":{"city":"Gainesville","state":"FL"},"360":{"city":"Vancouver","state":"WA"},"361":{"city":"Corpus Christi","state":"TX"},"364":{"city":"Owensboro","state":"KY"},"380":{"city":"Columbus","state":"OH"},"385":{"city":"Salt Lake City","state":"UT"},"386":{"city":"Lake City","state":"FL"},"401":{"city":"Providence","state":"RI"},"402":{"city":"Omaha","state":"NE"},"404":{"city":"Atlanta","state":"GA"},"405":{"city":"Oklahoma City","state":"OK"},"406":{"city":"Billings","state":"MT"},"407":{"city":"Orlando","state":"FL"},"408":{"city":"San Jose","state":"CA"},"409":{"city":"Beaumont","state":"TX"},"410":{"city":"Baltimore","state":"MD"},"412":{"city":"Pittsburgh","state":"PA"},"413":{"city":"Springfield","state":"MA"},"414":{"city":"Milwaukee","state":"WI"},"415":{"city":"San Francisco","state":"CA"},"417":{"city":"Springfield","state":"MO"},"419":{"city":"Toledo","state":"OH"},"423":{"city":"Chattanooga","state":"TN"},"424":{"city":"Los Angeles","state":"CA"},"425":{"city":"Bellevue","state":"WA"},"430":{"city":"Texarkana","state":"TX"},"432":{"city":"Odessa","state":"TX"},"434":{"city":"Lynchburg","state":"VA"},"435":{"city":"St. George","state":"UT"},"440":{"city":"Cleveland","state":"OH"},"442":{"city":"San Diego","state":"CA"},"443":{"city":"Baltimore","state":"MD"},"458":{"city":"Eugene","state":"OR"},"463":{"city":"Indianapolis","state":"IN"},"469":{"city":"Dallas","state":"TX"},"470":{"city":"Atlanta","state":"GA"},"475":{"city":"Bridgeport","state":"CT"},"478":{"city":"Macon","state":"GA"},"479":{"city":"Fort Smith","state":"AR"},"501":{"city":"Little Rock","state":"AR"},"502":{"city":"Louisville","state":"KY"},"503":{"city":"Portland","state":"OR"},"504":{"city":"New Orleans","state":"LA"},"505":{"city":"Albuquerque","state":"NM"},"507":{"city":"Rochester","state":"MN"},"508":{"city":"Worcester","state":"MA"},"509":{"city":"Spokane","state":"WA"},"510":{"city":"Oakland","state":"CA"},"512":{"city":"Austin","state":"TX"},"513":{"city":"Cincinnati","state":"OH"},"515":{"city":"Des Moines","state":"IA"},"516":{"city":"Hempstead","state":"NY"},"517":{"city":"Lansing","state":"MI"},"518":{"city":"Albany","state":"NY"},"520":{"city":"Tucson","state":"AZ"},"530":{"city":"Redding","state":"CA"},"531":{"city":"Omaha","state":"NE"},"534":{"city":"Eau Claire","state":"WI"},"539":{"city":"Tulsa","state":"OK"},"540":{"city":"Roanoke","state":"VA"},"541":{"city":"Eugene","state":"OR"},"551":{"city":"Jersey City","state":"NJ"},"559":{"city":"Fresno","state":"CA"},"561":{"city":"West Palm Beach","state":"FL"},"562":{"city":"Long Beach","state":"CA"},"563":{"city":"Davenport","state":"IA"},"567":{"city":"Toledo","state":"OH"},"570":{"city":"Scranton","state":"PA"},"571":{"city":"Arlington","state":"VA"},"573":{"city":"Columbia","state":"MO"},"574":{"city":"South Bend","state":"IN"},"580":{"city":"Enid","state":"OK"},"585":{"city":"Rochester","state":"NY"},"586":{"city":"Warren","state":"MI"},"601":{"city":"Jackson","state":"MS"},"602":{"city":"Phoenix","state":"AZ"},"603":{"city":"Manchester","state":"NH"},"605":{"city":"Sioux Falls","state":"SD"},"606":{"city":"Ashland","state":"KY"},"607":{"city":"Binghamton","state":"NY"},"608":{"city":"Madison","state":"WI"},"609":{"city":"Trenton","state":"NJ"},"610":{"city":"Allentown","state":"PA"},"612":{"city":"Minneapolis","state":"MN"},"614":{"city":"Columbus","state":"OH"},"615":{"city":"Nashville","state":"TN"},"616":{"city":"Grand Rapids","state":"MI"},"617":{"city":"Boston","state":"MA"},"618":{"city":"Belleville","state":"IL"},"619":{"city":"San Diego","state":"CA"},"620":{"city":"Hutchinson","state":"KS"},"623":{"city":"Glendale","state":"AZ"},"626":{"city":"Pasadena","state":"CA"},"628":{"city":"San Francisco","state":"CA"},"629":{"city":"Nashville","state":"TN"},"630":{"city":"Naperville","state":"IL"},"631":{"city":"Brentwood","state":"NY"},"636":{"city":"St. Charles","state":"MO"},"641":{"city":"Mason City","state":"IA"},"646":{"city":"New York","state":"NY"},"650":{"city":"San Mateo","state":"CA"},"651":{"city":"St. Paul","state":"MN"},"657":{"city":"Anaheim","state":"CA"},"660":{"city":"Sedalia","state":"MO"},"661":{"city":"Bakersfield","state":"CA"},"662":{"city":"Tupelo","state":"MS"},"667":{"city":"Baltimore","state":"MD"},"669":{"city":"San Jose","state":"CA"},"678":{"city":"Atlanta","state":"GA"},"681":{"city":"Charleston","state":"WV"},"682":{"city":"Fort Worth","state":"TX"},"701":{"city":"Fargo","state":"ND"},"702":{"city":"Las Vegas","state":"NV"},"703":{"city":"Arlington","state":"VA"},"704":{"city":"Charlotte","state":"NC"},"706":{"city":"Augusta","state":"GA"},"707":{"city":"Santa Rosa","state":"CA"},"708":{"city":"Cicero","state":"IL"},"712":{"city":"Sioux City","state":"IA"},"713":{"city":"Houston","state":"TX"},"714":{"city":"Anaheim","state":"CA"},"715":{"city":"Eau Claire","state":"WI"},"716":{"city":"Buffalo","state":"NY"},"717":{"city":"Harrisburg","state":"PA"},"718":{"city":"New York","state":"NY"},"719":{"city":"Colorado Springs","state":"CO"},"720":{"city":"Denver","state":"CO"},"724":{"city":"New Castle","state":"PA"},"725":{"city":"Las Vegas","state":"NV"},"727":{"city":"St. Petersburg","state":"FL"},"730":{"city":"Chicago","state":"IL"},"731":{"city":"Jackson","state":"TN"},"732":{"city":"New Brunswick","state":"NJ"},"734":{"city":"Ann Arbor","state":"MI"},"737":{"city":"Austin","state":"TX"},"740":{"city":"Columbus","state":"OH"},"743":{"city":"Greensboro","state":"NC"},"747":{"city":"Los Angeles","state":"CA"},"754":{"city":"Fort Lauderdale","state":"FL"},"757":{"city":"Virginia Beach","state":"VA"},"760":{"city":"Oceanside","state":"CA"},"762":{"city":"Columbus","state":"GA"},"763":{"city":"Plymouth","state":"MN"},"765":{"city":"Muncie","state":"IN"},"769":{"city":"Jackson","state":"MS"},"770":{"city":"Atlanta","state":"GA"},"772":{"city":"Port St. Lucie","state":"FL"},"773":{"city":"Chicago","state":"IL"},"774":{"city":"Worcester","state":"MA"},"775":{"city":"Reno","state":"NV"},"779":{"city":"Rockford","state":"IL"},"781":{"city":"Lynn","state":"MA"},"785":{"city":"Topeka","state":"KS"},"786":{"city":"Miami","state":"FL"},"801":{"city":"Salt Lake City","state":"UT"},"802":{"city":"Burlington","state":"VT"},"803":{"city":"Columbia","state":"SC"},"804":{"city":"Richmond","state":"VA"},"805":{"city":"Oxnard","state":"CA"},"806":{"city":"Amarillo","state":"TX"},"808":{"city":"Honolulu","state":"HI"},"810":{"city":"Flint","state":"MI"},"812":{"city":"Evansville","state":"IN"},"813":{"city":"Tampa","state":"FL"},"814":{"city":"Erie","state":"PA"},"815":{"city":"Joliet","state":"IL"},"816":{"city":"Kansas City","state":"MO"},"817":{"city":"Fort Worth","state":"TX"},"818":{"city":"Los Angeles","state":"CA"},"828":{"city":"Asheville","state":"NC"},"830":{"city":"New Braunfels","state":"TX"},"831":{"city":"Salinas","state":"CA"},"832":{"city":"Houston","state":"TX"},"838":{"city":"Albany","state":"NY"},"843":{"city":"Charleston","state":"SC"},"845":{"city":"Poughkeepsie","state":"NY"},"847":{"city":"Evanston","state":"IL"},"848":{"city":"New Brunswick","state":"NJ"},"850":{"city":"Tallahassee","state":"FL"},"856":{"city":"Camden","state":"NJ"},"857":{"city":"Boston","state":"MA"},"858":{"city":"La Jolla","state":"CA"},"859":{"city":"Lexington","state":"KY"},"860":{"city":"Hartford","state":"CT"},"862":{"city":"Newark","state":"NJ"},"863":{"city":"Lakeland","state":"FL"},"864":{"city":"Greenville","state":"SC"},"865":{"city":"Knoxville","state":"TN"},"870":{"city":"Jonesboro","state":"AR"},"872":{"city":"Chicago","state":"IL"},"878":{"city":"Pittsburgh","state":"PA"},"901":{"city":"Memphis","state":"TN"},"903":{"city":"Tyler","state":"TX"},"904":{"city":"Jacksonville","state":"FL"},"906":{"city":"Marquette","state":"MI"},"907":{"city":"Anchorage","state":"AK"},"908":{"city":"Elizabeth","state":"NJ"},"909":{"city":"Riverside","state":"CA"},"910":{"city":"Fayetteville","state":"NC"},"912":{"city":"Savannah","state":"GA"},"913":{"city":"Overland Park","state":"KS"},"914":{"city":"White Plains","state":"NY"},"915":{"city":"El Paso","state":"TX"},"916":{"city":"Sacramento","state":"CA"},"917":{"city":"New York","state":"NY"},"918":{"city":"Tulsa","state":"OK"},"919":{"city":"Raleigh","state":"NC"},"920":{"city":"Green Bay","state":"WI"},"925":{"city":"Concord","state":"CA"},"928":{"city":"Yuma","state":"AZ"},"929":{"city":"New York","state":"NY"},"931":{"city":"Clarksville","state":"TN"},"936":{"city":"Conroe","state":"TX"},"937":{"city":"Dayton","state":"OH"},"938":{"city":"Huntsville","state":"AL"},"940":{"city":"Denton","state":"TX"},"941":{"city":"Sarasota","state":"FL"},"947":{"city":"Troy","state":"MI"},"949":{"city":"Irvine","state":"CA"},"951":{"city":"Riverside","state":"CA"},"952":{"city":"Bloomington","state":"MN"},"954":{"city":"Fort Lauderdale","state":"FL"},"956":{"city":"McAllen","state":"TX"},"959":{"city":"Hartford","state":"CT"},"970":{"city":"Fort Collins","state":"CO"},"971":{"city":"Portland","state":"OR"},"972":{"city":"Dallas","state":"TX"},"973":{"city":"Newark","state":"NJ"},"975":{"city":"St. Louis","state":"MO"},"979":{"city":"Bryan","state":"TX"},"980":{"city":"Charlotte","state":"NC"},"981":{"city":"Seattle","state":"WA"},"984":{"city":"Raleigh","state":"NC"},"985":{"city":"Houma","state":"LA"},"989":{"city":"Saginaw","state":"MI"}};

const browser = {
    storage: {
        local: {
            async get(keys) {
                if (keys == null) return {};
                if (typeof keys === "string") {
                    return { [keys]: GM_getValue(keys) };
                }
                if (Array.isArray(keys)) {
                    const result = {};
                    for (const key of keys) result[key] = GM_getValue(key);
                    return result;
                }
                if (typeof keys === "object") {
                    const result = {};
                    for (const [key, defaultValue] of Object.entries(keys)) {
                        result[key] = GM_getValue(key, defaultValue);
                    }
                    return result;
                }
                return {};
            },
            async set(values) {
                for (const [key, value] of Object.entries(values || {})) {
                    GM_setValue(key, value);
                }
            }
        }
    },
    runtime: {
        async sendMessage(message) {
            if (message && message.action === "getAreaCodes") {
                return __FRT_AREA_CODE_LOOKUP;
            }
            return undefined;
        }
    }
};

const NAME_PREFIXES = new Set(["DE","DE LA","DE LOS","DE LAS","DE LEON","DEL","DELA","DA","DI","DOS","DAS","DU","LA","LAS","LOS","LE","VAN","VAN DE","VAN DEN","VAN DER","VON","BIN","IBN","AL","EL","ST","ST.","O'","D'","MAC","MC","SAN"]);

// v111 COMPLETE COMPOUND SURNAME BOUNDARIES:
// Some phrases in NAME_PREFIXES can also be a complete surname by themselves.
// "De Leon" is the important case: in a flattened header such as
// "Robert De Leon Green Valley, AZ", do not consume "Green" as another surname
// token just because it follows the recognized "De Leon" phrase.
const COMPLETE_COMPOUND_SURNAMES = new Set(["DE LEON"]);

function splitName(fullName) {
    if (!fullName) return { first: "", last: "" };

    const tokens = fullName.trim().split(/\s+/);
    if (tokens.length === 1) {
        return { first: toProper(tokens[0]), last: "" };
    }

    let lastParts=[tokens[tokens.length-1]];
    let i=tokens.length-2;
    while(i>=1){
        const single=tokens[i].toUpperCase();
        const pair=(tokens[i]+" "+lastParts[0]).toUpperCase();
        if(NAME_PREFIXES.has(pair)||NAME_PREFIXES.has(single)){
            lastParts.unshift(tokens[i]);
            i--;
        }else break;
    }
    return {
        first: tokens.slice(0,i+1).map(toProper).join(" "),
        last: lastParts.map(toProper).join(" ")
    };
}
function toProper(word) {
    if (!word) return word;

    // Handle hyphenated names
    if (word.includes("-")) {
        return word
            .split("-")
            .map(part => toProper(part))
            .join("-");
    }

    word = word.toLowerCase();
    word = word.charAt(0).toUpperCase() + word.slice(1);

    // Apostrophes: O'Connor
    word = word.replace(/(['’])([a-z])/g, (_, ap, c) => ap + c.toUpperCase());

    // v137: Keep the special Mc capitalization, but DO NOT automatically
    // capitalize the letter after "Mac". Cities such as Macon must stay Macon,
    // and surnames default to ordinary title case unless the user has explicitly
    // saved that exact Mac surname capitalization.
    word = word.replace(
        /\b(Mc)([a-z])/g,
        (_, p, c) => p + c.toUpperCase()
    );

    return word;
}



// v35: Canonical display capitalization for names/cities.
// Every whitespace-separated word is normalized independently, while toProper()
// keeps our existing hyphen, apostrophe, Mc/Mac handling.
// Examples:
//   OPA LOCKA -> Opa Locka
//   DE LA CRUZ -> De La Cruz
//   O'CONNOR -> O'Connor
//   MCALLEN -> McAllen
// v432: PDF/Word ligatures are single Unicode characters, not ordinary letters.
// Expand only typographic Latin ligatures before city parsing and ZIP lookup.
function frt7ExpandLatinLigatures(value) {
    return String(value || "").replace(/[ﬀ-ﬆ]/g, ch => ({
        "ﬀ":"ff", "ﬁ":"fi", "ﬂ":"fl", "ﬃ":"ffi",
        "ﬄ":"ffl", "ﬅ":"st", "ﬆ":"st"
    })[ch] || ch);
}

function normalizeContactDisplayCase(value) {
    return frt7ExpandLatinLigatures(value)
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .map(part => toProper(part))
        .join(" ")
        // v332: Preserve possessive apostrophes in place names such as Lee's Summit.
        // Keep O'Connor / D'Angelo capitalization for personal names.
        .replace(/\b([A-Za-z]{2,})['’]S\b/g, "$1's");
}

// v137 LEARNED MAC LAST-NAME CAPITALIZATION
// Default behavior is ordinary title case: Macon, Macdonald, Mackenzie, etc.
// ONLY an exact surname that the user manually types with a capital letter
// immediately after "Mac" is remembered and reused with that capitalization.
const FRT7_MAC_LAST_NAME_CASE_KEY = "frt7_learned_mac_last_name_case_v137";

function normalizeMacLastNameCaseKey(value) {
    return normalizeUnicode(String(value || ""))
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .replace(/\s+/g, " ")
        .trim();
}

function readLearnedMacLastNameCases() {
    try {
        const raw = GM_getValue(FRT7_MAC_LAST_NAME_CASE_KEY, "{}");
        const parsed = typeof raw === "string" ? JSON.parse(raw || "{}") : raw;
        return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_) {
        return {};
    }
}

function writeLearnedMacLastNameCases(db) {
    GM_setValue(FRT7_MAC_LAST_NAME_CASE_KEY, JSON.stringify(db || {}));
}

function applyLearnedMacLastNameCase(value) {
    const normal = normalizeContactDisplayCase(value);
    if (!normal) return normal;
    const key = normalizeMacLastNameCaseKey(normal);
    const learned = readLearnedMacLastNameCases()[key];
    return learned?.name ? String(learned.name) : normal;
}

function learnManualMacLastNameCase(value) {
    const typed = String(value || "").replace(/\s+/g, " ").trim();
    if (!typed) return false;

    // Only surnames whose first word starts Mac + another letter are relevant.
    // A capital fourth letter (MacDonald) is an explicit exception to remember.
    const firstWord = typed.split(/\s+/)[0] || "";
    if (!/^Mac[A-Za-zÀ-ÖØ-öø-ÿ]/.test(firstWord)) return false;

    const key = normalizeMacLastNameCaseKey(typed);
    if (!key) return false;

    const db = readLearnedMacLastNameCases();
    if (/^Mac[A-ZÀ-ÖØ-Þ]/.test(firstWord)) {
        db[key] = { name: typed, learnedAt: Date.now(), source: "manual-last-name-edit" };
        writeLearnedMacLastNameCases(db);
        return true;
    }

    // If the user deliberately changes a previously learned exception back to
    // ordinary Mac... casing, remove that exact exception.
    if (Object.prototype.hasOwnProperty.call(db, key)) {
        delete db[key];
        writeLearnedMacLastNameCases(db);
        return true;
    }
    return false;
}

function triggerEvents(el) {
    ["input","change","blur","keyup"].forEach(t=>{
        el.dispatchEvent(new Event(t,{bubbles:true}));
    });
}

function normalizeUnicode(str) {
    return frt7ExpandLatinLigatures(str)
        .normalize("NFC")      // keep accented characters intact
        .replace(/\u200B/g, ""); // remove zero-width junk if present
}

// v301 SYNCHRONOUS AREA FALLBACK:
// The complete built-in area-code table is already bundled in this userscript.
// Do not start this as null and wait for the compatibility sendMessage round-trip:
// the ZIP-mismatch repair treats fillLocationFromPhone() as successful unless it
// explicitly returns false, so the old async-loading branch could return before
// City/State were actually changed. That is how Madison, KY could remain while
// WallStJobs changed only ZIP to 20000.
// Start with the bundled table so Area writes City/State/clears ZIP immediately.
let AREA_CODE_LOOKUP = __FRT_AREA_CODE_LOOKUP;



// --- Smart plural correction ---
// Removes trailing "s" ONLY when:
// 1) The corrected form is a known common last name, AND
// 2) The original isn't hyphenated, AND
// 3) The original doesn't end with “ss”, “us”, “is”, “os”
function smartFixLastName(last) {
    if (!last) return last;

    // NEVER alter hyphenated names here
    if (last.includes("-")) return last;

    const lower = last.toLowerCase();

    // Endings where removing S is unsafe
    if (/(ss|us|is|os)$/i.test(lower)) return last;

    // If it doesn't end with s → keep
    if (!lower.endsWith("s")) return last;

    // Try singular version
    const singular = last.slice(0, -1);

    // Common last names list (high accuracy safety net)
    const COMMON_LAST_NAMES = new Set([
        "smith","johnson","williams","brown","jones","garcia","miller","davis",
        "rodriguez","martinez","hernandez","lopez","gonzalez","wilson","anderson",
        "thomas","taylor","moore","jackson","martin","lee","perez","thompson",
        "white","harris","sanchez","clark","ramirez","lewis","robinson","walker",
        "young","allen","king","wright","scott","torres","nguyen","hill","flores",
        "green","adams","baker","nelson","hall","rivera","campbell","mitchell",
        "carter","roberts","gomez","phillips","evans","turner","diaz","parker",
        "cruz","edwards","collins","stewart","morris","rogers","reed","cook",
        "morgan","bell","murphy","bailey","cooper","richardson","cox","howard",
        "ward","torres","peterson","gray","ramsey","chapman","grant","mendez",
        "wheeler","dawson" // ← includes Dawson
    ]);

    // If the singular is in common names → fix it
    if (COMMON_LAST_NAMES.has(singular.toLowerCase())) {
        return singular.charAt(0).toUpperCase() + singular.slice(1).toLowerCase();
    }

    // Otherwise, keep as-is
    return last;
}


// v98 OCR EMAIL NO-TOUCH GUARD:
// If the resume contains a domain that looks like a one-character OCR/typing
// corruption of a famous provider (gmaii.com vs gmail.com, icioud.com vs
// icloud.com, gmial.com vs gmail.com, etc.), do NOT guess/correct it. The
// Email button and Auto Email must leave the site's existing contact email alone.
const OCR_GUARDED_EMAIL_PROVIDERS = new Set([
    "gmail", "googlemail", "yahoo", "ymail", "outlook", "hotmail", "live", "msn",
    "aol", "icloud", "appleid"
]);

function isSingleTranspositionAway(a, b) {
    if (a.length !== b.length || a === b) return false;
    const diffs = [];
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) diffs.push(i);
        if (diffs.length > 2) return false;
    }
    return diffs.length === 2 &&
        diffs[1] === diffs[0] + 1 &&
        a[diffs[0]] === b[diffs[1]] &&
        a[diffs[1]] === b[diffs[0]];
}

function isObviousOcrEmailDomainIssue(email) {
    const value = String(email || "").trim().toLowerCase();
    const at = value.lastIndexOf("@");
    if (at < 0) return false;

    const domain = value.slice(at + 1).replace(/[),;:]+$/g, "");

    // v282 HARD iCLOUD OCR GUARD:
    // OCR frequently reads the lowercase "l" in icloud as "i", producing
    // "icioud.com". Never allow that (or the common 1/l variant) to become
    // the applicant contact email. This shared guard protects BOTH Auto Email
    // and the manual Email button.
    if (/^(?:icioud|ic1oud)\.com$/i.test(domain)) {
        console.info(`Toolbar EMAIL v282: blocked OCR-corrupted iCloud domain "${domain}".`);
        return true;
    }
    const m = domain.match(/^([a-z0-9-]+)(?:\.(com|co))?$/i);
    if (!m) return false;

    const label = m[1].toLowerCase();
    if (OCR_GUARDED_EMAIL_PROVIDERS.has(label)) return false;

    for (const provider of OCR_GUARDED_EMAIL_PROVIDERS) {
        // Conservative by design: same-length one-character substitutions
        // (including OCR lookalikes such as i/l/1 or o/0) and adjacent swaps.
        // This catches the obvious cases without treating legitimate domains such
        // as mail.com as mistakes simply because they resemble gmail.com.
        if (label.length !== provider.length) continue;

        let diffCount = 0;
        for (let i = 0; i < label.length; i++) {
            if (label[i] !== provider[i]) diffCount++;
            if (diffCount > 1) break;
        }
        if (diffCount === 1 || isSingleTranspositionAway(label, provider)) {
            return true;
        }
    }

    return false;
}

function sanitizeEmail(email) {
    if (!email) return email;

    let clean = frt7RemoveAppendedWebsite(String(email).trim());

    // v328: A leading hyphen can be captured from flattened resume punctuation.
    // Never allow leading hyphens in an email; preserve internal hyphens.
    clean = clean.replace(/^-+/, "");

    // v71: Resume/site fields sometimes append an internal suffix AFTER a complete
    // email, e.g. "kwilliams511@yahoo.com_1675113". Strip underscore + numeric
    // metadata after ANY normal alphabetic TLD, including multi-part domains such
    // as .co.uk. This shared sanitizer is used by BOTH Auto Email and Email button.
    clean = clean.replace(
        /^(.+@[A-Z0-9.-]+\.[A-Z]{2,24})_\d+.*$/i,
        "$1"
    );

    // Preserve Apple relay addresses before applying ordinary TLD cleanup.
    const apple = clean.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.privaterelay\.appleid\.com/i);
    if (apple) return apple[0].toLowerCase();

    // v97 KNOWN PROVIDER .COM REPAIR:
    // When a very well-known .com mail provider is visibly truncated in the resume,
    // always normalize it to the provider's canonical .com domain. This is shared by
    // BOTH the manual Email button and Auto Email because both pass through sanitizeEmail().
    // Examples:
    //   justyourfriend505@gmail.co -> justyourfriend505@gmail.com
    //   person@yahoo              -> person@yahoo.com
    //   person@outlook.co         -> person@outlook.com
    // Do NOT apply this rule to unknown/custom domains, .edu, or azulmail.net.
    const knownComProviders = new Set([
        "gmail", "googlemail", "yahoo", "ymail", "outlook", "hotmail", "live", "msn",
        "aol", "icloud", "appleid"
    ]);
    const knownProviderMatch = clean.match(/^([^@\s]+)@([A-Z0-9-]+)(?:\.co(?:m)?)?$/i);
    if (knownProviderMatch) {
        const local = knownProviderMatch[1];
        const provider = knownProviderMatch[2].toLowerCase();
        if (knownComProviders.has(provider)) {
            clean = `${local}@${provider}.com`;
        }
    }

    // v42 HARD TLD STOP:
    // Once a recognized email ending is reached, NOTHING after it is allowed
    // to remain in the email, even if the resume flattened the next word
    // directly onto it with no whitespace or punctuation.
    //
    // Example:
    //   douglas.fuller69@gmail.comdouglas  -> douglas.fuller69@gmail.com
    //
    // The old cleanup used a word-boundary after ".com". That fails when the
    // next flattened character is another letter because there is no word
    // boundary between the "m" in ".com" and the "d" in "douglas".
    const atIndex = clean.indexOf("@");
    const domainPart = atIndex >= 0 ? clean.slice(atIndex + 1) : "";
    const hardTld = domainPart.match(/\.(?:com|net|org|edu|gov)/i);
    if (hardTld && typeof hardTld.index === "number") {
        clean = clean.slice(0, atIndex + 1 + hardTld.index + hardTld[0].length);
    }

    // Preserve Apple relay handling, then normalize casing.
    clean = clean.replace(/\.appleid\.com.*$/i, ".appleid.com");
    return clean.toLowerCase();
}

// v413 UNIVERSAL EMAIL/WEBSITE SEPARATION (ALL SOURCES):
// The website can be glued directly after a completed email in the site's
// initial contact field, before Auto Email runs. Remove only an unmistakable
// website tail, never alter the email's own .edu/.com/etc domain.
function frt7RemoveAppendedWebsite(email) {
    const original = String(email || "");
    // www. is an unambiguous beginning of a separate website when it occurs
    // immediately after a complete email TLD (including protected .edu).
    return original.replace(/(\.(?:com|net|org|edu|gov|mil|int|info|biz|io|us|co\.uk|org\.uk))(?:\s*)(?=www\.)www\.[^\s]*/i, "$1");
}
(function frt7GuardEmailWebsiteTail() {
    if (window.top !== window.self) return;
    let busy = false;
    function repair() {
        if (busy) return;
        const input = document.getElementById("txtEmail");
        if (!input) return;
        const before = String(input.value || "");
        const after = frt7RemoveAppendedWebsite(before);
        if (after === before) return;
        busy = true;
        try {
            input.value = after;
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
            console.info(`Toolbar EMAIL v413: removed appended website from existing contact email: "${before}" -> "${after}".`);
        } finally { busy = false; }
    }
    document.addEventListener("input", e => {
        if (e.target?.id === "txtEmail") repair();
    }, true);
    // Also catches the site's initial value and later programmatic repaints,
    // which do not necessarily dispatch input/change events.
    setInterval(repair, 500);
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", repair, { once: true });
    else repair();
})();

// --- Extract from preview iframe first ---
function getEmailFromPreview() {
    try {
        const iframe =
            document.querySelector('iframe[src*="displayresumetext.asp"]') ||
            document.querySelector("#divResumeContainer iframe");
        const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
        const text = doc?.querySelector(".Section1")?.innerText || "";
        const e = extractEmail(text);
        if (e) return e;

        // v273: same inspected Word contact-header fallback for Email.
        for (const img of (doc?.querySelectorAll('img[alt^="Text Box:"]') || [])) {
            const alt = String(img.getAttribute("alt") || "").replace(/^Text Box:\s*/i, "").trim();
            const altEmail = extractEmail(alt);
            if (altEmail) return altEmail;
        }
        return null;
    } catch(e) { return null; }
}

// --- Final email getter ---
function getFinalEmail() {
    const fromPrev = getEmailFromPreview();
    if (fromPrev) return sanitizeEmail(fromPrev);

    const raw = document.getElementById("txtResumeRaw")?.value || "";
    const fromRaw = extractEmail(raw);
    return sanitizeEmail(fromRaw);
}


// v311: Safe resolver for outer Auto helper functions. The full header parser is
// scoped to the inner toolbar initializer; outside it, use its shared trusted lock.
function getAuthoritativeHeaderLocationForAuto(resumeText) {
    try { return typeof frt7GetAuthoritativeHeaderLocation === "function" ? frt7GetAuthoritativeHeaderLocation() : null; }
    catch (_) { return null; }
}

// Floating Resume Toolbar v7
(function () {

// v316: A sequence of three or more full U.S. state names is a territory/list,
// not an applicant City, State address. Preserve string offsets for diagnostics.
function frt7MaskStateListsInHeader(header) {
    const states = Object.keys(STATE_MAP).filter(x => x.length > 2)
        .sort((a,b) => b.length-a.length)
        .map(x => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"));
    const item = "(?:" + states.join("|") + ")";
    const list = new RegExp("\\b" + item + "(?:\\s*,\\s*" + item + "){1,}\\s*,?\\s*(?:and|&)\\s+" + item + "\\b", "gi");
    return String(header || "").replace(list, m => " ".repeat(m.length));
}

// v316: shared validation for both extractPhone and fillPhone.
function isUsableTenDigitPhone(digits) {
    return /^[2-9]\d{9}$/.test(digits) && !/^(\d)\1{9}$/.test(digits) &&
        !digits.startsWith("000") && digits.slice(3,6) !== "000";
}
    const COLLAPSE_KEY = "frt7_settings_collapsed";
    const AUTO_KEY = "frt7_auto_enabled";
    const AUTO_FIELDS_KEY = "frt7_auto_fields";
    const AUTO_FIELDS_LAST_GOOD_KEY = "frt7_auto_fields_last_good_v146";
    const REVERT_FIELDS_KEY = "frt7_revert_fields";
    const NAME_CHANGE_TOAST_ENABLED_KEY = "frt7_name_change_toast_enabled_v200";
    const NAME_CHANGE_TOAST_SIZE_KEY = "frt7_name_change_toast_size_v200";
    const LEARNED_CITIES_KEY = "frt7_learned_cities";
    const CUSTOM_AREA_CODES_KEY = "frt7_custom_area_codes_v105";
    const LEARNED_CITY_CORRECTIONS_KEY = "frt7_learned_city_corrections";
    const LEARNED_CITIES_SINGLE_DB_KEY = "frt7_learned_cities_single_db_v59";
    const US_CITY_DB_CACHE_KEY = "frt7_us_city_database_cache_v124";
    const US_CITY_DB_OVERRIDES_KEY = "frt7_us_city_database_overrides_v124";
    const US_CITY_DB_SOURCE = "https://raw.githubusercontent.com/mattonweb/us-cities-by-state/refs/heads/main/data/us-cities.csv";
    const SAFE_FIRST_NAMES_KEY = "frt7_safe_multiword_first_names_v43";
    const REJECTED_AUTO_NAMES_KEY = "frt7_rejected_auto_names"; // legacy migration source only
    const REJECTED_AUTO_NAMES_CANONICAL_KEY = "frt7_rejected_auto_names_v3";
    const REJECTED_AUTO_NAMES_SINGLE_DB_KEY = "frt7_rejected_names_single_db_v24";
    const REJECTED_AUTO_NAMES_DELETED_KEY = "frt7_rejected_auto_names_deleted";
    const REJECTED_AUTO_NAMES_DELETED_SHARED_KEY = "frt7_rejected_auto_names_deleted_shared_v2";
    // v23: brand-new authoritative blacklist. This is deliberately separate from
    // the rejected-name database and the older deletion/tombstone keys.
    const REJECTED_AUTO_NAMES_PERMANENT_BLACKLIST_KEY = "frt7_rejected_names_permanent_blacklist_v23";
    const REJECTED_AUTO_NAMES_PERMANENT_BLACKLIST_LOCAL_KEY = "frt7_rejected_names_permanent_blacklist_v23_local";
    const FRT7_BUILD_ID = "9.6.367-update-test";
    const AUTO_SOUND_ENABLED_KEY = "frt7_auto_sound_enabled_v244";
    const AUTO_SOUND_TYPE_KEY = "frt7_auto_sound_type_v244";
    const AUTO_SOUND_VOLUME_KEY = "frt7_auto_sound_volume_v244";
    const AUTO_SOUND_DURATION_KEY = "frt7_auto_sound_duration_v244";
    const AUTO_SOUND_TRIGGERS_KEY = "frt7_auto_sound_triggers_v245";


    // v290 LIGHTWEIGHT PERSISTENT DIAGNOSTIC LOG
    // Records the toolbar's existing decision messages and contact-field before/after
    // snapshots per applicant. It deliberately does NOT rescan the resume, trap property
    // setters, or add a fast polling loop, so it is safe to leave enabled all day.
    const FRT7_DIAG_SESSION_KEY = "frt7_diag_session_v290";
    const FRT7_DIAG_POS_KEY = "frt7_diag_button_pos_v290";
    const FRT7_DIAG_MAX_APPLICANTS = 40;
    const FRT7_DIAG_MAX_EVENTS = 240;
    let frt7DiagRecords = [];
    let frt7DiagSaveTimer = null;
    let frt7DiagButton = null;
    let frt7DiagPanel = null;

    function frt7DiagSafeSnapshot() {
        try {
            const first = String(document.getElementById("txtFirstNameDataEntry")?.value || document.getElementById("txtFirstName")?.value || "");
            const last = String(document.getElementById("txtLastNameDataEntry")?.value || document.getElementById("txtLastName")?.value || "");
            return {
                name: `${first} ${last}`.replace(/\s+/g, " ").trim(),
                email: String(document.getElementById("txtEmail")?.value || ""),
                phone: String(document.getElementById("txtPhoneDataEntry")?.value || document.getElementById("txtPhone")?.value || ""),
                city: String(document.getElementById("txtCityDataEntry")?.value || ""),
                state: String(document.getElementById("txtStateDataEntry")?.value || ""),
                zip: String(document.getElementById("txtZipDataEntry")?.value || "")
            };
        } catch (_) { return {}; }
    }

    function frt7DiagApplicantId() {
        try { return String(getCurrentApplicantId?.() || "unknown"); } catch (_) { return "unknown"; }
    }

    function frt7DiagLoad() {
        try {
            const parsed = JSON.parse(sessionStorage.getItem(FRT7_DIAG_SESSION_KEY) || "[]");
            frt7DiagRecords = Array.isArray(parsed) ? parsed.slice(-FRT7_DIAG_MAX_APPLICANTS) : [];
        } catch (_) { frt7DiagRecords = []; }
    }

    function frt7DiagSaveSoon() {
        if (frt7DiagSaveTimer) return;
        frt7DiagSaveTimer = setTimeout(() => {
            frt7DiagSaveTimer = null;
            try { sessionStorage.setItem(FRT7_DIAG_SESSION_KEY, JSON.stringify(frt7DiagRecords.slice(-FRT7_DIAG_MAX_APPLICANTS))); } catch (_) {}
        }, 500);
    }

    function frt7DiagRecordForCurrent(create = true) {
        const appId = frt7DiagApplicantId();
        let rec = frt7DiagRecords.length ? frt7DiagRecords[frt7DiagRecords.length - 1] : null;
        if (rec && rec.appId === appId) return rec;
        if (!create) return null;
        rec = { appId, started: new Date().toISOString(), initial: frt7DiagSafeSnapshot(), events: [], latest: frt7DiagSafeSnapshot() };
        frt7DiagRecords.push(rec);
        if (frt7DiagRecords.length > FRT7_DIAG_MAX_APPLICANTS) frt7DiagRecords.splice(0, frt7DiagRecords.length - FRT7_DIAG_MAX_APPLICANTS);
        frt7DiagSaveSoon();
        return rec;
    }

    function frt7DiagAdd(message, level = "INFO") {
        try {
            const rec = frt7DiagRecordForCurrent(true);
            const now = new Date();
            rec.latest = frt7DiagSafeSnapshot();
            rec.events.push({ t: now.toLocaleTimeString(), level, message: String(message || "") });
            if (rec.events.length > FRT7_DIAG_MAX_EVENTS) rec.events.splice(0, rec.events.length - FRT7_DIAG_MAX_EVENTS);
            frt7DiagSaveSoon();
            if (frt7DiagPanel?.style.display !== "none") frt7DiagRender();
        } catch (_) {}
    }

    function frt7DiagFormatRecord(rec) {
        const fmt = o => `Name: ${o?.name || "(blank)"}\nEmail: ${o?.email || "(blank)"}\nPhone: ${o?.phone || "(blank)"}\nCity/State/ZIP: ${o?.city || "(blank)"}, ${o?.state || "(blank)"} ${o?.zip || "(blank)"}`;
        return [
            `========== APPLICANT ${rec.appId} ==========`,
            `Started: ${rec.started}`,
            `--- INITIAL CONTACT INFO ---`, fmt(rec.initial),
            `--- PROCESS ---`,
            ...(rec.events.length ? rec.events.map(e => `[${e.t}] ${e.level}: ${e.message}`) : ["(no toolbar decisions captured)"]),
            `--- LATEST CONTACT INFO ---`, fmt(rec.latest),
            `=========================================`
        ].join("\n");
    }

    function frt7DiagRender() {
        if (!frt7DiagPanel) return;
        const select = frt7DiagPanel.querySelector("select");
        const area = frt7DiagPanel.querySelector("textarea");
        if (!select || !area) return;
        const old = select.value;
        select.innerHTML = "";
        [...frt7DiagRecords].reverse().forEach((rec, idx) => {
            const opt = document.createElement("option");
            opt.value = String(frt7DiagRecords.length - 1 - idx);
            opt.textContent = `Applicant ${rec.appId} — ${new Date(rec.started).toLocaleTimeString()}`;
            select.appendChild(opt);
        });
        if (old && [...select.options].some(o => o.value === old)) select.value = old;
        else if (select.options.length) select.selectedIndex = 0;
        const rec = frt7DiagRecords[Number(select.value)];
        area.value = rec ? frt7DiagFormatRecord(rec) : "No diagnostic records yet.";
    }

    function frt7CreateDiagUI() {
        if (window.top !== window.self || frt7DiagButton || !document.body) return;
        frt7DiagLoad();
        frt7DiagRecordForCurrent(true);

        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "Diag";
        btn.title = "Diagnostic log — drag to move, click to open";
        btn.style.cssText = "position:fixed;right:6px;bottom:6px;z-index:2147483646;padding:3px 7px;border:1px solid #666;border-radius:5px;background:#222;color:#fff;font:700 10px Arial,sans-serif;cursor:move;box-shadow:0 1px 4px rgba(0,0,0,.35)";
        try {
            const pos = JSON.parse(GM_getValue(FRT7_DIAG_POS_KEY, "null") || "null");
            if (pos && Number.isFinite(pos.left) && Number.isFinite(pos.top)) {
                btn.style.left = `${Math.max(0, Math.min(window.innerWidth - 50, pos.left))}px`;
                btn.style.top = `${Math.max(0, Math.min(window.innerHeight - 28, pos.top))}px`;
                btn.style.right = "auto"; btn.style.bottom = "auto";
            }
        } catch (_) {}
        document.body.appendChild(btn);
        frt7DiagButton = btn;

        const panel = document.createElement("div");
        panel.style.cssText = "display:none;position:fixed;right:8px;bottom:38px;width:min(620px,calc(100vw - 20px));height:min(560px,calc(100vh - 60px));z-index:2147483647;background:#171717;color:#eee;border:1px solid #777;border-radius:8px;padding:8px;box-sizing:border-box;box-shadow:0 5px 24px rgba(0,0,0,.55);font:12px Arial,sans-serif";
        panel.innerHTML = `<div style="display:flex;gap:6px;align-items:center;margin-bottom:6px"><b style="flex:0 0 auto">Contact Toolbar Diagnostic</b><select style="flex:1;min-width:0"></select><button type="button" data-copy>Copy</button><button type="button" data-copyall>Copy all</button><button type="button" data-close>×</button></div><textarea readonly style="width:100%;height:calc(100% - 34px);box-sizing:border-box;resize:none;background:#0d0d0d;color:#eee;border:1px solid #555;padding:7px;font:11px/1.35 Consolas,monospace"></textarea>`;
        document.body.appendChild(panel);
        frt7DiagPanel = panel;
        panel.querySelector("select").addEventListener("change", frt7DiagRender);
        panel.querySelector("[data-close]").addEventListener("click", () => { panel.style.display = "none"; });
        panel.querySelector("[data-copy]").addEventListener("click", async () => {
            const area = panel.querySelector("textarea"); area.select();
            try { await navigator.clipboard.writeText(area.value); } catch (_) { document.execCommand("copy"); }
        });
        panel.querySelector("[data-copyall]").addEventListener("click", async () => {
            const all = frt7DiagRecords.map(frt7DiagFormatRecord).join("\n\n");
            try { await navigator.clipboard.writeText(all); } catch (_) { const area = panel.querySelector("textarea"); area.value = all; area.select(); document.execCommand("copy"); frt7DiagRender(); }
        });

        let drag = null;
        btn.addEventListener("pointerdown", e => {
            drag = { x:e.clientX, y:e.clientY, left:btn.getBoundingClientRect().left, top:btn.getBoundingClientRect().top, moved:false };
            btn.setPointerCapture?.(e.pointerId); e.preventDefault();
        });
        btn.addEventListener("pointermove", e => {
            if (!drag) return;
            const dx=e.clientX-drag.x, dy=e.clientY-drag.y;
            if (Math.abs(dx)+Math.abs(dy)>4) drag.moved=true;
            const left=Math.max(0,Math.min(window.innerWidth-btn.offsetWidth,drag.left+dx));
            const top=Math.max(0,Math.min(window.innerHeight-btn.offsetHeight,drag.top+dy));
            btn.style.left=`${left}px`; btn.style.top=`${top}px`; btn.style.right="auto"; btn.style.bottom="auto";
        });
        btn.addEventListener("pointerup", e => {
            if (!drag) return;
            const moved=drag.moved; drag=null;
            const r=btn.getBoundingClientRect(); GM_setValue(FRT7_DIAG_POS_KEY, JSON.stringify({left:r.left,top:r.top}));
            if (!moved) { panel.style.display = panel.style.display === "none" ? "block" : "none"; frt7DiagRender(); }
        });
    }

    // Capture only this toolbar's existing decision/status messages. This gives us
    // the reason path without adding duplicate parsing work.
    for (const method of ["info", "warn", "error"]) {
        const original = console[method]?.bind(console);
        if (!original) continue;
        console[method] = (...args) => {
            original(...args);
            try {
                const msg = args.map(v => typeof v === "string" ? v : (v?.message || String(v))).join(" ");
                if (/^Toolbar\b/i.test(msg)) frt7DiagAdd(msg, method.toUpperCase());
            } catch (_) {}
        };
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", frt7CreateDiagUI, { once:true });
    else setTimeout(frt7CreateDiagUI, 0);

    // v218 EMAIL AUTOFILL RELIABILITY:
    // Auto Email now verifies that the manual Email-button result actually sticks and
    // retries briefly when WallStJobs performs a late contact-field repaint. Also wires
    // the existing v120 initial-email-lock cleanup into the Auto path. Manual Email
    // edits still stop Auto, and the manual Email button itself is unchanged.
    // v217 MANUAL CITY SAVE FIX:
    // Approved workflow actions now persist the final City + State immediately instead
    // of relying on a next-page sessionStorage flush. This restores reliable learning
    // for manual corrections such as "Galivants Ferry, SC" while retaining v216 speed.
    // v216 FAST LOAD PASS:
    // Performance-only timing change. Applicant-change detection now checks every 100ms
    // instead of every 750ms, and the unified readiness stability window is 125ms instead
    // of 500ms. All Name/Email/Phone/City/State/ZIP decision logic, manual-edit guards,
    // retries, repaint protection, learned data, and fallback behavior remain unchanged.
    // v163 PERFORMANCE-ONLY PASS:
    // Decision rules, retry windows, and autofill outcomes are unchanged. Repeated
    // readiness/repaint checks reuse cached resume-derived answers whenever possible.
    // Checks remain capped at 2 seconds AFTER the page-first load gate opens.
    // Retry cadence inside that window is unchanged; all post-load work beyond 2 seconds is removed.
    // The lightweight applicant-change heartbeat remains active so same-document Next/Save
    // transitions are still detected immediately.
    const DEFAULT_AUTO_FIELDS = { name: true, email: true, phone: true, city: true, state: true, zipLookup: true };

    // v244 AUTO-CHANGE SOUND: settings + WebAudio tone generator.
    // Sound is emitted only by the Auto-run change watcher below, never by manual typing/buttons.
    function getAutoSoundSettings() {
        return {
            enabled: GM_getValue(AUTO_SOUND_ENABLED_KEY, true) !== false,
            type: String(GM_getValue(AUTO_SOUND_TYPE_KEY, "chime") || "chime"),
            volume: Math.max(0, Math.min(100, Number(GM_getValue(AUTO_SOUND_VOLUME_KEY, 35)) || 0)),
            duration: Math.max(50, Math.min(2000, Number(GM_getValue(AUTO_SOUND_DURATION_KEY, 220)) || 220)),
            triggers: (() => {
                const defaults = { name: true, email: true, phone: true, city: true, state: true, zip: true };
                try {
                    const raw = GM_getValue(AUTO_SOUND_TRIGGERS_KEY, JSON.stringify(defaults));
                    return { ...defaults, ...(typeof raw === "string" ? JSON.parse(raw || "{}") : (raw || {})) };
                } catch (_) { return defaults; }
            })()
        };
    }

    let frt7AudioContext = null;
    let frt7QueuedAutoSound = false;

    // v254 SOUND RELIABILITY ONLY:
    // Keep one AudioContext ready on the actual review page and unlock it on any
    // real user interaction.  Firefox can otherwise leave a newly-created WebAudio
    // context suspended when Auto (rather than a button click) is the first caller.
    // This does not touch any contact/name/location decision logic.
    function frt7GetAudioContext() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return null;
            if (!frt7AudioContext || frt7AudioContext.state === "closed") {
                frt7AudioContext = new AudioCtx();
            }
            return frt7AudioContext;
        } catch (_) {
            return null;
        }
    }

    async function frt7UnlockAutoSound() {
        const ctx = frt7GetAudioContext();
        if (!ctx) return false;
        if (ctx.state === "suspended") {
            try { await ctx.resume(); } catch (_) {}
        }
        if (ctx.state !== "running") return false;
        if (frt7QueuedAutoSound) {
            frt7QueuedAutoSound = false;
            setTimeout(() => playAutoChangeSound(false), 0);
        }
        return true;
    }

    // Capture-phase listeners make the unlock happen before ordinary page/addon
    // click handlers.  They are passive with respect to the workflow.
    for (const eventName of ["pointerdown", "mousedown", "keydown", "touchstart"]) {
        document.addEventListener(eventName, () => { void frt7UnlockAutoSound(); }, { capture: true, passive: true });
    }

    async function playAutoChangeSound(force = false) {
        const cfg = getAutoSoundSettings();
        if (!force && !cfg.enabled) return false;
        try {
            const ctx = frt7GetAudioContext();
            if (!ctx) return false;

            // v254: Test clicks still resume immediately. Auto also tries to resume,
            // but if Firefox blocks that non-user-gesture resume, remember one pending
            // Auto sound instead of silently losing it. The next genuine interaction
            // unlocks WebAudio and releases that pending sound.
            if (ctx.state === "suspended") {
                try { await ctx.resume(); } catch (_) {}
            }
            if (ctx.state !== "running") {
                if (!force) frt7QueuedAutoSound = true;
                return false;
            }

            const now = ctx.currentTime;
            const dur = cfg.duration / 1000;
            const master = ctx.createGain();
            // v247 LOUDER SOUND ONLY: v246 capped the master at 0.22 even when
            // the UI slider said 100%, which made every tone very quiet. Raise
            // the usable output substantially while keeping the same 0-100 UI.
            // A compressor catches the two-tone chime peak so the extra level
            // does not turn into harsh clipping. No Auto/contact logic changed.
            const level = Math.max(0.0001, (cfg.volume / 100) * 1.25);
            master.gain.setValueAtTime(level, now);
            master.gain.exponentialRampToValueAtTime(0.0001, now + dur);
            const limiter = ctx.createDynamicsCompressor();
            limiter.threshold.setValueAtTime(-6, now);
            limiter.knee.setValueAtTime(3, now);
            limiter.ratio.setValueAtTime(12, now);
            limiter.attack.setValueAtTime(0.003, now);
            limiter.release.setValueAtTime(0.12, now);
            master.connect(limiter);
            limiter.connect(ctx.destination);

            const addTone = (freq, type = "sine", offset = 0, length = dur) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, now + offset);
                gain.gain.setValueAtTime(0.0001, now + offset);
                gain.gain.exponentialRampToValueAtTime(1, now + offset + Math.min(.018, length / 4));
                gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + length);
                osc.connect(gain); gain.connect(master);
                osc.start(now + offset); osc.stop(now + offset + length + .02);
            };

            if (cfg.type === "beep") addTone(880, "sine");
            else if (cfg.type === "soft") addTone(520, "triangle");
            else if (cfg.type === "low") addTone(330, "sine");
            else if (cfg.type === "click") addTone(1250, "square", 0, Math.min(dur, .075));
            else { // chime
                addTone(660, "sine", 0, dur);
                addTone(990, "sine", Math.min(.06, dur * .2), Math.max(.05, dur - Math.min(.06, dur * .2)));
            }
            return true;
        } catch (error) {
            console.warn("Toolbar v250: could not play Auto-change sound.", error);
            return false;
        }
    }

    // v255 DISPLAY-ONLY: show a tiny "changed" badge beside any contact field
    // that the existing Auto watcher sees change. Cleared at the next Auto pass.
    // v283 DISPLAY-ONLY: changed badges now remember the observed before/after values.
    // Hover or click a badge to see exactly what Auto changed.
    const frt7ChangedFieldBadges = new Map();
    const frt7ChangedFieldDetails = new Map();
    function frt7ChangedFieldInput(key) {
        if (key === "name") return document.getElementById("txtLastNameDataEntry") || document.getElementById("txtLastName") || document.getElementById("txtFirstNameDataEntry") || document.getElementById("txtFirstName");
        if (key === "email") return document.getElementById("txtEmail");
        if (key === "phone") return document.getElementById("txtPhoneDataEntry") || document.getElementById("txtPhone");
        if (key === "city") return document.getElementById("txtCityDataEntry");
        if (key === "state") return document.getElementById("txtStateDataEntry");
        if (key === "zip") return document.getElementById("txtZipDataEntry");
        return null;
    }
    function frt7PositionChangedFieldBadge(key) {
        const badge = frt7ChangedFieldBadges.get(key);
        const input = frt7ChangedFieldInput(key);
        if (!badge || !input || !input.isConnected) return;
        const r = input.getBoundingClientRect();
        const width = badge.offsetWidth || 48;
        const height = badge.offsetHeight || 14;
        badge.style.left = `${Math.max(2, Math.min(window.innerWidth - width - 4, r.right + 5))}px`;
        badge.style.top = `${Math.max(2, r.top + Math.max(0, (r.height - height) / 2))}px`;
    }
    function frt7FormatChangedValue(key, value) {
        const raw = String(value ?? "");
        if (key === "name") {
            const [first = "", last = ""] = raw.split("\u241F");
            return `${first} ${last}`.replace(/\s+/g, " ").trim() || "(blank)";
        }
        return raw.trim() || "(blank)";
    }
    function frt7UpdateChangedFieldBadgeTitle(key) {
        const badge = frt7ChangedFieldBadges.get(key);
        const detail = frt7ChangedFieldDetails.get(key);
        if (!badge || !detail) return;
        const before = frt7FormatChangedValue(key, detail.before);
        const after = frt7FormatChangedValue(key, detail.after);
        badge.title = `Changed from:\n${before}\n\nTo:\n${after}`;
    }
    function frt7MarkAutoChangedField(key, beforeValue, afterValue) {
        const input = frt7ChangedFieldInput(key);
        if (!input) return;
        let badge = frt7ChangedFieldBadges.get(key);
        if (!badge) {
            badge = document.createElement("span");
            badge.textContent = "changed";
            badge.style.cssText = "position:fixed;z-index:2147483645;pointer-events:auto;cursor:help;padding:1px 4px;border-radius:4px;background:#fff3a6;border:1px solid #c8a900;color:#5a4900;font:700 10px/1.25 Arial,sans-serif;white-space:nowrap;box-shadow:0 1px 2px rgba(0,0,0,.15)";
            document.body.appendChild(badge);
            frt7ChangedFieldBadges.set(key, badge);
        }
        const existing = frt7ChangedFieldDetails.get(key);
        frt7ChangedFieldDetails.set(key, {
            before: existing ? existing.before : beforeValue,
            after: afterValue
        });
        frt7UpdateChangedFieldBadgeTitle(key);
        frt7PositionChangedFieldBadge(key);
    }
    function frt7ClearAutoChangedFieldMarkers() {
        for (const badge of frt7ChangedFieldBadges.values()) badge?.remove();
        frt7ChangedFieldBadges.clear();
        frt7ChangedFieldDetails.clear();
    }
    function frt7RepositionAutoChangedFieldMarkers() {
        for (const key of frt7ChangedFieldBadges.keys()) frt7PositionChangedFieldBadge(key);
    }
    window.addEventListener("resize", frt7RepositionAutoChangedFieldMarkers, { passive: true });
    window.addEventListener("scroll", frt7RepositionAutoChangedFieldMarkers, { passive: true, capture: true });

    function frt7AutoSoundSnapshot() {
        return {
            name: `${String(document.getElementById("txtFirstNameDataEntry")?.value || "")}\u241F${String(document.getElementById("txtLastNameDataEntry")?.value || "")}`,
            email: String(document.getElementById("txtEmail")?.value || ""),
            phone: String(document.getElementById("txtPhoneDataEntry")?.value || ""),
            city: String(document.getElementById("txtCityDataEntry")?.value || ""),
            state: String(document.getElementById("txtStateDataEntry")?.value || ""),
            zip: String(document.getElementById("txtZipDataEntry")?.value || "")
        };
    }

    let frt7AutoSoundWatchToken = 0;
    function startAutoChangeSoundWatcher() {
        // The resume iframe also matches the userscript, but it has no editable contact
        // fields. Only the parent review page can produce an Auto contact change.
        if (!document.getElementById("txtFirstNameDataEntry") &&
            !document.getElementById("txtEmail") &&
            !document.getElementById("txtCityDataEntry")) return;
        frt7ClearAutoChangedFieldMarkers();
        const token = ++frt7AutoSoundWatchToken;
        let last = frt7AutoSoundSnapshot();
        let pendingFields = new Set();
        let pendingTimer = null;
        const started = Date.now();

        // v250 SOUND RELIABILITY ONLY: Auto can finish some delayed contact/location
        // corrections after the old 3.2-second watch window. Keep this lightweight
        // value-only watcher alive long enough to catch those changes, and debounce
        // related field changes into one sound. No Auto/contact decision logic changed.
        const flushSound = async () => {
            pendingTimer = null;
            if (token !== frt7AutoSoundWatchToken || !pendingFields.size) return;
            const triggers = getAutoSoundSettings().triggers;
            const shouldSound = [...pendingFields].some(key => triggers[key] !== false);
            pendingFields.clear();
            if (shouldSound) await playAutoChangeSound(false);
        };

        const tick = () => {
            if (token !== frt7AutoSoundWatchToken || Date.now() - started > 10000) {
                if (pendingTimer) { clearTimeout(pendingTimer); pendingTimer = null; }
                if (pendingFields.size) flushSound();
                return;
            }
            const current = frt7AutoSoundSnapshot();
            const changed = Object.keys(current).filter(key => current[key] !== last[key]);
            if (changed.length) {
                changed.forEach(key => {
                    pendingFields.add(key);
                    frt7MarkAutoChangedField(key, last[key], current[key]);

                    // v291 PERMANENT DIAGNOSTIC FIELD TRANSITIONS:
                    // Reuse this existing lightweight value watcher so the Diag log records
                    // the ACTUAL contact-field transitions, including late WallStJobs repaints.
                    // This adds no new polling/resume parsing and does not change Auto behavior.
                    const label = key === "zip" ? "ZIP" : key.toUpperCase();
                    const before = frt7FormatChangedValue(key, last[key]);
                    const after = frt7FormatChangedValue(key, current[key]);
                    frt7DiagAdd(`FIELD ${label}: ${before} -> ${after}`, "FIELD");
                });
                last = current;
                if (pendingTimer) clearTimeout(pendingTimer);
                pendingTimer = setTimeout(flushSound, 140);
            }
            setTimeout(tick, 80);
        };
        setTimeout(tick, 20);
    }
    const DEFAULT_REVERT_FIELDS = { name: true, email: true, phone: true, city: true, state: true, zip: true };

    // v150: Once the page-first gate says WallStJobs is loaded, do not add another
    // artificial 500-1500ms delay before the first Name/Email/City Auto attempt.
    window.__frt7_page_first_loaded = false;
    const frt7FirstAutoDelay = defaultMs =>
        window.__frt7_page_first_loaded === true ? 0 : defaultMs;
    // Compact progress display for the current applicant. Updating text does not
    // inspect the resume or add any polling to the page.
    let frt7ProgressBar = null;
    let frt7ProgressRun = 0;
    function frt7Progress(label, run = frt7ProgressRun) {
        if (run !== frt7ProgressRun || !frt7ProgressBar) return;
        frt7ProgressBar.textContent = label;
        frt7ProgressBar.title = label + " — drag to move";
    }
    function frt7BeginProgress(label = "Working… waiting for page") {
        ++frt7ProgressRun;
        frt7Progress(label);
        return frt7ProgressRun;
    }
    function frt7CreateProgressBar() {
        // Progress/status label intentionally disabled.
        return;
    }
    let autoRunCompleted = false;
    let learnedCitiesCache = {};
    let learnedCitiesLoaded = false;
    let customAreaCodesCache = {};

    // v200 AUTO NAME CHANGE TOAST:
    // Shown only when the automatic Name action actually changes First and/or Last.
    // Manual Name-button clicks do not show this warning.
    let frt7NameChangeToastTimer = null;

    function getNameChangeToastEnabled() {
        return GM_getValue(NAME_CHANGE_TOAST_ENABLED_KEY, true) !== false;
    }

    function getNameChangeToastSize() {
        const saved = Number(GM_getValue(NAME_CHANGE_TOAST_SIZE_KEY, 100));
        return Number.isFinite(saved) ? Math.max(70, Math.min(200, saved)) : 100;
    }

    function showNameChangedToast() {
        if (!getNameChangeToastEnabled()) return;

        let toast = document.getElementById("frt7-name-change-toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "frt7-name-change-toast";
            toast.textContent = "Name changed - check name.";
            document.body.appendChild(toast);
        }

        const scale = getNameChangeToastSize() / 100;
        toast.style.cssText = `
            position:fixed;
            top:18px;
            left:50%;
            transform:translateX(-50%);
            z-index:2147483647;
            pointer-events:none;
            background:rgba(35,35,35,.96);
            color:#fff;
            border:1px solid rgba(255,255,255,.28);
            border-radius:${Math.round(8 * scale)}px;
            padding:${Math.round(10 * scale)}px ${Math.round(16 * scale)}px;
            font-family:Arial,sans-serif;
            font-size:${Math.round(16 * scale)}px;
            font-weight:700;
            line-height:1.25;
            white-space:nowrap;
            box-shadow:0 5px 18px rgba(0,0,0,.35);
            opacity:1;
            transition:opacity .18s ease;
        `;

        if (frt7NameChangeToastTimer) clearTimeout(frt7NameChangeToastTimer);
        frt7NameChangeToastTimer = setTimeout(() => {
            if (!toast?.isConnected) return;
            toast.style.opacity = "0";
            setTimeout(() => toast?.remove(), 220);
        }, 3000);
    }

    function loadCustomAreaCodes() {
        try {
            const raw = GM_getValue(CUSTOM_AREA_CODES_KEY, "{}");
            const parsed = typeof raw === "string" ? JSON.parse(raw || "{}") : raw;
            customAreaCodesCache = parsed && typeof parsed === "object" ? parsed : {};
        } catch (_) {
            customAreaCodesCache = {};
        }
        return customAreaCodesCache;
    }

    function saveCustomAreaCodes() {
        GM_setValue(CUSTOM_AREA_CODES_KEY, JSON.stringify(customAreaCodesCache));
        loadCustomAreaCodes();
        try { renderCustomAreaCodesSettings(); } catch (_) {}
        return true;
    }

    function normalizeCustomAreaCode(value) {
        return String(value || "").replace(/\D/g, "").slice(0, 3);
    }

    function addCustomAreaCode(areaCode, city, state) {
        const area = normalizeCustomAreaCode(areaCode);
        const cleanCity = normalizeContactDisplayCase(String(city || "").trim());
        const cleanState = String(state || "").trim().toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2);
        if (area.length !== 3) return { ok: false, reason: "Area code must be 3 digits." };
        if (!cleanCity) return { ok: false, reason: "Enter a city." };
        if (cleanState.length !== 2) return { ok: false, reason: "State must be a 2-letter abbreviation." };
        customAreaCodesCache[area] = { city: cleanCity, state: cleanState, savedAt: Date.now() };
        saveCustomAreaCodes();
        return { ok: true };
    }

    function removeCustomAreaCode(areaCode) {
        const area = normalizeCustomAreaCode(areaCode);
        if (!area || !Object.prototype.hasOwnProperty.call(customAreaCodesCache, area)) return false;
        const existing = customAreaCodesCache[area];
        if (existing?.deleted === true) return false;
        // Retain an explicit tombstone so the other computer can receive it.
        customAreaCodesCache[area] = {...existing, deleted:true, deletedAt:Date.now()};
        saveCustomAreaCodes();
        queueExplicitSyncDeletion('customAreaCodes',area);
        return true;
    }

    loadCustomAreaCodes();
    let learnedCityCorrectionsCache = {};
    let learnedCityCorrectionsLoaded = false;
    let safeFirstNamesCache = {};
    let rejectedAutoNamesCache = {};
    let rejectedAutoNamesDeletedCache = {};
    let permanentRejectedNameBlacklist = {};
    let pendingAutoNameLearning = null;

    const normalizeRejectedName = value => normalizeUnicode(String(value || ""))
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .replace(/[^A-Z'’\- ]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    // v64 STRICT AUTOMATIC REJECTION MODES
    // EXACT is now the exception, not the default. A rejected single word is a hard
    // WORD blocker unless we have strong evidence that it is genuinely a human
    // first name. Multi-word rejected phrases remain exact-only.
    const REJECTED_HARD_WORDS = new Set([
        "MICROSOFT","OFFICE","WINDOWS","EXCEL","WORD","POWERPOINT","OUTLOOK",
        "GOOGLE","AMAZON","WALMART","TARGET","COSTCO","STARBUCKS","MCDONALDS",
        "MEMBER","MEMBERS","MILITARY","SALES","SERVICE","SERVICES","CUSTOMER",
        "CLIENT","CLIENTS","ACCOUNT","ACCOUNTS","ADMIN","ADMINISTRATIVE",
        "MANAGER","MANAGEMENT","SUPERVISOR","DIRECTOR","COORDINATOR","SPECIALIST",
        "REPRESENTATIVE","ASSOCIATE","CONSULTANT","TECHNICIAN","ENGINEER","ANALYST",
        "PROFESSIONAL","PROFILE","SUMMARY","OBJECTIVE","EXPERIENCE","EDUCATION",
        "SKILLS","CONTACT","RESUME","CURRICULUM","VITAE","EMAIL","PHONE","ADDRESS",
        "COMPANY","CORPORATION","CORP","INC","LLC","LTD","GROUP","TEAM","DEPARTMENT",
        "CENTER","CENTRE","HOSPITAL","UNIVERSITY","COLLEGE","SCHOOL","BANK","INSURANCE",
        "FINANCIAL","HEALTH","HEALTHCARE","TECHNOLOGY","TECHNOLOGIES","SYSTEM","SYSTEMS",
        "SOLUTIONS","ENTERPRISE","ENTERPRISES","GLOBAL","INTERNATIONAL","NETWORK","NETWORKS",
        "OPERATIONS","SUPPORT","WORK","WORKING","CAREER","CAREERS","EMPLOYMENT",
        "COMMERCIAL","COMMUNITY","COMPLIANCE","COPY","CORE","COLLECTIONS","COLLECTION",
        "FOCUSED","QUALITY","PROCESS","PROCESSING","BUSINESS","DEVELOPMENT","PROJECT",
        "PROGRAM","PROGRAMS","PRODUCT","PRODUCTS","MARKETING","RETAIL","RELATIONSHIP",
        "RELATIONSHIPS","CALL","CALLS","DATA","TECH","TECHNICAL","SECURITY","CLERK",
        "FRONT","DESK","GENERAL","LEAD","LEADER","LEADERSHIP","STAFF","ASSISTANT",
        "EXECUTIVE","OFFICER","AGENT","BROKER","PRODUCER","SPECIALTY","TRAINING"
    ]);

    // Strong-evidence first-name list. This is intentionally conservative:
    // unknown words are NOT assumed to be names. If a rejected token is part of
    // the applicant's correct/original name on the current Revert, that is also
    // strong evidence and it is kept exact-only even if it is uncommon.
    const REJECTED_STRONG_FIRST_NAMES = new Set([
        "AARON","ABIGAIL","ADAM","ADRIAN","ADRIANA","AIDEN","ALAN","ALBERT","ALEJANDRA",
        "ALEJANDRO","ALEX","ALEXA","ALEXANDER","ALEXANDRA","ALEXIS","ALICIA","ALLISON",
        "AMANDA","AMBER","AMY","ANDREA","ANDREW","ANGELA","ANGEL","ANGELICA","ANNA",
        "ANTHONY","ANTONIO","ASHLEY","AUSTIN","AVA","BARBARA","BENJAMIN","BETHANY",
        "BETTY","BEVERLY","BLAKE","BOBBY","BRANDON","BRENDA","BRIAN","BRITTANY",
        "BROOKE","BRUCE","BRYAN","CALEB","CAMERON","CARL","CARLOS","CAROL","CAROLINE",
        "CATHERINE","CHARLES","CHARLOTTE","CHERYL","CHRISTIAN","CHRISTINA","CHRISTINE",
        "CHRISTOPHER","CINDY","CLAIRE","CLARA","CLARENCE","COLE","COLIN","CONNOR",
        "COURTNEY","CRAIG","CRYSTAL","CYNTHIA","DANIEL","DANIELA","DANIELLE","DAVID",
        "DAWN","DEBRA","DENISE","DENNIS","DIANA","DIANE","DIEGO","DONALD","DONNA",
        "DOROTHY","DYLAN","EDWARD","ELENA","ELIZABETH","ELLA","EMILY","EMMA","ERIC",
        "ERICA","ERIN","ETHAN","EVA","EVELYN","FELICIA","FRANCES","FRANCISCO","FRANK",
        "GABRIEL","GABRIELA","GARY","GEORGE","GINA","GLORIA","GRACE","GREGORY","HAILEY",
        "HANNAH","HAROLD","HEATHER","HECTOR","HENRY","HOLLY","IAN","IRIS","ISABEL",
        "ISABELLA","IVAN","JACK","JACOB","JACQUELINE","JAMES","JAMIE","JANE","JANET",
        "JASON","JASMINE","JEAN","JEFFREY","JENNIFER","JEREMY","JERRY","JESSICA","JILL",
        "JOAN","JOANNA","JOE","JOEL","JOHN","JOHNNY","JONATHAN","JORDAN","JORGE",
        "JOSE","JOSEPH","JOYCE","JUAN","JUDITH","JUDY","JULIA","JULIAN","JULIE",
        "JUSTIN","KAREN","KATHERINE","KATHLEEN","KATHRYN","KATIE","KAYLA","KEITH",
        "KELLY","KENNETH","KEVIN","KIMBERLY","KYLE","LAURA","LAUREN","LAWRENCE",
        "LEAH","LEO","LEONARD","LESLIE","LILLIAN","LINDA","LISA","LOGAN","LORI",
        "LOUIS","LUCAS","LUIS","MADISON","MARGARET","MARIA","MARIE","MARILYN","MARK",
        "MARTHA","MARTIN","MARY","MATTHEW","MEGAN","MELANIE","MELISSA","MICHAEL",
        "MICHELLE","MIGUEL","MONICA","NANCY","NATALIE","NATHAN","NICHOLAS","NICOLE",
        "NOAH","OLIVIA","PAMELA","PATRICIA","PATRICK","PAUL","PAULA","PETER","PHILIP",
        "RACHEL","RALPH","RANDY","RAYMOND","REBECCA","RICHARD","ROBERT","ROBIN","ROGER",
        "RONALD","ROSA","ROSE","RUBEN","RUSSELL","RYAN","SAMANTHA","SAMUEL","SANDRA",
        "SARA","SARAH","SCOTT","SEAN","SHARON","SHIRLEY","SOPHIA","STEPHANIE","STEPHEN",
        "STEVEN","SUSAN","TAMMY","TAYLOR","TERESA","TERRY","THOMAS","TIFFANY","TIMOTHY",
        "TODD","TONY","TRACY","TYLER","VALERIE","VANESSA","VERONICA","VICTOR","VINCENT",
        "VIRGINIA","WALTER","WAYNE","WENDY","WILLIAM","ZACHARY","ZOE"
    ]);

    function inferRejectedBlockMode(value, entry = null, originalName = null) {
        const normalized = normalizeRejectedName(value);
        const words = normalized.split(/\s+/).filter(Boolean);
        if (words.length !== 1) return "exact";

        const token = words[0];

        // Strongest evidence: on this Revert, the token is actually part of the
        // applicant's correct/original name. Never turn that into a global blocker.
        const originalWords = normalizeRejectedName(
            `${originalName?.first || ""} ${originalName?.last || ""}`
        ).split(/\s+/).filter(Boolean);
        if (originalWords.includes(token)) return "exact";

        // Known resume/company/job/product vocabulary is always hard-blocked.
        if (REJECTED_HARD_WORDS.has(token)) return "word";

        // Only strongly recognized human first names get the safer exact-only mode.
        if (REJECTED_STRONG_FIRST_NAMES.has(token)) return "exact";

        // v64 critical change: uncertainty means WORD BLOCK, not "probably a name".
        return "word";
    }

    function getRejectedBlockMode(entry) {
        if (!entry?.name) return "exact";

        const normalized = normalizeRejectedName(entry.name);
        const words = normalized.split(/\s+/).filter(Boolean);
        if (words.length > 1) return "exact";

        // v64 re-evaluates ALL existing single-word entries, even ones v63 stored
        // as blockMode:"exact". This automatically repairs old misclassifications
        // such as Commercial, Community, Compliance, Copy, Core, etc.
        return inferRejectedBlockMode(entry.name, entry, null);
    }

    function parseRejectedNameStoreObject(value) {
        try {
            if (typeof value === "string") {
                const parsed = JSON.parse(value || "{}");
                return parsed && typeof parsed === "object" ? parsed : {};
            }
            return value && typeof value === "object" ? value : {};
        } catch (_) {
            return {};
        }
    }

    // v24 SINGLE DATABASE:
    // Every rejected-name state now lives in exactly ONE GM value. Active entries
    // and deleted entries are stored together. A deleted entry remains as a hidden
    // tombstone inside this same database, so it cannot reappear after refresh and
    // cannot be automatically re-learned. Manual Add is the only action that turns
    // a deleted entry active again.
    function saveRejectedAutoNames() {
        GM_setValue(REJECTED_AUTO_NAMES_SINGLE_DB_KEY, JSON.stringify(rejectedAutoNamesCache));
        return true;
    }

    async function loadRejectedAutoNames() {
        const existingSingle = GM_getValue(REJECTED_AUTO_NAMES_SINGLE_DB_KEY);
        let single = parseRejectedNameStoreObject(existingSingle);

        // ONE-TIME migration only. Once the v24 database exists, no old rejected-
        // name database is ever read again.
        if (existingSingle === undefined || existingSingle === null) {
            const oldCanonical = parseRejectedNameStoreObject(GM_getValue(REJECTED_AUTO_NAMES_CANONICAL_KEY));
            const oldLegacy = parseRejectedNameStoreObject(GM_getValue(REJECTED_AUTO_NAMES_KEY));
            const oldDeleted = parseRejectedNameStoreObject(GM_getValue(REJECTED_AUTO_NAMES_DELETED_KEY));
            let oldSharedDeleted = {};
            try {
                oldSharedDeleted = parseRejectedNameStoreObject(
                    localStorage.getItem(REJECTED_AUTO_NAMES_DELETED_SHARED_KEY)
                );
            } catch (_) {}
            let oldPermanent = parseRejectedNameStoreObject(
                GM_getValue(REJECTED_AUTO_NAMES_PERMANENT_BLACKLIST_KEY)
            );
            try {
                oldPermanent = {
                    ...oldPermanent,
                    ...parseRejectedNameStoreObject(
                        localStorage.getItem(REJECTED_AUTO_NAMES_PERMANENT_BLACKLIST_LOCAL_KEY)
                    )
                };
            } catch (_) {}

            const source = Object.keys(oldCanonical).length ? oldCanonical : oldLegacy;
            single = {};
            for (const [storedKey, entry] of Object.entries(source)) {
                if (!entry || !String(entry.name || "").trim()) continue;
                const key = normalizeRejectedName(entry.name) || normalizeRejectedName(storedKey);
                if (!key) continue;
                single[key] = { ...entry, name: String(entry.name || storedKey).trim(), deleted: false };
            }

            // Carry any old deletion evidence into the ONE v24 database as hidden
            // deleted entries. After this migration these old stores are ignored.
            const deletedSources = [oldDeleted, oldSharedDeleted, oldPermanent];
            for (const sourceObj of deletedSources) {
                for (const [storedKey, entry] of Object.entries(sourceObj)) {
                    const displayName = String(entry?.name || storedKey || "").trim();
                    const key = normalizeRejectedName(displayName) || normalizeRejectedName(storedKey);
                    if (!key) continue;
                    single[key] = {
                        name: displayName || storedKey,
                        deleted: true,
                        deletedAt: entry?.deletedAt || Date.now()
                    };
                }
            }

            rejectedAutoNamesCache = single;
            saveRejectedAutoNames();
        } else {
            rejectedAutoNamesCache = single;
        }

        return rejectedAutoNamesCache;
    }

    const rejectedAutoNamesReady = loadRejectedAutoNames().catch(error => {
        console.warn("Toolbar rejected names: could not load v24 single database.", error);
        rejectedAutoNamesCache = {};
        return rejectedAutoNamesCache;
    });

    // Retained for callers, but v24 no longer uses separate deletion stores.
    function readSharedRejectedNameDeletions() { return {}; }
    function saveRejectedAutoNameDeletions() { return true; }

    function clearRejectedAutoNameDeletion(nameValue) {
        const normalized = normalizeRejectedName(nameValue);
        if (!normalized) return;
        const existing = rejectedAutoNamesCache[normalized];
        if (existing?.deleted) {
            delete rejectedAutoNamesCache[normalized];
            saveRejectedAutoNames();
        }
    }

    function isDeletedRejectedName(nameValue) {
        const normalized = normalizeRejectedName(nameValue);
        return Boolean(normalized && rejectedAutoNamesCache[normalized]?.deleted === true);
    }

    function isRejectedAutoName(name) {
        const fullName = `${name?.first || ""} ${name?.last || ""}`.trim();
        const normalizedFullName = normalizeRejectedName(fullName);
        if (!normalizedFullName) return false;

        const proposedWords = normalizedFullName.split(/\s+/).filter(Boolean);
        for (const entry of Object.values(rejectedAutoNamesCache)) {
            if (!entry?.name || entry.deleted === true || entry.manual !== true) continue;
            const normalizedEntry = normalizeRejectedName(entry.name);
            if (!normalizedEntry) continue;
            const entryWords = normalizedEntry.split(/\s+/).filter(Boolean);
            const blockMode = getRejectedBlockMode(entry);

            if (entryWords.length === 1) {
                if (blockMode === "word" && proposedWords.includes(entryWords[0])) {
                    console.warn(`Toolbar NAME v64: hard word-blocked "${fullName}" because it contains "${entry.name}".`);
                    return true;
                }
                if (blockMode === "exact" && normalizedFullName === normalizedEntry) {
                    console.warn(`Toolbar NAME v64: exact-blocked "${fullName}".`);
                    return true;
                }
            }
            if (entryWords.length > 1 && normalizedFullName === normalizedEntry) {
                return true;
            }
        }

        const learnedEntry = rejectedAutoNamesCache[normalizedFullName];
        return Boolean(learnedEntry && learnedEntry.deleted !== true && learnedEntry.manual !== true);
    }

    // v91: Same visible/manual block rules as isRejectedAutoName(), but deliberately
    // ignores hidden automatic full-name learning. A high-confidence suffix header
    // such as "IVY MATHEWS JR." must not be defeated by an old automatic learning
    // record that the user cannot see in the blocked-word list.
    function isManuallyRejectedName(name) {
        const fullName = `${name?.first || ""} ${name?.last || ""}`.trim();
        const normalizedFullName = normalizeRejectedName(fullName);
        if (!normalizedFullName) return false;

        const proposedWords = normalizedFullName.split(/\s+/).filter(Boolean);
        for (const entry of Object.values(rejectedAutoNamesCache || {})) {
            if (!entry?.name || entry.deleted === true || entry.manual !== true) continue;

            const normalizedEntry = normalizeRejectedName(entry.name);
            if (!normalizedEntry) continue;

            const entryWords = normalizedEntry.split(/\s+/).filter(Boolean);
            const blockMode = getRejectedBlockMode(entry);

            if (entryWords.length === 1) {
                if (blockMode === "word" && proposedWords.includes(entryWords[0])) return true;
                if (blockMode === "exact" && normalizedFullName === normalizedEntry) return true;
            } else if (normalizedFullName === normalizedEntry) {
                return true;
            }
        }
        return false;
    }

    async function learnRejectedAutoName(name) {
        if (typeof discardLearningIsBlocked === "function" && discardLearningIsBlocked()) {
            console.info("Toolbar v45 DISCARD: rejected name was NOT learned.");
            return false;
        }
        const fullName = `${name?.first || ""} ${name?.last || ""}`.replace(/\s+/g, " ").trim();
        const key = normalizeRejectedName(fullName);
        if (!key) return false;
        if (rejectedAutoNamesCache[key]?.deleted === true) {
            console.info(`Toolbar rejected names: v24 kept deleted name hidden: "${fullName}".`);
            return false;
        }
        rejectedAutoNamesCache[key] = { name: fullName, manual: false, deleted: false, learnedAt: Date.now() };
        saveRejectedAutoNames();
        renderRejectedAutoNamesSettings();
        return true;
    }

    function addManualRejectedName(value) {
        const cleanValue = String(value || "").replace(/\s+/g, " ").trim();
        const key = normalizeRejectedName(cleanValue);
        if (!key) return false;
        rejectedAutoNamesCache[key] = {
            name: cleanValue,
            manual: true,
            deleted: false,
            blockMode: inferRejectedBlockMode(cleanValue, null, null),
            learnedAt: Date.now()
        };
        saveRejectedAutoNames();
        return { key, entry: rejectedAutoNamesCache[key] };
    }

    function learnRejectedAutoNameWords(name, originalName = null) {
        const cleanFirst = String(name?.first || "").trim();
        const cleanLast = String(name?.last || "").trim();
        const fullRejected = `${cleanFirst} ${cleanLast}`.replace(/\s+/g, " ").trim();
        const words = [cleanFirst, cleanLast]
            .flatMap(value => value.split(/\s+/))
            .map(value => value.replace(/^[^A-Za-zÀ-ÖØ-öø-ÿ'’\-]+|[^A-Za-zÀ-ÖØ-öø-ÿ'’\-]+$/g, ""))
            .filter(Boolean);

        const attemptedKeys = [];
        let changed = false;

        // Save the complete bad detection as an exact phrase. This catches
        // unfamiliar junk/company phrases even when none of their words is in
        // our hard-word vocabulary yet.
        const fullKey = normalizeRejectedName(fullRejected);
        if (fullKey && fullKey.split(/\s+/).length > 1 && rejectedAutoNamesCache[fullKey]?.deleted !== true) {
            rejectedAutoNamesCache[fullKey] = {
                ...(rejectedAutoNamesCache[fullKey] || {}),
                name: fullRejected,
                manual: true,
                deleted: false,
                learnedFromRevert: true,
                blockMode: "exact",
                learnedAt: Date.now()
            };
            attemptedKeys.push(fullKey);
            changed = true;
        }

        for (const word of words) {
            const key = normalizeRejectedName(word);
            if (!key) continue;

            if (rejectedAutoNamesCache[key]?.deleted === true) {
                console.info(`Toolbar rejected names: Revert did not resurrect deleted entry "${word}".`);
                continue;
            }

            const blockMode = inferRejectedBlockMode(word, rejectedAutoNamesCache[key], originalName);
            rejectedAutoNamesCache[key] = {
                ...(rejectedAutoNamesCache[key] || {}),
                name: word,
                manual: true,
                deleted: false,
                learnedFromRevert: true,
                blockMode,
                learnedAt: Date.now()
            };
            attemptedKeys.push(key);
            changed = true;
            console.info(`Toolbar rejected names v64: learned "${word}" as ${blockMode.toUpperCase()} blocker.`);
        }

        if (!changed) return false;

        saveRejectedAutoNames();

        const verify = parseRejectedNameStoreObject(
            GM_getValue(REJECTED_AUTO_NAMES_SINGLE_DB_KEY)
        );

        const failed = attemptedKeys.filter(key =>
            !verify[key] ||
            verify[key].deleted === true ||
            verify[key].manual !== true
        );

        if (failed.length) {
            console.error(
                "Toolbar rejected names: Revert learning verification FAILED:",
                failed
            );
            rejectedAutoNamesCache = verify;
            renderRejectedAutoNamesSettings();
            updateRejectedNameDiagnostic(`REVERT SAVE FAILED: ${failed.join(", ")}`);
            return false;
        }

        rejectedAutoNamesCache = verify;
        renderRejectedAutoNamesSettings();
        updateRejectedNameDiagnostic(
            `Revert saved: ${attemptedKeys.map(key => {
                const e = verify[key];
                return `${e?.name || key} [${getRejectedBlockMode(e)}]`;
            }).join(", ")}`
        );
        console.info(
            "Toolbar rejected names v64: Revert learning saved and verified:",
            attemptedKeys.map(key => ({ name: verify[key]?.name || key, mode: getRejectedBlockMode(verify[key]) }))
        );
        return true;
    }

    // v376: Persist explicit X deletions even while automatic sync is OFF.
    function queueExplicitSyncDeletion(category, key) {
        if (!key || !['learnedCities','rejectedNames','customAreaCodes'].includes(category)) return;
        const storageKey='frt7_team_sync_v339_pending_explicit_deletes_v376';
        let queue={};try{queue=JSON.parse(GM_getValue(storageKey,'{}')||'{}');}catch(_){}
        queue[category+'\u0000'+key]={category,item_key:key,recordedAt:Date.now()};
        GM_setValue(storageKey,JSON.stringify(queue));
    }
    function forgetRejectedAutoName(key, nameValue = "") {
        const displayName = String(nameValue || "").trim() || String(key || "").trim();
        const normalized = normalizeRejectedName(displayName) || normalizeRejectedName(key);
        if (!normalized) return false;

        // Do NOT remove the key. Mark it deleted inside the SAME database, then
        // synchronously save and verify that exact database. This is the whole v24
        // persistence model.
        rejectedAutoNamesCache[normalized] = {
            ...(rejectedAutoNamesCache[normalized] || {}),
            name: displayName || normalized,
            deleted: true,
            deletedAt: Date.now()
        };
        pendingAutoNameLearning = null;
        saveRejectedAutoNames();

        const verify = parseRejectedNameStoreObject(GM_getValue(REJECTED_AUTO_NAMES_SINGLE_DB_KEY));
        if (verify[normalized]?.deleted !== true) {
            console.error(`Toolbar rejected names: v24 delete verification FAILED for "${displayName}".`);
            return false;
        }
        rejectedAutoNamesCache = verify;
        window.__frt7_rejected_last_diag = `${displayName} = DELETED (verified)`;
        try { updateRejectedNameDiagnostic(window.__frt7_rejected_last_diag); } catch (_) {}
        queueExplicitSyncDeletion('rejectedNames', normalized);
        console.info(`Toolbar rejected names: v25 permanently deleted "${displayName}" and verified single DB.`);
        return true;
    }

    function clearRejectedAutoNames() {
        // Preserve hidden deletion records so Clear cannot accidentally resurrect
        // previously deleted names through later automatic learning.
        rejectedAutoNamesCache = Object.fromEntries(
            Object.entries(rejectedAutoNamesCache).filter(([, entry]) => entry?.deleted === true)
        );
        pendingAutoNameLearning = null;
        saveRejectedAutoNames();
        renderRejectedAutoNamesSettings();
        return true;
    }


    // v43 SAFE MULTI-WORD FIRST NAMES
    // This database is deliberately narrow: only exact, user-trusted multi-word
    // first names such as "Lee Ann" are stored. They get priority ONLY when the
    // exact phrase appears in the contact/header portion of the resume.
    const normalizeSafeFirstName = value => normalizeUnicode(String(value || ""))
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .replace(/[^A-Z'’\- ]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    function parseSafeFirstNamesStore(value) {
        try {
            if (typeof value === "string") {
                const parsed = JSON.parse(value || "{}");
                return parsed && typeof parsed === "object" ? parsed : {};
            }
            return value && typeof value === "object" ? value : {};
        } catch (_) {
            return {};
        }
    }

    function loadSafeFirstNames() {
        safeFirstNamesCache = parseSafeFirstNamesStore(GM_getValue(SAFE_FIRST_NAMES_KEY));
        return safeFirstNamesCache;
    }

    function saveSafeFirstNames() {
        GM_setValue(SAFE_FIRST_NAMES_KEY, JSON.stringify(safeFirstNamesCache));
        const verify = parseSafeFirstNamesStore(GM_getValue(SAFE_FIRST_NAMES_KEY));
        safeFirstNamesCache = verify;
        try { renderSafeFirstNamesSettings(); } catch (_) {}
        return true;
    }

    function isValidSafeMultiwordFirstName(value) {
        const display = normalizeContactDisplayCase(value);
        const words = display.split(/\s+/).filter(Boolean);

        // v44: the user's final First Name field is the authority. Any genuine
        // multi-word first name (2+ words) can be trusted/saved.
        if (words.length < 2) return false;
        if (words.some(word => !/^[A-Za-zÀ-ÖØ-öø-ÿ'’\-]+$/.test(word))) return false;
        return true;
    }

    function addSafeFirstName(value, source = "manual") {
        const display = normalizeContactDisplayCase(String(value || "").trim());
        if (!isValidSafeMultiwordFirstName(display)) {
            return { ok: false, reason: "Safe first names must contain at least 2 name words." };
        }

        const key = normalizeSafeFirstName(display);
        safeFirstNamesCache[key] = {
            name: display,
            source,
            learnedAt: Date.now()
        };
        saveSafeFirstNames();

        const verify = parseSafeFirstNamesStore(GM_getValue(SAFE_FIRST_NAMES_KEY));
        if (!verify[key]?.name) {
            return { ok: false, reason: "Safe first name did not persist." };
        }
        safeFirstNamesCache = verify;
        try { renderSafeFirstNamesSettings(); } catch (_) {}
        return { ok: true, key, entry: verify[key] };
    }

    function removeSafeFirstName(keyOrName) {
        const key = normalizeSafeFirstName(keyOrName);
        if (!key) return false;

        delete safeFirstNamesCache[key];
        saveSafeFirstNames();

        const verify = parseSafeFirstNamesStore(GM_getValue(SAFE_FIRST_NAMES_KEY));
        if (Object.prototype.hasOwnProperty.call(verify, key)) {
            console.error(`Toolbar safe first names: delete verification FAILED for "${key}".`);
            return false;
        }
        safeFirstNamesCache = verify;
        try { renderSafeFirstNamesSettings(); } catch (_) {}
        return true;
    }

    function clearSafeFirstNames() {
        safeFirstNamesCache = {};
        saveSafeFirstNames();
        return true;
    }

    loadSafeFirstNames();

    function escapeRegexLiteral(value) {
        return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function findSafeFirstNameInHeader(text) {
        if (!text) return null;

        const head = normalizeUnicode(String(text).slice(0, 500))
            .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015]/g, "-")
            .replace(/\s+/g, " ")
            .trim();

        const entries = Object.values(safeFirstNamesCache)
            .filter(entry => entry?.name)
            .sort((a, b) => String(b.name).length - String(a.name).length);

        for (const entry of entries) {
            const firstName = normalizeContactDisplayCase(entry.name);
            const phrasePattern = escapeRegexLiteral(firstName).replace(/\s+/g, "\\s+");
            const re = new RegExp(
                `(^|[^A-Za-zÀ-ÖØ-öø-ÿ'’\\-])(${phrasePattern})\\s+`,
                "i"
            );
            const match = re.exec(head);
            if (!match) continue;

            const after = head.slice(match.index + match[0].length);
            const tokens = after.split(/\s+/).filter(Boolean);
            if (!tokens.length) continue;

            const cleanToken = token => String(token || "")
                .replace(/^[^A-Za-zÀ-ÖØ-öø-ÿ'’\-]+|[^A-Za-zÀ-ÖØ-öø-ÿ'’\-]+$/g, "");

            let i = 0;
            let token = cleanToken(tokens[i]);
            if (!token) continue;

            // A middle initial immediately after the trusted multi-word first name
            // is allowed and skipped: "Mary Ann J. Smith".
            if (/^[A-Za-z]\.?$/.test(token) && tokens[i + 1]) {
                i++;
                token = cleanToken(tokens[i]);
            }
            if (!token) continue;

            const upper = token.toUpperCase().replace(/\.$/, "");
            if (
                NAME_STOPWORDS.has(upper) ||
                LOCATION_WORDS.has(upper) ||
                NON_NAME_TRAIL_WORDS.has(upper) ||
                isNameCredentialToken(token)
            ) {
                continue;
            }

            // Preserve recognized surname prefixes: Lee Ann De La Cruz.
            const lastParts = [token];
            let prefixPhrase = upper;
            if (NAME_PREFIXES.has(upper)) {
                i++;
                while (i < tokens.length) {
                    const next = cleanToken(tokens[i]);
                    if (!next) break;
                    const extended = `${prefixPhrase} ${next.toUpperCase()}`;
                    lastParts.push(next);

                    if (NAME_PREFIXES.has(extended)) {
                        prefixPhrase = extended;
                        i++;
                        continue;
                    }
                    break;
                }
            }

            const last = normalizeContactDisplayCase(lastParts.join(" "));
            if (!last) continue;

            return {
                first: firstName,
                last,
                safeMultiwordFirst: true
            };
        }

        return null;
    }

    const normalizeLearnedCity = value => String(value || "")
        .replace(/\bSt\.(?=\s)/gi, "St")
        .toUpperCase()
        .replace(/[’‘]/g, "'")
        .replace(/[^A-Z0-9.' -]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    // v122 MULTI-STATE SAME-CITY KEYS:
    // Saved/trusted cities are distinct CITY + STATE pairs. This allows entries such
    // as Columbus, GA and Columbus, OH to coexist instead of overwriting each other.
    // A blank-state entry is stored separately as CITY|| and is only used as a
    // fallback when that city is otherwise unambiguous.
    function learnedCityStateKey(city, state = "") {
        const cityKey = normalizeLearnedCity(city);
        const stateKey = String(state || "").trim().toUpperCase();
        return cityKey ? `${cityKey}||${stateKey}` : "";
    }

    function rekeyLearnedCitiesByPair(store) {
        const source = store && typeof store === "object" ? store : {};
        const rekeyed = {};

        for (const [storedKey, entry] of Object.entries(source)) {
            if (!entry || !String(entry.city || "").trim()) continue;

            const city = String(entry.city || "").trim();
            const state = String(entry.state || "").trim().toUpperCase();
            const pairKey = learnedCityStateKey(city, state);
            if (!pairKey) continue;

            // If duplicate representations of the exact same pair exist, keep the
            // newest record while preserving deletion tombstones.
            const existing = rekeyed[pairKey];
            if (!existing) {
                rekeyed[pairKey] = { ...entry, city, state };
                continue;
            }

            if (existing.deleted === true || entry.deleted === true) {
                rekeyed[pairKey] = {
                    ...(Number(entry.deletedAt || 0) >= Number(existing.deletedAt || 0) ? existing : entry),
                    city,
                    state,
                    deleted: true,
                    deletedAt: Math.max(Number(existing.deletedAt || 0), Number(entry.deletedAt || 0)) || Date.now()
                };
                continue;
            }

            const existingTime = Number(existing.learnedAt || existing.savedAt || 0);
            const incomingTime = Number(entry.learnedAt || entry.savedAt || 0);
            rekeyed[pairKey] = incomingTime >= existingTime
                ? { ...existing, ...entry, city, state }
                : { ...entry, ...existing, city, state };
        }

        return rekeyed;
    }

    // v124 U.S. CITY DATABASE: Census-derived places list, cached locally once.
    // The large base list is kept separate from Learned Cities so ordinary saves/exports
    // stay small. Only user overrides (adds/edits/disables) are exported.
    let usCityDbRows = [];
    let usCityDbPairSet = new Set();
    let usCityDbOverrides = {};
    let usCityDbLoaded = false;
    let usCityDbLoading = false;

    function parseJsonObject(value) {
        try {
            if (typeof value === "string") return JSON.parse(value || "{}");
            return value && typeof value === "object" ? value : {};
        } catch (_) { return {}; }
    }

    function usCityPairKey(city, state) {
        return learnedCityStateKey(city, state);
    }

    function loadUsCityOverrides() {
        usCityDbOverrides = parseJsonObject(GM_getValue(US_CITY_DB_OVERRIDES_KEY, "{}"));
        return usCityDbOverrides;
    }

    function saveUsCityOverrides() {
        GM_setValue(US_CITY_DB_OVERRIDES_KEY, JSON.stringify(usCityDbOverrides));
        rebuildUsCityDbIndex();
        try { renderUsCityDatabaseSettings(); } catch (_) {}
    }

    function rebuildUsCityDbIndex() {
        const set = new Set();
        for (const row of usCityDbRows) {
            const key = usCityPairKey(row.city, row.state);
            const ov = usCityDbOverrides[key];
            if (key && ov?.disabled !== true) set.add(key);
        }
        for (const [key, ov] of Object.entries(usCityDbOverrides)) {
            if (ov?.disabled === true) set.delete(key);
            else if (ov?.city && /^[A-Z]{2}$/.test(String(ov.state || "").toUpperCase())) set.add(usCityPairKey(ov.city, ov.state));
        }
        usCityDbPairSet = set;
    }

    function parseUsCityCsv(csvText) {
        const rows = [];
        const lines = String(csvText || "").split(/\r?\n/);
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line) continue;
            // Dataset names do not contain raw commas; quoted fields are uncommon, but
            // split first 5 columns safely enough for name/state extraction.
            const m = line.match(/^([^,]*),((?:"[^"]*")|[^,]*),((?:"[^"]*")|[^,]*),([^,]+),/);
            if (!m) continue;
            const city = String(m[2] || "").replace(/^"|"$/g, "").replace(/""/g, '"').trim();
            const state = String(m[4] || "").trim().toUpperCase();
            if (!city || !/^[A-Z]{2}$/.test(state)) continue;
            rows.push({ city: normalizeContactDisplayCase(city), state });
        }
        return rows;
    }

    function fetchUsCityDatabase() {
        if (usCityDbLoading) return;
        usCityDbLoading = true;
        const status = document.getElementById("frt7-us-city-db-status");
        if (status) status.textContent = "Loading U.S. city database…";
        GM_xmlhttpRequest({
            method: "GET",
            url: US_CITY_DB_SOURCE,
            onload: response => {
                try {
                    const rows = parseUsCityCsv(response.responseText);
                    if (rows.length < 10000) throw new Error("City database response was incomplete.");
                    usCityDbRows = rows;
                    GM_setValue(US_CITY_DB_CACHE_KEY, JSON.stringify(rows));
                    usCityDbLoaded = true;
                    usCityDbLoading = false;
                    rebuildUsCityDbIndex();
                    renderUsCityDatabaseSettings();
                    console.info(`Toolbar CITY v125: loaded ${rows.length.toLocaleString()} Census-derived U.S. places.`);

                    // v189: if the City field was already prefilled before the database
                    // finished loading, normalize ONLY City now that exact pair lookup is ready.
                    try { frt7QueueCityOnlyCanonicalizerV189("U.S. city database loaded"); } catch (_) {}

                    // v125 LOAD-RACE FIX:
                    // Auto City may have run before the large U.S. database finished loading.
                    // In that case an existing WallStJobs City/State/ZIP (for example
                    // Midlothian, TX 76063) could be treated as valid and the applicant
                    // marked complete before the database had a chance to recognize the
                    // explicit resume-header pair Midlothian, VA. Force one fresh trusted
                    // header scan as soon as the database becomes available.
                    try {
                        delayedCityClickSignature = "";
                        queueDelayedCityButtonClick("U.S. city database loaded");

                        // v185: The Area path deliberately waits while this database is
                        // loading. Once it is ready, rerun the SAME guarded Area fallback
                        // after City has had a moment to claim any explicit header pair.
                        setTimeout(() => {
                            try { tryAutoAreaFallback("U.S. city database loaded"); } catch (_) {}
                        }, 120);
                    } catch (_) {}
                } catch (error) {
                    usCityDbLoading = false;
                    if (status) status.textContent = `City database load failed: ${error.message}`;
                    console.warn("Toolbar CITY v124 database load failed.", error);
                }
            },
            onerror: () => {
                usCityDbLoading = false;
                if (status) status.textContent = "City database download failed. Click Refresh Database to retry.";
            }
        });
    }

    function loadUsCityDatabase() {
        loadUsCityOverrides();
        try {
            const cached = JSON.parse(GM_getValue(US_CITY_DB_CACHE_KEY, "[]") || "[]");
            if (Array.isArray(cached) && cached.length > 10000) {
                usCityDbRows = cached;
                usCityDbLoaded = true;
                rebuildUsCityDbIndex();
                try { frt7QueueCityOnlyCanonicalizerV189("cached U.S. city database ready"); } catch (_) {}
                return;
            }
        } catch (_) {}
        fetchUsCityDatabase();
    }

    function isUsCityDatabasePair(city, state) {
        if (!usCityDbLoaded) return false;
        return usCityDbPairSet.has(usCityPairKey(city, state));
    }


    // v171 SAFE TRUE-HEADER City, ZIP -> State resolver:
    // Some resumes omit the state but clearly write "City, 12345" in the contact header.
    // Resolve the ZIP's state locally, then trust the result ONLY when that exact
    // City+State exists in our active U.S. City Database. This never scans Experience/
    // Education because it uses the same true-header boundary as the rest of City logic.
    // The table uses conservative 3-digit USPS ZIP prefix ranges. Known cross-state/
    // exceptional prefixes are intentionally omitted, so uncertainty means NO MATCH.
    const FRT7_ZIP3_STATE_RANGES_V171 = [
        [10,27,"MA"],[30,38,"NH"],[39,49,"ME"],[60,69,"CT"],[70,89,"NJ"],
        [100,149,"NY"],[150,196,"PA"],[197,199,"DE"],[200,205,"DC"],[206,219,"MD"],
        [220,246,"VA"],[247,268,"WV"],[270,289,"NC"],[290,299,"SC"],[300,319,"GA"],
        [320,349,"FL"],[350,369,"AL"],[370,385,"TN"],[386,397,"MS"],[398,399,"GA"],
        [400,427,"KY"],[430,459,"OH"],[460,479,"IN"],[480,499,"MI"],[500,528,"IA"],
        [530,549,"WI"],[550,567,"MN"],[570,577,"SD"],[580,588,"ND"],[590,599,"MT"],
        [600,629,"IL"],[630,658,"MO"],[660,679,"KS"],[680,693,"NE"],[700,714,"LA"],
        [716,729,"AR"],[730,749,"OK"],[750,799,"TX"],[800,816,"CO"],[820,831,"WY"],
        [832,838,"ID"],[840,847,"UT"],[850,865,"AZ"],[870,884,"NM"],[889,898,"NV"],
        [900,961,"CA"],[967,968,"HI"],[970,979,"OR"],[980,994,"WA"],[995,999,"AK"]
    ];

    function frt7StateFromZipV171(zipValue) {
        const zip = String(zipValue || "").replace(/\D/g, "");
        if (zip.length !== 5) return "";

        // Deliberately refuse special/ambiguous prefixes rather than guess.
        // 005 is IRS NY; 055 is MA; 06390 is Fishers Island NY while most 063 is CT.
        if (zip.startsWith("005")) return "NY";
        if (zip.startsWith("055")) return "MA";
        if (zip === "06390") return "NY";

        const prefix = Number(zip.slice(0, 3));
        if (!Number.isFinite(prefix)) return "";
        for (const [lo, hi, state] of FRT7_ZIP3_STATE_RANGES_V171) {
            if (prefix >= lo && prefix <= hi) return state;
        }
        return "";
    }

    // v306: fillLocationFromPhone() is outside this toolbar IIFE. v300 tried to
    // call frt7StateFromZipV171() directly from there, which throws a ReferenceError
    // as soon as WallStJobs paints any ZIP. Expose only this read-only resolver so
    // Area can reject a stale/wrong-state ZIP and continue its bounded retries.
    window.__frt7_state_from_zip_v306 = frt7StateFromZipV171;

    function findUsCityZipInHeaderV171(text) {
        if (!usCityDbLoaded || !text) return null;

        const rawStart = String(text).slice(0, 1800);
        const sectionStop = findTrueResumeSectionStop(rawStart);
        const head = frt7MaskStateListsInHeader((sectionStop >= 0 ? rawStart.slice(0, sectionStop) : rawStart.slice(0, 900)).slice(0, 900));
        if (!head.trim()) return null;

        // v208 BLACK-CIRCLE HEADER SEPARATOR FIX:
        // HTML &#9679; inside txtResumeRaw becomes the Unicode BLACK CIRCLE "●" in
        // textarea.value. Treat it as the same hard contact delimiter as • and ·.
        //
        // v207 HEADER CITY + ZIP WITHOUT STATE:
        // Keep the original high-confidence "City, 12345" rule, but also support
        // contact headers such as "300 North State St. • Chicago 60654 • email".
        // The no-comma form is accepted ONLY when the City+ZIP is its own visible
        // contact segment (bullet/pipe/semicolon/newline/large-space delimited), the
        // ZIP resolves to a state, AND the exact City+State exists in the active U.S.
        // City Database. This is deliberately NOT a generic city-near-number scan.
        const patterns = [
            {
                re: /(^|[^A-Za-zÀ-ÖØ-öø-ÿ])([A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ.'’\-]*(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ.'’\-]*){0,3})\s*,\s*(\d{5})(?:-\d{4})?\b/g,
                cityGroup: 2, zipGroup: 3, prefixGroup: 1, noComma: false
            },
            {
                re: /(^|[|•·●;\n\r]|\s{2,})\s*([A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ.'’\-]*(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ.'’\-]*){0,3})\s+(\d{5})(?:-\d{4})?(?=\s*(?:[|•·●;\n\r]|$))/g,
                cityGroup: 2, zipGroup: 3, prefixGroup: 1, noComma: true
            }
        ];

        for (const pattern of patterns) {
            pattern.re.lastIndex = 0;
            let m;
            while ((m = pattern.re.exec(head))) {
                const zip = String(m[pattern.zipGroup] || "");
                const state = frt7StateFromZipV171(zip);
                if (!state) continue;

                // The regex may include preceding address/name words. Try suffixes
                // longest-to-shortest and accept only an exact active City+State pair.
                const words = String(m[pattern.cityGroup] || "").trim().split(/\s+/).filter(Boolean);
                for (let start = 0; start < words.length; start++) {
                    const city = normalizeContactDisplayCase(words.slice(start).join(" "));
                    if (!city || learnedCityCollidesWithApplicantLastName(city)) continue;
                    if (!isUsCityDatabasePair(city, state)) continue;

                    console.info(
                        `Toolbar CITY v207: true-header City${pattern.noComma ? " " : ", "}ZIP verified -> ` +
                        `${city}, ${state} ${zip}.`
                    );
                    return {
                        city, state, zip,
                        trusted: true,
                        explicitHeaderCityZip: true,
                        headerCityZipNoState: true,
                        headerCityZipNoComma: pattern.noComma,
                        index: m.index + String(m[pattern.prefixGroup] || "").length
                    };
                }
            }
        }
        return null;
    }

    // v156 TRUE SECTION-HEADING DETECTOR:
    // Do not stop the contact header merely because a section WORD appears inside
    // ordinary prose/title text. Example:
    //   "The Eternal Divorce:Public Education and Church Elon, NC"
    // "Education" there is not an EDUCATION section heading.
    //
    // Multi-word headings are distinctive enough to accept normally.
    // Ambiguous one-word headings (EDUCATION, EXPERIENCE, SKILLS, etc.) count only
    // when they LOOK like a heading: ALL CAPS, or visibly separated by 2+ whitespace
    // characters on both sides in the raw resume text.
    function findTrueResumeSectionStop(source) {
        const s = String(source || "");
        if (!s) return -1;

        const phraseRe = /\b(?:PROFESSIONAL\s+SUMMARY|CAREER\s+SUMMARY|PROFESSIONAL\s+EXPERIENCE|WORK\s+EXPERIENCE|EMPLOYMENT\s+HISTORY|CORE\s+COMPETENCIES|CAREER\s+PROFILE)\b/ig;
        const singleRe = /\b(?:SUMMARY|OBJECTIVE|EXPERIENCE|EDUCATION|SKILLS|QUALIFICATIONS)\b/ig;

        // v170 SAFE GLUED-HEADING STOP:
        // Flattened resume text can occasionally glue the next all-caps label/company
        // directly onto a real section heading, e.g. "EXPERIENCEMKTG Tulsa, OK".
        // The ordinary \b...\b matcher misses that because there is no word boundary
        // after EXPERIENCE. Treat it as a section stop only when:
        //   1) the base heading itself is one of our known one-word section headings;
        //   2) at least TWO additional uppercase letters are glued directly to it
        //      (so ordinary words such as "EXPERIENCED"/"EXPERIENCES" do not match);
        //   3) the glued token begins at the start of the text or after 2+ whitespace,
        //      which is the same strong "looks like a heading" evidence used below.
        // This changes only the header boundary; it does not alter city ranking,
        // learned-city logic, Area fallback, ZIP lookup, or manual-edit protection.
        const gluedHeadingRe = /(?:^|\s{2,})((?:SUMMARY|OBJECTIVE|EXPERIENCE|EDUCATION|SKILLS|QUALIFICATIONS)[A-Z]{2,16})\b/g;

        let best = -1;
        let m;

        while ((m = phraseRe.exec(s))) {
            if (best < 0 || m.index < best) best = m.index;
        }

        while ((m = gluedHeadingRe.exec(s))) {
            const full = String(m[0] || "");
            const token = String(m[1] || "");
            const tokenOffset = full.lastIndexOf(token);
            const start = m.index + Math.max(0, tokenOffset);
            if (best < 0 || start < best) best = start;
        }

        while ((m = singleRe.exec(s))) {
            const token = String(m[0] || "");
            const start = m.index;
            const end = start + token.length;

            // Strong heading evidence #1: the source itself used ALL CAPS.
            const allCaps = token === token.toUpperCase();

            // Strong heading evidence #2: flattened resume text usually preserves
            // multiple spaces/newlines around real section headings.
            const before = s.slice(Math.max(0, start - 8), start);
            const after = s.slice(end, Math.min(s.length, end + 24));
            const separatedBefore = start === 0 || /\s{2,}$/.test(before);
            const separatedAfter = end >= s.length || /^\s{2,}/.test(after);
            const visuallySeparated = separatedBefore && separatedAfter;

            // v186 ALL-CAPS TITLE-PHRASE GUARD:
            // A one-word section label can also be an ordinary ALL-CAPS word inside
            // a resume subtitle/tagline. Example:
            //   "CUSTOMER SUCCESS | STUDENT FAMILY ENGAGEMENT | EDUCATION SERVICES  Independence, KY"
            // v185 treated the word EDUCATION as the start of the Education section,
            // cutting the true header BEFORE Independence, KY. That made the header
            // resolver return nothing and allowed 512 -> Austin, TX to win.
            //
            // If an ALL-CAPS ambiguous heading word is immediately followed by ONE
            // normal space plus another ALL-CAPS word, it is part of an ALL-CAPS
            // phrase, not a standalone section heading. A genuinely separated heading
            // (e.g. "  EDUCATION  Northern Kentucky University") still stops normally.
            const followedByAllCapsPhraseWord =
                allCaps &&
                !visuallySeparated &&
                /^ [A-Z][A-Z&'’\-]{1,30}\b/.test(after);

            if (followedByAllCapsPhraseWord) {
                console.info(
                    `Toolbar CITY v186: ignored ALL-CAPS "${token}" inside header title phrase.`
                );
                continue;
            }

            if (!allCaps && !visuallySeparated) continue;
            if (best < 0 || start < best) best = start;
        }

        return best;
    }

    // v197.5 FLATTENED/SMOOSHED HEADER CITY RECOVERY:
    // PDF/text extraction can remove the separator immediately BEFORE the contact city:
    //   "Digital Support ProfessionalTacoma, WAmandy..."
    // The ordinary City+State parser sees "ProfessionalTacoma" as one token and cannot
    // prove Tacoma, WA. This helper asks the already-loaded U.S. city database whether
    // the text immediately before the state ENDS with a real city for that state.
    //
    // requireGlued=true is deliberately strict: the recovered city must actually be
    // attached to an alphabetic character on its left. That keeps this as a fallback
    // for damaged headers only; normal City, ST parsing remains unchanged.
    function findUsCitySuffixBeforeState(beforeText, state, requireGlued = false) {
        if (!usCityDbLoaded) return null;
        const cleanState = String(state || "").trim().toUpperCase();
        if (!/^[A-Z]{2}$/.test(cleanState)) return null;

        const tail = String(beforeText || "")
            .replace(/[|•·]+/g, " ")
            .replace(/[(),]+$/g, "")
            .trim();
        if (!tail) return null;

        const active = new Map();
        for (const row of usCityDbRows || []) {
            if (String(row?.state || "").trim().toUpperCase() !== cleanState) continue;
            if (!isUsCityDatabasePair(row.city, cleanState)) continue;
            active.set(normalizeLearnedCity(row.city), normalizeContactDisplayCase(row.city));
        }
        for (const ov of Object.values(usCityDbOverrides || {})) {
            if (ov?.disabled === true) continue;
            if (String(ov?.state || "").trim().toUpperCase() !== cleanState) continue;
            if (!ov?.city || !isUsCityDatabasePair(ov.city, cleanState)) continue;
            active.set(normalizeLearnedCity(ov.city), normalizeContactDisplayCase(ov.city));
        }

        const cities = [...active.values()].sort((a, b) => b.length - a.length);
        for (const city of cities) {
            const escapedCity = city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const cityRe = new RegExp(escapedCity.replace(/\s+/g, "\\s+") + "$", "i");
            let m = tail.match(cityRe);

            // v240 SQUISHED KNOWN-CITY RECOVERY:
            // Text extraction can remove spaces INSIDE a real multi-word city:
            //   BullheadCity,AZ -> Bullhead City, AZ
            // Only allow this for a canonical city already trusted for THIS exact state.
            // We do not guess word breaks or accept arbitrary text.
            if (!m && /\s/.test(city)) {
                const compactCity = city.replace(/\s+/g, "");
                const compactRe = new RegExp(
                    compactCity.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$",
                    "i"
                );
                m = tail.match(compactRe);
            }
            if (!m) continue;

            const start = tail.length - String(m[0] || "").length;
            const beforeChar = start > 0 ? tail[start - 1] : "";
            const isActuallyGlued = /[A-Za-zÀ-ÖØ-öø-ÿ]/.test(beforeChar);

            if (requireGlued && !isActuallyGlued) continue;
            if (learnedCityCollidesWithApplicantLastName(city)) continue;

            return {
                city: normalizeContactDisplayCase(city),
                state: cleanState,
                censusDatabase: true,
                trusted: true,
                withState: true,
                gluedHeaderRecovery: isActuallyGlued
            };
        }
        return null;
    }

    // Built-in database matching is deliberately stricter than Learned Cities:
    // it only accepts an explicit City + State pair in the true resume header.
    function findUsCityDatabaseInHeader(text) {
        if (!usCityDbLoaded || !text) return null;
        const rawStart = String(text).slice(0, 1800);
        const sectionStop = findTrueResumeSectionStop(rawStart);
        const head = frt7MaskStateListsInHeader((sectionStop >= 0 ? rawStart.slice(0, sectionStop) : rawStart.slice(0, 900)).slice(0, 900));
        // v140 FULL STATE-NAME HEADER SUPPORT:
        // Treat a written-out state exactly like its 2-letter abbreviation when an
        // explicit City + State appears in the true resume header. This prevents an
        // ambiguous same-name city (for example Westfield in several states) from
        // falling through to the wrong database pair when the resume says
        // "Westfield, Indiana" instead of "Westfield, IN".
        const escapeStateRegex = value => String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const stateChoices = [...Object.keys(STATE_MAP), ...Object.values(STATE_MAP)]
            .sort((a, b) => b.length - a.length)
            .map(value => escapeStateRegex(value).replace(/\s+/g, "\\s+"))
            .join("|");
        const stateRe = new RegExp("(?:,|\\s)\\s*(" + stateChoices + ")\\b", "ig");
        let match;
        while ((match = stateRe.exec(head))) {
            const rawStateToken = String(match[1] || "");
            const normalizedStateToken = rawStateToken.trim().toUpperCase().replace(/\s+/g, " ");
            const state = STATE_MAP[normalizedStateToken] ||
                (Object.values(STATE_MAP).includes(normalizedStateToken) ? normalizedStateToken : "");
            if (!state) continue;

            // v131 STREET-SUFFIX GUARD:
            // A mixed-case 2-letter token with NO comma is commonly a street suffix,
            // not a state abbreviation:
            //   "19901 Bloomfield Ct Hagerstown, MD"
            // Here "Ct" means Court, so it must NOT create Bloomfield, CT.
            //
            // We still accept:
            //   "Hagerstown, MD"  -> comma makes it explicit
            //   "Hagerstown MD"   -> uppercase state abbreviation
            const hasCommaBeforeState = String(match[0] || "").includes(",");
            if (
                !hasCommaBeforeState &&
                /^[A-Za-z]{2}$/.test(rawStateToken) &&
                rawStateToken !== rawStateToken.toUpperCase()
            ) {
                console.info(
                    `Toolbar CITY v131: ignored mixed-case street suffix "${rawStateToken}" as a state.`
                );
                continue;
            }

            const before = head.slice(Math.max(0, match.index - 90), match.index)
                .replace(/[|•·]+/g, "\n")
                .split(/[\n\r;]+/).pop()
                .replace(/[(),]+$/g, "")
                .trim();
            const words = before.split(/\s+/).filter(Boolean);
            for (let n = Math.min(5, words.length); n >= 1; n--) {
                const candidate = words.slice(-n).join(" ").replace(/^[^A-Za-zÀ-ÖØ-öø-ÿ]+|[^A-Za-zÀ-ÖØ-öø-ÿ.'’\- ]+$/g, "");
                if (!candidate) continue;
                if (learnedCityCollidesWithApplicantLastName(candidate)) continue;
                if (isUsCityDatabasePair(candidate, state)) {
                    return { city: normalizeContactDisplayCase(candidate), state, censusDatabase: true, trusted: true, withState: true, index: match.index };
                }
            }

            // v197.5: If the normal word-boundary parse failed, recover ONLY a real
            // city for this exact state that is visibly glued to the preceding header word.
            // Example: "ProfessionalTacoma, WA..." -> Tacoma, WA.
            if (hasCommaBeforeState) {
                const glued = findUsCitySuffixBeforeState(before, state, true);
                if (glued) {
                    console.info(
                        `Toolbar CITY v197.5: recovered smooshed header location ` +
                        `"${glued.city}, ${glued.state}" before "${rawStateToken}".`
                    );
                    return { ...glued, index: match.index };
                }
            }
        }

        // v197.6 GLUED STATE->EMAIL RECOVERY:
        // Some flattened headers remove BOTH separators around the state/email boundary:
        //   "ProfessionalTacoma, WAmandy.anderson1114@gmail.com"
        // The normal state matcher above intentionally requires a word boundary after WA,
        // so it cannot see WA when the email username starts immediately with a letter.
        // Recover this only when ALL of the following are true:
        //   1) there is an explicit comma before a real U.S. state abbreviation;
        //   2) that state is glued directly to something that has a valid @domain later;
        //   3) the text before the comma ends with a real city for that exact state; and
        //   4) that city is itself visibly glued to the preceding header word.
        // This keeps ordinary headers and legitimate email usernames untouched.
        const gluedStateChoices = Object.values(STATE_MAP)
            .filter(value => /^[A-Z]{2}$/.test(String(value || "")))
            .sort((a, b) => b.length - a.length)
            .map(value => escapeStateRegex(value))
            .join("|");
        const gluedStateEmailRe = new RegExp(
            ",\\s*(" + gluedStateChoices + ")(?=[A-Z0-9._%+\\-]+@[A-Z0-9.-]+\\.[A-Z]{2,})",
            "ig"
        );
        let gluedStateMatch;
        while ((gluedStateMatch = gluedStateEmailRe.exec(head))) {
            const state = String(gluedStateMatch[1] || "").trim().toUpperCase();
            if (!state) continue;

            const before = head.slice(Math.max(0, gluedStateMatch.index - 90), gluedStateMatch.index)
                .replace(/[|•·]+/g, "\n")
                .split(/[\n\r;]+/).pop()
                .replace(/[(),]+$/g, "")
                .trim();

            const glued = findUsCitySuffixBeforeState(before, state, true);
            if (!glued) continue;

            console.info(
                `Toolbar CITY v197.6: recovered fully smooshed header location ` +
                `"${glued.city}, ${glued.state}" from City, STATEemail pattern.`
            );
            return { ...glued, index: gluedStateMatch.index, gluedStateEmailRecovery: true };
        }

        return null;
    }

    function addUsCityOverride(city, state) {
        const cleanCity = normalizeContactDisplayCase(String(city || "").trim());
        const cleanState = String(state || "").trim().toUpperCase();
        if (!cleanCity || !/^[A-Z]{2}$/.test(cleanState)) return false;
        const key = usCityPairKey(cleanCity, cleanState);
        usCityDbOverrides[key] = { city: cleanCity, state: cleanState, disabled: false, editedAt: Date.now() };
        saveUsCityOverrides();
        return true;
    }

    function disableUsCityPair(city, state) {
        const key = usCityPairKey(city, state);
        if (!key) return false;
        usCityDbOverrides[key] = { ...(usCityDbOverrides[key] || {}), city: normalizeContactDisplayCase(city), state: String(state || "").toUpperCase(), disabled: true, editedAt: Date.now() };
        saveUsCityOverrides();
        return true;
    }

    function renderUsCityDatabaseSettings() {
        const list = document.getElementById("frt7-us-city-db-list");
        const status = document.getElementById("frt7-us-city-db-status");
        if (!list) return;
        if (status) status.textContent = usCityDbLoaded
            ? `${usCityDbPairSet.size.toLocaleString()} active City, ST pairs. Search to view/edit.`
            : (usCityDbLoading ? "Loading U.S. city database…" : "Database not loaded yet.");
        list.innerHTML = "";
        if (!usCityDbLoaded) return;
        const q = String(document.getElementById("frt7-us-city-db-search")?.value || "").trim().toLowerCase();
        const combined = new Map();
        for (const row of usCityDbRows) {
            const key = usCityPairKey(row.city, row.state);
            const ov = usCityDbOverrides[key];
            if (ov?.disabled === true) continue;
            combined.set(key, { city: ov?.city || row.city, state: ov?.state || row.state, source: "Census" });
        }
        for (const [key, ov] of Object.entries(usCityDbOverrides)) {
            if (ov?.disabled !== true && ov?.city) combined.set(key, { city: ov.city, state: ov.state, source: "Custom" });
        }
        const matches = [...combined.values()].filter(row => {
            if (!q) return true;
            return `${row.city}, ${row.state}`.toLowerCase().includes(q) || row.state.toLowerCase() === q;
        }).sort((a,b)=>a.city.localeCompare(b.city)||a.state.localeCompare(b.state)).slice(0, 250);
        if (!matches.length) {
            list.textContent = q ? "No matching database cities." : "No database cities available.";
            return;
        }
        for (const rowData of matches) {
            const row = document.createElement("div");
            row.style.cssText = "display:grid;grid-template-columns:1fr auto auto;gap:5px;align-items:center;padding:3px 0;";
            const label = document.createElement("span");
            label.textContent = `${rowData.city}, ${rowData.state}${rowData.source === "Custom" ? "  • custom" : ""}`;
            const edit = document.createElement("button"); edit.type="button"; edit.textContent="Edit";
            edit.addEventListener("click", () => {
                const replacement = prompt("Edit as City, ST", `${rowData.city}, ${rowData.state}`);
                if (!replacement) return;
                const m = replacement.match(/^\s*(.+?)\s*,\s*([A-Za-z]{2})\s*$/);
                if (!m) { alert("Use City, ST format, for example Columbus, GA"); return; }
                disableUsCityPair(rowData.city, rowData.state);
                addUsCityOverride(m[1], m[2]);
            });
            const del = document.createElement("button"); del.type="button"; del.textContent="×"; del.title="Disable this built-in City, ST pair";
            del.addEventListener("click", () => disableUsCityPair(rowData.city, rowData.state));
            row.append(label, edit, del); list.appendChild(row);
        }
    }

    loadUsCityDatabase();

    function parseLearnedCitiesStore(value) {
        try {
            if (typeof value === "string") {
                const parsed = JSON.parse(value || "{}");
                return parsed && typeof parsed === "object" ? parsed : {};
            }
            return value && typeof value === "object" ? value : {};
        } catch (_) {
            return {};
        }
    }

    // v122 PAIR-KEYED SINGLE DATABASE.
    // Deleted cities remain as hidden tombstones, but each CITY + STATE pair has its
    // own key. Existing v59 city-only keys are migrated in place without deleting data.
    async function loadLearnedCities() {
        const existingSingle = GM_getValue(LEARNED_CITIES_SINGLE_DB_KEY);
        let single = parseLearnedCitiesStore(existingSingle);

        if (existingSingle === undefined || existingSingle === null) {
            const oldStored = parseLearnedCitiesStore(GM_getValue(LEARNED_CITIES_KEY));
            single = {};
            for (const [storedKey, entry] of Object.entries(oldStored)) {
                if (!entry || !String(entry.city || "").trim()) continue;
                const city = String(entry.city || storedKey).trim();
                const state = String(entry.state || "").trim().toUpperCase();
                const key = learnedCityStateKey(city, state);
                if (!key) continue;
                single[key] = { ...entry, city, state, deleted: false };
            }
        }

        // Always normalize the persisted database to CITY||STATE keys. This safely
        // migrates existing users whose current v59 store is keyed only by city name.
        single = rekeyLearnedCitiesByPair(single);
        GM_setValue(LEARNED_CITIES_SINGLE_DB_KEY, JSON.stringify(single));

        learnedCitiesCache = single;
        learnedCitiesLoaded = true;
        learnedCityCorrectionsCache = {};
        learnedCityCorrectionsLoaded = true;
        return learnedCitiesCache;
    }

    const learnedCitiesReady = loadLearnedCities().catch(error => {
        console.warn("Toolbar learned cities: could not load v59 single database.", error);
        learnedCitiesCache = {};
        learnedCityCorrectionsCache = {};
        learnedCitiesLoaded = true;
        learnedCityCorrectionsLoaded = true;
        return learnedCitiesCache;
    });

    async function saveLearnedCities() {
        GM_setValue(LEARNED_CITIES_SINGLE_DB_KEY, JSON.stringify(learnedCitiesCache));
        const verify = parseLearnedCitiesStore(GM_getValue(LEARNED_CITIES_SINGLE_DB_KEY));
        learnedCitiesCache = verify;
        try { renderLearnedCitiesSettings(); } catch (_) {}
        return true;
    }

    async function learnCity(city, state = "", options = {}) {
        if (typeof discardLearningIsBlocked === "function" && discardLearningIsBlocked()) {
            console.info("Toolbar v45 DISCARD: trusted city was NOT learned.");
            return false;
        }
        const cleanCity = normalizeContactDisplayCase(String(city || "").trim().replace(/\s+/g, " "));
        const cleanState = String(state || "").trim().toUpperCase();
        const key = learnedCityStateKey(cleanCity, cleanState);
        const manualRestore = options?.manual === true;

        if (!key) return false;
        if (cleanState && !/^[A-Z]{2}$/.test(cleanState)) return false;

        // v138 LIGHTWEIGHT REMOTE PLACEHOLDER GUARD:
        // Work-mode placeholders are never real cities and must never enter the
        // trusted-city database. This prevents values such as "Remote, FL" from
        // suppressing the Area fallback on later resumes.
        if (/^(?:remote|hybrid|remote\s*\/\s*hybrid|hybrid\s*\/\s*remote|no\s+location)$/i.test(cleanCity)) {
            console.info(`Toolbar trusted cities v138: ignored non-city placeholder "${cleanCity}".`);
            return false;
        }

        if (/\d|@/.test(cleanCity)) return false;
        if (cleanCity.split(/\s+/).filter(Boolean).length > 5) return false;
        if (/[;:!?]/.test(cleanCity)) return false;

        await learnedCitiesReady;
        const prior = learnedCitiesCache[key];

        // Same protection as rejected names: an X-deleted city stays deleted and
        // cannot be recreated by Auto/Revert/workflow learning. Explicit Add restores it.
        if (prior?.deleted === true && !manualRestore) {
            console.info(`Toolbar trusted cities v59: kept deleted city hidden: "${cleanCity}".`);
            return false;
        }

        const finalState = cleanState;
        if (prior && prior.deleted !== true && prior.city === cleanCity && String(prior.state || "") === finalState) return true;

        learnedCitiesCache[key] = {
            ...(prior || {}),
            city: cleanCity,
            state: finalState,
            trustedManualCity: true,
            deleted: false,
            deletedAt: undefined,
            learnedAt: Date.now()
        };
        await saveLearnedCities();
        console.info("Toolbar learned TRUSTED city:", cleanCity, finalState || "(state unknown)");
        return true;
    }

    async function addManualTrustedCity(city, state = "") {
        const cleanCity = normalizeContactDisplayCase(String(city || "").trim().replace(/\s+/g, " "));
        const cleanState = String(state || "").trim().toUpperCase();

        if (!cleanCity) return { ok: false, reason: "City is required." };
        if (cleanState && !/^[A-Z]{2}$/.test(cleanState)) {
            return { ok: false, reason: "State must be a 2-letter abbreviation or blank." };
        }

        const ok = await learnCity(cleanCity, cleanState, { manual: true });
        if (!ok) return { ok: false, reason: "City could not be saved." };

        const key = learnedCityStateKey(cleanCity, cleanState);
        const verify = parseLearnedCitiesStore(GM_getValue(LEARNED_CITIES_SINGLE_DB_KEY));
        if (!verify[key]?.city || verify[key]?.deleted === true) {
            console.error(`Toolbar trusted cities: add verification FAILED for "${cleanCity}".`);
            return { ok: false, reason: "City did not persist." };
        }

        learnedCitiesCache = verify;
        renderLearnedCitiesSettings();
        console.info(`Toolbar trusted cities: added and verified "${cleanCity}"${cleanState ? ", " + cleanState : ""}.`);
        return { ok: true, key, entry: verify[key] };
    }

    async function forgetLearnedCity(key, cityValue = "") {
        await learnedCitiesReady;

        const exactKey = Object.prototype.hasOwnProperty.call(learnedCitiesCache, key)
            ? key
            : learnedCityStateKey(cityValue || key, "");
        if (!exactKey) return false;
        const prior = learnedCitiesCache[exactKey] || {};
        const displayCity = String(prior.city || cityValue || key || exactKey).trim();

        learnedCitiesCache[exactKey] = {
            ...prior,
            city: displayCity,
            state: String(prior.state || "").trim().toUpperCase(),
            deleted: true,
            deletedAt: Date.now()
        };
        await saveLearnedCities();

        const verify = parseLearnedCitiesStore(GM_getValue(LEARNED_CITIES_SINGLE_DB_KEY));
        if (verify[exactKey]?.deleted !== true) {
            console.error(`Toolbar trusted cities v59: delete verification FAILED for "${displayCity}".`);
            return false;
        }

        learnedCitiesCache = verify;
        try { renderLearnedCitiesSettings(); } catch (_) {}
        queueExplicitSyncDeletion('learnedCities', exactKey);
        console.info(`Toolbar trusted cities v59: permanently deleted "${displayCity}" and verified single DB.`);
        return true;
    }

    async function clearLearnedCities() {
        // Keep deletion tombstones, just like Clear Rejected Names does.
        learnedCitiesCache = Object.fromEntries(
            Object.entries(learnedCitiesCache).filter(([, entry]) => entry?.deleted === true)
        );
        await saveLearnedCities();
    }

// --- Store original values when page loads ---
window.__frt7_original = {
    first: document.querySelector("#txtFirstNameDataEntry")?.value || "",
    last:  document.querySelector("#txtLastNameDataEntry")?.value  || "",
    email: document.querySelector("#txtEmail")?.value || "",
    phone: document.querySelector("#txtPhoneDataEntry")?.value ||
           document.querySelector("#txtPhone")?.value || "",
    city:  document.querySelector("#txtCityDataEntry")?.value || "",
    state: document.querySelector("#txtStateDataEntry")?.value || "",
    zip:   document.querySelector("#txtZipDataEntry")?.value || ""
};

    // v151 IMMUTABLE LOADED SURNAME:
    // Unlike __frt7_original, this is NOT a Revert baseline and must not be refreshed
    // after Auto runs. City guards use it as permanent surname evidence for this row.
    window.__frt7_initial_loaded_last_name = String(
        document.querySelector("#txtLastNameDataEntry")?.value ||
        document.querySelector("#txtLastName")?.value || ""
    ).trim();



    // v273 WORD CONTACT TEXT-BOX FALLBACK:
    // The inspected WallStJobs resume proves that a normal-sized txtResumeRaw can omit
    // ONLY the contact header while displayresumetext.asp exposes it as:
    // <img alt="Text Box: NAME ... email ...">
    //
    // Keep this very narrow and cheap: inspect only the actual displayresumetext iframe,
    // only IMG ALT values beginning "Text Box:", and only accept a block containing an
    // email plus either a phone number or City, ST. No OCR and no ordinary image ALT text.
    function getWordContactTextBoxAltV273() {
        try {
            const iframe =
                document.querySelector('iframe[src*="displayresumetext.asp"]') ||
                document.querySelector("#divResumeContainer iframe");
            const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
            if (!doc) return "";

            const phoneRe = /(?:\+?1[\s().\/-]*)?\(?\d{3}\)?[\s.\/-]*\d{3}[\s.\/-]*\d{4}\b/;
            const cityStateRe = /\b[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ.'’\- ]{1,45},\s*[A-Z]{2}\b/;

            for (const img of doc.querySelectorAll('img[alt^="Text Box:"]')) {
                const value = String(img.getAttribute("alt") || "")
                    .replace(/^Text Box:\s*/i, "")
                    .replace(/\u00A0/g, " ")
                    .trim();
                if (!value || value.length > 1200) continue;
                if (!extractEmail(value)) continue;
                if (!phoneRe.test(value) && !cityStateRe.test(value)) continue;
                return value;
            }
        } catch (_) {}
        return "";
    }

    // v87 RARE IFRAME CONTACT FALLBACK:
    // Normally txtResumeRaw remains the one authoritative resume source.
    // Very rarely WallStJobs renders the full resume inside the same-origin iframe
    // while txtResumeRaw contains only a tiny fragment such as "Life, LHVA".
    // In that specific failure mode only, use the rendered iframe text so the
    // existing Name/Email/Phone/City pipelines can operate normally.
    function getIframeResumeTextForRareFallback() {
        try {
            const iframe = document.querySelector("#divResumeContainer iframe");
            const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
            if (!doc) return "";

            const normalText = String(
                doc.querySelector(".Section1")?.innerText ||
                doc.body?.innerText ||
                ""
            ).replace(/\u00A0/g, " ").trim();

            // v271 WORD TEXT-BOX IMAGE FALLBACK ONLY:
            // Some Word-generated resumes render their text boxes as IMG elements and
            // preserve the real text only in alt="Text Box: ...".  Read those ALT
            // values ONLY when this rare iframe fallback has already been requested,
            // and ONLY when the iframe contains substantial Word-style Text Box ALT text.
            // Ordinary resumes never enter this path and ordinary image ALT text is ignored.
            const textBoxAltParts = [...doc.querySelectorAll('img[alt^="Text Box:"]')]
                .map(img => String(img.getAttribute("alt") || "")
                    .replace(/^Text Box:\s*/i, "")
                    .replace(/\u00A0/g, " ")
                    .trim())
                .filter(Boolean);
            const textBoxAltText = textBoxAltParts.join("\n\n").trim();

            // Require multiple Word text boxes and meaningful content before using them.
            // This keeps the feature specific to the unusual resume type shown by the user.
            if (textBoxAltParts.length >= 2 && textBoxAltText.length >= 200) {
                return textBoxAltText;
            }

            return normalText;
        } catch (_) {
            return "";
        }
    }

    function shouldUseRareIframeResumeFallback(rawText, iframeText) {
        const raw = String(rawText || "").replace(/\s+/g, " ").trim();
        const iframe = String(iframeText || "").replace(/\s+/g, " ").trim();

        // Require a genuinely substantial rendered resume. This prevents the iframe
        // from taking over during ordinary partial-loading moments.
        if (iframe.length < 300) return false;

        const rawWords = raw.split(/\s+/).filter(Boolean).length;

        // The exceptional WallStJobs failure produces an empty or obviously tiny
        // txtResumeRaw while the iframe has hundreds/thousands of characters.
        if (!raw) return true;
        if (raw.length <= 160 && rawWords <= 18 && iframe.length >= raw.length * 4) return true;

        return false;
    }

    // v143 PERFORMANCE-ONLY RESUME TEXT CACHE:
    // Ordinary resumes expose a complete txtResumeRaw value. Many independent reliability
    // heartbeats ask for that same text repeatedly, so avoid re-normalizing/splitting the
    // entire resume while the DOM value is literally unchanged. Suspiciously tiny/empty
    // raw resumes are NEVER cached here, preserving the existing live iframe fallback.
    let frt7ResumeTextCacheNode = null;
    let frt7ResumeTextCacheRaw = null;
    let frt7ResumeTextCacheResult = "";

    // v145 PERFORMANCE: while txtResumeRaw is still empty/tiny, several reliability
    // paths can ask for resume text in the same instant. Cache ONLY that rare fallback
    // result for 200ms so we do not repeatedly traverse/read the rendering iframe.
    // This is far shorter than the existing 750ms/1000ms lifecycle cadence and does
    // not change which resume text ultimately wins.
    let frt7RareResumeFallbackCachedAt = 0;
    let frt7RareResumeFallbackRaw = null;
    let frt7RareResumeFallbackResult = "";

    // v314: One-shot repair for a genuinely empty raw resume with a readable iframe.
    // Run from the proven iframe reader, not a separate selector/Auto-city branch.
    let frt7V314LocationDoneFor = "";
    let frt7V314FallbackLogFor = "";
    function frt7V314RepairEmptyRawLocation(iframeText) {
        const applicant = String(location.search.match(/app=(\d+)/i)?.[1] || location.pathname + location.search);
        if (frt7V314LocationDoneFor === applicant) return;
        const city = document.getElementById("txtCityDataEntry");
        const state = document.getElementById("txtStateDataEntry");
        const zip = document.getElementById("txtZipDataEntry");
        if (!city || !state || !zip || city.value.trim() || zip.value.trim()) return;
        // Restrict extraction to the header, never a job-location farther down.
        const header = String(iframeText || "").replace(/\u00a0/g, " ").slice(0, 1100);
        const m = header.match(/\b([A-Za-z][A-Za-z.'’ -]{1,55}?)\s*,\s*([A-Z]{2})\s+(\d{5})(?!\d)/);
        if (!m) return;
        const candidate = m[1].trim().split(/[\n\r|]/).pop().trim();
        if (!candidate || candidate.split(/\s+/).length > 5) return;
        if (state.value.trim() && state.value.trim().toUpperCase() !== m[2]) return;
        if (isManualContactLocked("city", city) || isManualContactLocked("zip", zip) ||
            (!state.value.trim() && isManualContactLocked("state", state))) return;
        city.value = normalizeContactDisplayCase(candidate); triggerEvents(city);
        if (!state.value.trim()) { state.value = m[2]; triggerEvents(state); }
        zip.value = m[3]; triggerEvents(zip);
        frt7V314LocationDoneFor = applicant;
        console.info(`Toolbar LOCATION v314: empty raw iframe contact header filled ${city.value}, ${m[2]} ${m[3]}.`);
    }

    function getResumeText() {
        const ta = document.getElementById("txtResumeRaw");
        const raw = ta && ta.value ? String(ta.value) : "";

        if (ta === frt7ResumeTextCacheNode && raw === frt7ResumeTextCacheRaw) {
            // v273 CACHE FIX: the ordinary raw resume can be cached before the Word
            // contact-header IMG finishes rendering. Re-check ONLY that one tiny ALT
            // fallback before accepting the cache. This is intentionally not a full
            // iframe text scrape and stops changing the result as soon as ALT is found.
            if (!frt7ResumeTextCacheResult.startsWith("__FRT7_TEXTBOX_CONTACT__\n")) {
                const lateContactAlt = getWordContactTextBoxAltV273();
                if (lateContactAlt) {
                    frt7ResumeTextCacheResult =
                        "__FRT7_TEXTBOX_CONTACT__\n" + lateContactAlt + "\n\n" + raw;
                }
            }
            return frt7ResumeTextCacheResult.replace(/^__FRT7_TEXTBOX_CONTACT__\n/, "");
        }

        // Do NOT inspect/use iframe content on ordinary resumes.
        // Only invoke it when raw itself looks suspiciously incomplete.
        const rawCompact = raw.replace(/\s+/g, " ").trim();
        const rawWords = rawCompact.split(/\s+/).filter(Boolean).length;
        if (!rawCompact || (rawCompact.length <= 160 && rawWords <= 18)) {
            // v145: Do not repeatedly scrape the iframe when several lifecycle checks
            // hit this branch back-to-back while the resume is still rendering.
            frt7ResumeTextCacheNode = null;
            frt7ResumeTextCacheRaw = null;
            frt7ResumeTextCacheResult = "";

            const now = Date.now();
            if (
                raw === frt7RareResumeFallbackRaw &&
                now - frt7RareResumeFallbackCachedAt < 200
            ) {
                if (!rawCompact && frt7RareResumeFallbackResult) frt7V314RepairEmptyRawLocation(frt7RareResumeFallbackResult);
                return frt7RareResumeFallbackResult;
            }

            const iframeText = getIframeResumeTextForRareFallback();
            const result = shouldUseRareIframeResumeFallback(raw, iframeText) ? iframeText : raw;

            frt7RareResumeFallbackRaw = raw;
            frt7RareResumeFallbackCachedAt = now;
            frt7RareResumeFallbackResult = result;

            if (result === iframeText && iframeText) {
                const applicantKey = String(location.search.match(/app=(\d+)/i)?.[1] || location.pathname + location.search);
                if (frt7V314FallbackLogFor !== applicantKey) {
                    console.info("Toolbar v314: empty/tiny raw resume; using iframe text (logging once per applicant).");
                    frt7V314FallbackLogFor = applicantKey;
                }
                if (!rawCompact) frt7V314RepairEmptyRawLocation(iframeText);
            }
            return result;
        }

        // v273: on an otherwise-normal resume, prepend the inspected Word contact
        // Text Box ALT if it is already available. If it renders a moment later, the
        // cache branch above picks it up on the next existing reliability check.
        const contactAlt = getWordContactTextBoxAltV273();
        frt7ResumeTextCacheNode = ta;
        frt7ResumeTextCacheRaw = raw;
        frt7ResumeTextCacheResult = contactAlt
            ? "__FRT7_TEXTBOX_CONTACT__\n" + contactAlt + "\n\n" + raw
            : raw;
        return frt7ResumeTextCacheResult.replace(/^__FRT7_TEXTBOX_CONTACT__\n/, "");
    }

    function normalizeToken(raw) {
        if (!raw) return "";
        return raw.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, "");
    }

    function isAllCaps(word) {
        return /^[A-Z]{2,}$/.test(word);
    }

    function isProperCase(word) {
        return /^[A-Z][a-z]+$/.test(word);
    }

    function isNameWord(raw, normUpper) {
        if (!raw || !normUpper) return false;
        if (/\d/.test(raw)) return false;
        if (raw.indexOf("@") !== -1) return false;
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ.'’\-‐-–—]*$/.test(raw)) return false;
        if (NAME_STOPWORDS.has(normUpper)) return false;
        if (LOCATION_WORDS.has(normUpper)) return false;
        return true;
    }

    function isMiddleInitial(raw) {
        return /^[A-Za-z]\.?$/.test(raw.trim());
    }

    const NAME_STOPWORDS = new Set([
        "INDEED","RESUME","CURRICULUM","VITAE","CV","SUMMARY","OBJECTIVE",
        "EDUCATION","EXPERIENCE","SKILLS","CONTACT","PROFILE","PROFESSIONAL",
        "ADDRESS","MOBILE","PHONE","EMAIL","TEL","FAX"
    ]);

    const LOCATION_WORDS = new Set([
        "US","USA","UNITED","STATES","CITY","COUNTY","ROAD","RD","ST","STREET",
        "AVE","AVENUE","BLVD","DR","DRIVE","LANE","LN","CT","COURT","APT","APARTMENT",
        "SUITE","FLOOR",
        "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS",
        "KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY",
        "NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV",
        "WI","WY"
    ]);
const NAME_TITLES = new Set([
    "SIR",
    "DR",
    "DO",
    "MD",
    "PHD",
    "DDS",
    "DMD",
    "RN",
    "NP",
    "PA",
    "PROF",
    "PROFESSOR"
]);

const NAME_SUFFIXES = new Set([
    "JR", "JR.", "SR", "SR.",
    "II", "III", "IV", "V"
]);

// v31: professional/academic credentials that may be printed directly after
// a person's name. These are never part of First Name or Last Name.
const NAME_CREDENTIALS = new Set([
    "CPC", "CPC-A", "CPCA", "CAM",
    "MBA", "AAI", "ASCR", "MSA", "LCSW", "LSW", "SIFI", "PMHNB", "BSN", "MSN", "BCAS", "NRST", "PRC", "EA", "LMSW", "MPA", "MHA", "MPH", "MS", "MA", "BS", "BBA", "BA",
    "PHD", "PHD.", "ED.D", "EDD",
    "MD", "MD.", "DO", "DO.",
    "RN", "RN.", "LPN", "LVN", "NP", "PA", "PA-C",
    "DDS", "DMD", "JD", "ESQ", "ESQUIRE",
    "CPA", "CFA", "CFP", "PMP",
    "SHRM-CP", "SHRM-SCP"
]);

// Shared, editable credential overrides. Tombstones preserve deletions across PCs.
const FRT7_NAME_CREDENTIALS_KEY = "frt7_name_credentials_v405";
function frt7CredentialOverrides() {
    try { const raw=GM_getValue(FRT7_NAME_CREDENTIALS_KEY,'{}'); const v=typeof raw==='string'?JSON.parse(raw):raw; return v && typeof v==='object' && !Array.isArray(v)?v:{}; }
    catch (_) { return {}; }
}
function frt7CredentialIsActive(value) {
    const key=normalizeNameCredentialToken(value);
    const db=frt7CredentialOverrides();
    if (Object.prototype.hasOwnProperty.call(db,key)) return db[key]?.deleted !== true;
    return NAME_CREDENTIALS.has(key) || NAME_CREDENTIALS.has(key.replace(/\./g,''));
}
function frt7SetCredential(value,active) {
    const key=normalizeNameCredentialToken(value);
    if (!/^[A-Z0-9][A-Z0-9.\-]{0,29}$/.test(key)) return false;
    const db=frt7CredentialOverrides();
    db[key]={name:key,deleted:!active,updatedAt:Date.now()};
    GM_setValue(FRT7_NAME_CREDENTIALS_KEY,JSON.stringify(db));
    window.dispatchEvent(new Event('frt7:credentials-changed'));
    return true;
}
function normalizeNameCredentialToken(value) {
    return String(value || "")
        .trim()
        .toUpperCase()
        .replace(/^[,;:()\[\]]+|[,;:()\[\]]+$/g, "")
        .replace(/\s+/g, "");
}

function isNameCredentialToken(value) {
    const token = normalizeNameCredentialToken(value);
    if (!token) return false;

    // Honorifics/suffixes are also non-name tokens when they appear in a
    // flattened name string.
    const noPeriods = token.replace(/\./g, "");
    if (NAME_TITLES.has(noPeriods)) return true;
    if (NAME_SUFFIXES.has(token) || NAME_SUFFIXES.has(noPeriods)) return true;
    if (frt7CredentialIsActive(token) || frt7CredentialIsActive(noPeriods)) return true;

    return false;
}

// v304 HYPHEN-ATTACHED GENERATIONAL SUFFIX CLEANUP:
// WallStJobs/source data can put a suffix directly onto the surname with a hyphen,
// e.g. "Hicks-Jr", "Smith-Sr.", "Jones-III". The suffix is never part of
// Last Name, so remove it before the ordinary whitespace-token credential cleanup.
// This intentionally matches ONLY recognized generational suffixes at the END.
function stripHyphenAttachedGenerationalSuffix(value) {
    return String(value || "")
        .trim()
        .replace(/[-‐‑‒–—]\s*(?:JR\.?|SR\.?|II|III|IV|V)$/i, "")
        .trim();
}

function stripNameTitlesAndCredentials(value, { stripLeading = true, stripTrailing = true } = {}) {
    let cleanValue = String(value || "").trim();

    // v304: Do this only on a trailing-cleanup path. This makes Hicks-Jr -> Hicks
    // while preserving normal hyphenated surnames such as Smith-Jones.
    if (stripTrailing) {
        cleanValue = stripHyphenAttachedGenerationalSuffix(cleanValue);
    }

    const parts = cleanValue.split(/\s+/).filter(Boolean);
    if (!parts.length) return "";

    if (stripLeading) {
        while (parts.length > 1 && isNameCredentialToken(parts[0])) {
            parts.shift();
        }
    }

    if (stripTrailing) {
        while (parts.length > 1 && isNameCredentialToken(parts[parts.length - 1])) {
            parts.pop();
        }
    }

    return parts.join(" ").replace(/\s+/g, " ").trim();
}

const NON_NAME_TRAIL_WORDS = new Set([
    "ACCOUNT","ACCOUNTS","SALES","MARKETING","OPERATIONS","SUPPORT",
    "ADMIN","ADMINISTRATIVE","MANAGEMENT","MANAGER",
    "ENGINEER","ENGINEERING","ANALYST","SPECIALIST",
    "ASSOCIATE","COORDINATOR","DIRECTOR",
    "LICENSED","LICENSE","INSURANCE","PRODUCER","AGENT","BROKER",
    "REPRESENTATIVE","CONSULTANT","SUPERVISOR","TECHNICIAN",
    "WORKING","HARD","STRONG","EXPERIENCED","PROFESSIONAL"
]);


    function toProperCase(word) {
        word = word.toLowerCase();
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

function parseNameLine(text) {
    if (!text) return { first: "", last: "" };

    // Normalize Unicode so accents survive
    text = normalizeUnicode(text);

// Normalize hyphenated name casing: Lee-anne → Lee-Anne
text = text.replace(
  /\b([A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]+)-([a-zà-öø-ÿ]+)/g,
  (_, a, b) => a + "-" + b.charAt(0).toUpperCase() + b.slice(1)
);


const words = text
    .replace(/[\|\•\–\—]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(w =>
        /^[A-Za-zÀ-ÖØ-öø-ÿ'’\-‐-–—]+$/.test(w) &&
        !NAME_STOPWORDS.has(w.toUpperCase()) &&
        (
            !LOCATION_WORDS.has(w.toUpperCase()) ||
            NAME_PREFIXES.has(w.toUpperCase())
        )
    );

// 🚫 Strip leading honorifics / credentials (Sir, Dr, MD, etc.)
while (
    words.length > 1 &&
    NAME_TITLES.has(words[0].replace(/\./g, "").toUpperCase())
) {
    words.shift();
}

 if (words.length < 2) {
    return { first: "", last: "" };
}

// ❌ Reject adjective-style fake names
// ✅ Trim trailing non-name junk instead of rejecting the name
while (
    words.length > 1 &&
    NON_NAME_TRAIL_WORDS.has(words[words.length - 1].toUpperCase())
) {
    words.pop();
}

// 🚫 Strip suffixes/credentials like Jr, Sr, III, CPC-A, MBA, MD, etc.
while (
    words.length > 1 &&
    isNameCredentialToken(words[words.length - 1])
) {
    words.pop();
}


let first = words[0];

// Remove middle initials for last-name detection only
const core = words.filter(w => !/^[A-Za-z]\.?$/.test(w));

let lastParts = [];
let i = core.length - 1;

// Always include final word
lastParts.unshift(core[i]);
i--;

// Walk backward capturing surname prefixes
while (i >= 1) {
    const single = core[i].toUpperCase();
    const multi  = core.slice(i, lastParts.length + i + 1).join(" ").toUpperCase();

    if (NAME_PREFIXES.has(single) || NAME_PREFIXES.has(multi)) {
        lastParts.unshift(core[i]);
        i--;
    } else {
        break;
    }
}

return {
    first: toProper(first),
    last: lastParts.map(toProper).join(" ")
};
}
function looksLikeRealNameLine(text) {
    const words = text.split(/\s+/);
    if (words.length < 2 || words.length > 4) return false;

    // Reject adjective phrases
    if (words.every(w => NON_NAME_TRAIL_WORDS.has(w.toUpperCase()))) {
        return false;
    }

    // First word must start uppercase and contain letters/hyphens/apostrophes
    return /^[A-ZÀ-ÖØ-Ý][A-Za-zÀ-ÖØ-öø-ÿ'’\-‐-–—]+$/.test(words[0]);
}

// v55 HIGH-CONFIDENCE MULTI-NAME BOUNDARY DETECTOR
//
// Do NOT guess that every 3-4 word run is First/Middle/Last. Instead, only use
// the final name token when we can prove where the name ends from contact data:
//   1) a trusted learned City + its saved State,
//   2) a phone number, or
//   3) an email address.
//
// Example:
//   David Abarca Quesada  Charlotte, NC 28226  (704) 670-8160  ...
// becomes David / Quesada because Charlotte, NC gives us a hard boundary.
//
// This intentionally runs BEFORE the compact-email shortcut in extractNameFromTop,
// so dabarca71@gmail.com cannot prematurely force David / Abarca when a longer
// bounded name is clearly visible in the header.
function findBoundedMultiTokenHeaderName(text) {
    if (!text) return null;

    const head = normalizeUnicode(String(text).slice(0, 340))
        .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015]/g, "-");

    const boundaryCandidates = [];
    const addBoundary = (index, kind) => {
        if (Number.isInteger(index) && index > 0) boundaryCandidates.push({ index, kind });
    };
    const escapeRegex = value => String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // v234 STREET-ADDRESS NAME BOUNDARY:
    // A clear numbered mailing address immediately after the header name is a hard
    // end-of-name boundary. Example:
    //   Ebony N. Upshaw 2914 Nicholson Dr. Dallas, TX 75224
    // must resolve to Ebony / Upshaw; "Nicholson" is the street name, never surname.
    // Require BOTH a leading street number and a recognized street suffix so an
    // unrelated number elsewhere in the header cannot truncate a legitimate name.
    const streetAddress = new RegExp(
        String.raw`\b\d{1,6}[A-Za-z]?\s+(?:[NSEW]\.?\s+|North\s+|South\s+|East\s+|West\s+)?(?:[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ'’.-]*\s+){0,5}(?:St(?:reet)?|Ave(?:nue)?|Rd|Road|Dr(?:ive)?|Blvd|Boulevard|Ln|Lane|Ct|Court|Cir|Circle|Way|Pkwy|Parkway|Pl|Place|Ter|Terrace|Trl|Trail|Hwy|Highway)\.?\b`,
        "i"
    ).exec(head);
    if (streetAddress) addBoundary(streetAddress.index, "street-address");

    // v56: Explicit City, ST ZIP is itself a strong contact boundary. This does
    // NOT require the city to have finished loading from the learned-city cache.
    // Example: David Abarca Quesada | Charlotte, NC 28226 | phone | email.
    // Requiring both a valid state and 5-digit ZIP makes this far safer than a
    // generic "capitalized words before a state" guess.
    const stateAbbrevs = Object.values(STATE_MAP).join("|");
    const cityStateZip = new RegExp(
        `(^|[\\n\\r|•·;])\\s*([A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ'’.-]*(?:\\s+[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ'’.-]*){0,3})\\s*,?\\s*(${stateAbbrevs})\\s+(\\d{5})(?:-\\d{4})?\\b`,
        "i"
    ).exec(head);
    if (cityStateZip) {
        addBoundary(cityStateZip.index + String(cityStateZip[1] || "").length, "city-state-zip");
    }

    // Phone boundary.
    const phone = /(?:\+?1[\s.\-]*)?(?:\(\s*\d{3}\s*\)|\b\d{3}\b)[\s.\-]*\d{3}[\s.\-]*\d{4}\b/.exec(head);
    if (phone) addBoundary(phone.index, "phone");

    // Email boundary.
    const email = /\b[A-Z0-9._%+\-]+\s*@\s*[A-Z0-9.\-]+/i.exec(head);
    if (email) addBoundary(email.index, "email");

    // v56: Do not depend on asynchronous learnedCitiesReady timing. If the cache
    // has not loaded yet, read the SAME GM value synchronously for this name pass.
    let learnedForBoundary = learnedCitiesCache || {};
    if (!learnedCitiesLoaded || !Object.keys(learnedForBoundary).length) {
        try {
            const rawStored = GM_getValue(LEARNED_CITIES_SINGLE_DB_KEY);
            if (rawStored && typeof rawStored === "object") {
                learnedForBoundary = rawStored;
            } else if (typeof rawStored === "string") {
                const parsed = JSON.parse(rawStored || "{}");
                if (parsed && typeof parsed === "object") learnedForBoundary = parsed;
            }
        } catch (_) {}
    }

    // Trusted learned City + saved State boundary.
    for (const entry of Object.values(learnedForBoundary || {})) {
        if (entry?.deleted === true) continue;
        const city = normalizeContactDisplayCase(String(entry?.city || "").trim());
        const state = String(entry?.state || "").trim().toUpperCase();
        if (!city || !/^[A-Z]{2}$/.test(state)) continue;

        const cityPattern = escapeRegex(city.replace(/^St\.?(?=\s)/i, "St")).replace(/^St(?=\\s\+)/i, "St\\.?").replace(/\s+/g, "\\s+");
        const re = new RegExp(
            `(^|[^A-Za-zÀ-ÖØ-öø-ÿ])(${cityPattern})\\s*,?\\s*${escapeRegex(state)}\\b`,
            "i"
        );
        const match = re.exec(head);
        if (match) {
            addBoundary(match.index + String(match[1] || "").length, "learned-city-state");
        }
    }

    if (!boundaryCandidates.length) return null;
    boundaryCandidates.sort((a, b) => a.index - b.index);
    const boundary = boundaryCandidates[0];

    let before = head.slice(0, boundary.index)
        .replace(/^[\s|•·,;:\-]+|[\s|•·,;:\-]+$/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    if (!before) return null;

    // v420: A street number between the name and a learned City/State is
    // an address boundary, NOT part of a multi-token surname.  Example:
    // "Paitra A. McMillion 18070 Ilene, Detroit, MI" must never yield Ilene.
    // Reject this bounded candidate and let the ordinary header parser run.
    if (/\b\d{1,6}\s+[A-Za-zÀ-ÖØ-öø-ÿ]/u.test(before)) {
        console.info("Toolbar NAME v420: rejected bounded name crossing a numbered street address.");
        return null;
    }

    let tokens = before.split(/\s+/).filter(Boolean);

    while (tokens.length > 1 && isNameCredentialToken(tokens[0])) tokens.shift();
    while (tokens.length > 1 && isNameCredentialToken(tokens[tokens.length - 1])) tokens.pop();

    if (tokens.length < 3 || tokens.length > 5) return null;

    const cleanNameToken = raw => String(raw || "")
        .replace(/^[^A-Za-zÀ-ÖØ-öø-ÿ'’\-]+|[^A-Za-zÀ-ÖØ-öø-ÿ'’\-]+$/g, "");

    tokens = tokens.map(cleanNameToken).filter(Boolean);
    if (tokens.length < 3 || tokens.length > 5) return null;

    for (const token of tokens) {
        const upper = token.toUpperCase();
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ'’\-]*$/.test(token)) return null;
        if (NAME_STOPWORDS.has(upper)) return null;
        // v111: A token such as "De" can be both a state abbreviation and a
        // legitimate surname prefix. Inside a bounded/explicit name phrase,
        // allow recognized NAME_PREFIXES; ordinary location tokens stay blocked.
        if (LOCATION_WORDS.has(upper) && !NAME_PREFIXES.has(upper)) return null;
        if (NON_NAME_TRAIL_WORDS.has(upper) || isNameCredentialToken(token)) return null;
    }

    const first = normalizeContactDisplayCase(tokens[0]);

    const lastParts = [tokens[tokens.length - 1]];
    let i = tokens.length - 2;
    while (i >= 1) {
        const single = tokens[i].toUpperCase();
        const phrase = `${single} ${lastParts.map(v => v.toUpperCase()).join(" ")}`;
        if (NAME_PREFIXES.has(single) || NAME_PREFIXES.has(phrase)) {
            lastParts.unshift(tokens[i]);
            i--;
        } else {
            break;
        }
    }

    const last = normalizeContactDisplayCase(lastParts.join(" "));
    if (!first || !last) return null;
    if (isRejectedLastNameCandidate(last)) return null;

    // v300 NAME PREFIX GUARD:
    // A phone/email boundary can occasionally leave a stray nickname fragment
    // immediately before the boundary, e.g. "Lynetta Lyn (859)..." -> Lynetta / Lyn.
    // Never treat a proposed surname as a shortened prefix of the proposed first name.
    // This is deliberately narrow and does not change ordinary multi-part surnames.
    const firstKeyV300 = normalizeRejectedName(first).replace(/[^A-Z]/g, "");
    const lastKeyV300 = normalizeRejectedName(last).replace(/[^A-Z]/g, "");
    if (
        lastKeyV300.length >= 3 &&
        firstKeyV300.length > lastKeyV300.length &&
        firstKeyV300.startsWith(lastKeyV300)
    ) {
        console.info(
            `Toolbar NAME v300: rejected bounded surname "${last}" because it is a prefix of first name "${first}".`
        );
        return null;
    }

    return {
        first,
        last,
        boundedMultiName: true,
        boundaryKind: boundary.kind
    };
}

function isRejectedLastNameCandidate(lastName) {
    const normalized = normalizeRejectedName(lastName);
    if (!normalized) return false;

    // v151 HEADER ROLE-WORD GUARD:
    // In headers such as "J. Gentile Everett Author of The Making of a Life",
    // "Author" is a role/descriptor beginning the next phrase, not the surname.
    // Do not let a delayed Auto Name pass turn Last Name into "Author".
    if (normalized === "AUTHOR") return true;

    for (const entry of Object.values(rejectedAutoNamesCache || {})) {
        if (!entry?.name || entry.deleted === true) continue;
        const entryNormalized = normalizeRejectedName(entry.name);
        if (!entryNormalized) continue;

        // A one-word rejected token is a hard Last Name block. Revert-learning
        // stores rejected name words individually, so this honors the user's list
        // without turning every rejected full-name phrase into a global surname ban.
        if (!entryNormalized.includes(" ") && entryNormalized === normalized) {
            return true;
        }
    }
    return false;
}

function extractNameFromTop(text) {
    if (!text) return null;

    const boundedMultiName = findBoundedMultiTokenHeaderName(text);
    if (boundedMultiName?.first && boundedMultiName?.last) {
        console.info(
            `Toolbar NAME v56: bounded multi-name -> ${boundedMultiName.first} / ${boundedMultiName.last} ` +
            `(${boundedMultiName.boundaryKind}).`
        );
        return boundedMultiName;
    }

    const head = text.slice(0, 300);

    // Normalize unicode (hyphens, accents, etc)
    const clean = normalizeUnicode(head)
        .replace(/[\|\•\–\—]/g, " ")
        .replace(/\s+/g, " ");

    const tokens = clean.split(" ");

    function isNameToken(w) {
        if (!w) return false;
        if (/@|\d/.test(w)) return false;
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'’\-]+$/.test(w)) return false;
        if (NAME_STOPWORDS.has(w.toUpperCase())) return false;
        if (LOCATION_WORDS.has(w.toUpperCase())) return false;
        return true;
    }

    // ⭐ FIND FIRST TWO CONSECUTIVE NAME TOKENS
    for (let i = 0; i < tokens.length - 1; i++) {
        const a = tokens[i];
        const b = tokens[i + 1];

if (
    isNameToken(a) &&
    (isNameToken(b) || NAME_PREFIXES.has(String(b || "").toUpperCase()))
) {

    // v31: If the very next token is a recognized title/credential, the first
    // two tokens are the name. Example: "Casandra Brown CPC-A Hermitage..."
    // must become Casandra / Brown, never Brown Cpc.
    const immediateThird = tokens[i + 2] || "";
    if (immediateThird && isNameCredentialToken(immediateThird)) {
        return {
            first: toProper(a),
            last: toProper(b)
        };
    }

    // Strong contact-header confirmation: when the first two header words also
    // appear together as the email local-part, they are overwhelmingly likely
    // to be the applicant's actual first/last name. This is especially important
    // on flattened Indeed resumes such as:
    //   Grace Corkins Licensed Insurance Producer ... E grace corkins@gmail com
    // Without this guard, the generic 3-word-name heuristic can mistake the
    // following job-title word ("Licensed") for the surname.
    const escapeNamePiece = value =>
        String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const firstLastEmailPattern = new RegExp(
        `\\b${escapeNamePiece(a)}(?:[._+\\-]|\\s)+${escapeNamePiece(b)}\\s*@`,
        "i"
    );
    if (firstLastEmailPattern.test(head)) {
        return {
            first: toProper(a),
            last: toProper(b)
        };
    }

    // Also recognize compact email usernames that strongly confirm the first
    // two header words, such as Andrea Ray -> aray778@gmail.com. This keeps a
    // following job-title word ("Licensed") from being mistaken for the surname.
    const emailMatch = head.match(/\bE?\s*([A-Z0-9._%+\-]+)\s*@/i);
    if (emailMatch) {
        const local = String(emailMatch[1] || "")
            .toLowerCase()
            .replace(/[^a-z]/g, "");
        const aLetters = String(a || "").toLowerCase().replace(/[^a-z]/g, "");
        const bLetters = String(b || "").toLowerCase().replace(/[^a-z]/g, "");
        const compactFull = aLetters + bLetters;
        const compactInitialLast = (aLetters.charAt(0) || "") + bLetters;

        if (
            (compactFull && local.startsWith(compactFull)) ||
            (compactInitialLast.length >= 3 && local.startsWith(compactInitialLast))
        ) {
            return {
                first: toProper(a),
                last: toProper(b)
            };
        }
    }

    const bUpper = b.toUpperCase();
    const nextToken = tokens[i + 2] || "";
    const nextUpper = nextToken.toUpperCase();
    const pair = `${bUpper} ${nextUpper}`.trim();

    // v111: A recognized complete compound surname must stop HERE, before a
    // following city/header token can leak into Last Name.
    //
    // Example:
    //   Robert De Leon Green Valley, AZ
    // becomes Robert / De Leon (not Leon / Green, De Leon Green, etc.).
    if (nextToken && COMPLETE_COMPOUND_SURNAMES.has(pair)) {
        return {
            first: toProper(a),
            last: [b, nextToken].map(toProper).join(" "),
            compoundSurnameBoundary: true
        };
    }

    // Compound surname directly after the first name:
    //   David Da Silva
    //   Maria De La Cruz
    //   Carlos De Los Santos
    //   Anna Van Der Meer
    //
    // Consume only recognized surname-prefix words, then exactly one final
    // surname word. This prevents the next header word/location from leaking
    // into the last name (for example, "David Da Silva San Diego" becoming
    // last name "San").
    if (NAME_PREFIXES.has(bUpper) || NAME_PREFIXES.has(pair)) {
        const lastParts = [b];
        let j = i + 2;
        let prefixPhrase = bUpper;

        while (j < tokens.length && isNameToken(tokens[j])) {
            const token = tokens[j];
            const extendedPrefix = `${prefixPhrase} ${token.toUpperCase()}`;

            if (NAME_PREFIXES.has(extendedPrefix)) {
                lastParts.push(token);
                prefixPhrase = extendedPrefix;
                j++;
                continue;
            }

            // First non-prefix name token is the actual terminal surname.
            lastParts.push(token);

            return {
                first: toProper(a),
                last: lastParts.map(toProper).join(" ")
            };
        }
    }

    // For an ordinary three-part name, treat the middle token as a middle
    // name and use the final token as the surname:
    //   Allison Ayce Smith -> First: Allison, Last: Smith
    //
    // Only do this when the third token is still part of the compact name run.
    // Stop before obvious contact/location content.
    const third = tokens[i + 2] || "";
    if (
        third &&
        isNameToken(third) &&
        !NAME_PREFIXES.has(third.toUpperCase()) &&
        !NON_NAME_TRAIL_WORDS.has(third.toUpperCase()) &&
        !isNameCredentialToken(third)
    ) {
        return {
            first: toProper(a),
            last: toProper(third)
        };
    }

    return {
        first: toProper(a),
        last: toProper(b)
    };
}

    }

    return null;
}

// v57 EXPLICIT NAME HEADING PARSER
// A short element explicitly marked as the resume's Name is a stronger signal
// than a flattened raw-header guess. For 3-5 clean name tokens, use the first
// token as First Name and the terminal surname as Last Name. Preserve known
// surname prefixes and never allow an active rejected token as Last Name.
function parseExplicitNameHeading(value) {
    let clean = normalizeUnicode(String(value || ""))
        .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015]/g, "-")
        .replace(/\s+/g, " ")
        .trim();

    if (!clean || /@|\d/.test(clean)) return null;

    let tokens = clean.split(/\s+/).filter(Boolean);

    while (tokens.length > 1 && isNameCredentialToken(tokens[0])) tokens.shift();
    while (tokens.length > 1 && isNameCredentialToken(tokens[tokens.length - 1])) tokens.pop();

    if (tokens.length < 2 || tokens.length > 5) return null;

    for (const token of tokens) {
        const upper = token.toUpperCase();
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ'’\-]*$/.test(token)) return null;
        if (NAME_STOPWORDS.has(upper)) return null;
        // v111: A token such as "De" can be both a state abbreviation and a
        // legitimate surname prefix. Inside a bounded/explicit name phrase,
        // allow recognized NAME_PREFIXES; ordinary location tokens stay blocked.
        if (LOCATION_WORDS.has(upper) && !NAME_PREFIXES.has(upper)) return null;
        if (NON_NAME_TRAIL_WORDS.has(upper) || isNameCredentialToken(token)) return null;
    }

    const first = normalizeContactDisplayCase(tokens[0]);

    // Normal two-token name.
    if (tokens.length === 2) {
        const last = normalizeContactDisplayCase(tokens[1]);
        if (!last || isRejectedLastNameCandidate(last)) return null;
        return { first, last, explicitNameHeading: true };
    }

    // 3-5 token explicit name heading: terminal surname wins.
    const lastParts = [tokens[tokens.length - 1]];
    let i = tokens.length - 2;
    while (i >= 1) {
        const single = tokens[i].toUpperCase();
        const phrase = `${single} ${lastParts.map(v => v.toUpperCase()).join(" ")}`;
        if (NAME_PREFIXES.has(single) || NAME_PREFIXES.has(phrase)) {
            lastParts.unshift(tokens[i]);
            i--;
        } else {
            break;
        }
    }

    const last = normalizeContactDisplayCase(lastParts.join(" "));
    if (!first || !last || isRejectedLastNameCandidate(last)) return null;

    return {
        first,
        last,
        explicitNameHeading: true,
        multiTokenExplicitName: true
    };
}

function getExplicitResumeNameHeading() {
    try {
        const iframe = document.querySelector("#divResumeContainer iframe");
        const doc = iframe?.contentDocument || iframe?.contentWindow?.document;

        // v58: FIRST RENDERED RESUME LINE.
        // Some resume templates visually show a clean name heading but do not assign
        // it class="Name". That is exactly what happened with "David Abarca Quesada".
        // Read the first few actual rendered lines and accept only a short, entirely
        // name-shaped line. This happens BEFORE any flattened raw/email shortcut.
        const renderedTexts = [];
        if (doc) {
            const sectionText = doc.querySelector(".Section1")?.innerText || "";
            const bodyText = doc.body?.innerText || "";
            if (sectionText.trim()) renderedTexts.push(sectionText);
            if (bodyText.trim() && bodyText !== sectionText) renderedTexts.push(bodyText);
        }

        // Some layouts render directly inside the main document rather than leaving
        // useful text inside the iframe. Use the visible resume container as backup.
        const containerText = document.querySelector("#divResumeContainer")?.innerText || "";
        if (containerText.trim()) renderedTexts.push(containerText);

        for (const renderedText of renderedTexts) {
            const lines = String(renderedText)
                .split(/\r?\n/)
                .map(line => line.replace(/\s+/g, " ").trim())
                .filter(Boolean)
                .slice(0, 10);

            for (const line of lines) {
                // A rendered name heading should be compact. Do not feed sentences,
                // contact rows, or entire paragraphs into the name parser.
                if (line.length > 80 || /@|\d/.test(line)) continue;
                const tokenCount = line.split(/\s+/).filter(Boolean).length;
                if (tokenCount < 2 || tokenCount > 5) continue;

                const parsed = parseExplicitNameHeading(line);
                if (parsed) {
                    return {
                        ...parsed,
                        renderedFirstLine: true,
                        renderedLine: line
                    };
                }
            }
        }

        if (!doc) return null;

        // Keep the class-based strong sources too.
        const strongNodes = Array.from(
            doc.querySelectorAll(".Section1 p.Name, p.Name")
        );

        for (const el of strongNodes) {
            const parsed = parseExplicitNameHeading(el.textContent || "");
            if (parsed) return parsed;
        }

        const genericNodes = Array.from(doc.querySelectorAll(".Name"));
        for (const el of genericNodes) {
            const value = String(el.textContent || "").replace(/\s+/g, " ").trim();
            if (!value || value.length > 80) continue;
            const parsed = parseExplicitNameHeading(value);
            if (parsed) return parsed;
        }
    } catch (error) {
        console.warn("Toolbar NAME v58: rendered name heading read failed.", error);
    }

    return null;
}


// v90 HIGH-CONFIDENCE GENERATIONAL-SUFFIX HEADER REPAIR
// Handles headers such as:
//   IVY MATHEWS JR.
//   John A. Smith Sr.
//   Maria De La Cruz III
//
// A generational suffix is a hard boundary: it is never the surname.
// When one appears in the first part of the resume, take the actual surname
// immediately before it (preserving recognized surname prefixes).
function findNameBeforeGenerationalSuffix(text) {
    if (!text) return null;

    const head = normalizeUnicode(String(text).slice(0, 260))
        .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015]/g, "-")
        .replace(/[\|\•\–\—]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    if (!head) return null;

    // Capture 2-5 name-like words immediately followed by a recognized suffix.
    // Stop at the suffix; anything after it (city, phone, title, etc.) is irrelevant.
    const suffixMatch = head.match(
        /(?:^|\s)((?:[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ'’\-]*\.?\s+){1,4})(JR\.?|SR\.?|II|III|IV|V)(?=\s|[,;|]|$)/i
    );
    if (!suffixMatch) return null;

    let tokens = String(suffixMatch[1] || "")
        .trim()
        .split(/\s+/)
        .map(t => t.replace(/^[^A-Za-zÀ-ÖØ-öø-ÿ'’\-]+|[^A-Za-zÀ-ÖØ-öø-ÿ'’\-.]+$/g, ""))
        .filter(Boolean);

    // Remove leading honorifics/credentials and middle initials.
    while (tokens.length > 1 && isNameCredentialToken(tokens[0])) tokens.shift();
    if (tokens.length < 2) return null;

    const first = normalizeContactDisplayCase(tokens[0].replace(/\.$/, ""));
    const surnameTokens = tokens.slice(1).filter(t => !/^[A-Za-z]\.?$/.test(t));
    if (!surnameTokens.length) return null;

    // Use the terminal surname, preserving any recognized prefix immediately before it.
    const lastParts = [surnameTokens[surnameTokens.length - 1]];
    let i = surnameTokens.length - 2;
    while (i >= 0) {
        const single = surnameTokens[i].toUpperCase().replace(/\.$/, "");
        const phrase = `${single} ${lastParts.map(v => v.toUpperCase().replace(/\.$/, "")).join(" ")}`;
        if (NAME_PREFIXES.has(single) || NAME_PREFIXES.has(phrase)) {
            lastParts.unshift(surnameTokens[i]);
            i--;
        } else {
            break;
        }
    }

    const last = normalizeContactDisplayCase(lastParts.join(" ").replace(/\./g, ""));
    if (!first || !last) return null;

    console.info(`Toolbar NAME v92: suffix-boundary header -> ${first} / ${last}.`);
    return { first, last, suffixBoundaryName: true };
}

// v92 RENDERED-SOURCE SUFFIX REPAIR:
// The visible resume can contain the clean name header even when txtResumeRaw is
// flattened, reordered, or begins with unrelated source metadata. For a true
// generational suffix, scan every trustworthy header representation and stop at
// the first high-confidence First / real-surname / Suffix match.
function findSuffixBoundaryNameFromResumeSources(rawText = "") {
    const sources = [];
    const addSource = value => {
        const clean = String(value || "").trim();
        if (clean && !sources.includes(clean)) sources.push(clean);
    };

    addSource(rawText);

    try {
        const iframe = document.querySelector("#divResumeContainer iframe");
        const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
        if (doc) {
            addSource(doc.querySelector(".Section1")?.innerText || "");
            addSource(doc.body?.innerText || "");

            for (const el of doc.querySelectorAll(".Section1 p.Name, p.Name, .Name")) {
                addSource(el.textContent || "");
            }
        }
    } catch (error) {
        console.warn("Toolbar NAME v92: rendered suffix source read failed.", error);
    }

    addSource(document.querySelector("#divResumeContainer")?.innerText || "");

    for (const source of sources) {
        const found = findNameBeforeGenerationalSuffix(source);
        if (found?.first && found?.last) return found;
    }

    return null;
}

// v93 CURRENT-FIELD SUFFIX RESCUE:
// If WallStJobs itself has already put Jr./Sr./II/III/IV/V into Last Name,
// use the current First Name as an anchor and scan a larger rendered/raw header
// window for "First [middle] RealSurname Suffix". This avoids depending on the
// generic flattened-name parser and is shared by Auto + the manual Name button.
function findSurnameBeforeSuffixForCurrentFirst(currentFirst, rawText = "") {
    const firstDisplay = normalizeContactDisplayCase(String(currentFirst || "").trim());
    if (!firstDisplay) return null;

    const sources = [];
    const addSource = value => {
        const clean = String(value || "").trim();
        if (clean && !sources.includes(clean)) sources.push(clean);
    };

    addSource(rawText);
    try {
        const iframe = document.querySelector("#divResumeContainer iframe");
        const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
        if (doc) {
            addSource(doc.querySelector(".Section1")?.innerText || "");
            addSource(doc.body?.innerText || "");
            for (const el of doc.querySelectorAll(".Section1 p.Name, p.Name, .Name")) {
                addSource(el.textContent || "");
            }
        }
    } catch (error) {
        console.warn("Toolbar NAME v93: current-first suffix source read failed.", error);
    }
    addSource(document.querySelector("#divResumeContainer")?.innerText || "");

    const firstPattern = escapeRegexLiteral(firstDisplay).replace(/\\\s+/g, "\\\\s+");
    const word = "[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ'’\\-]*";
    const re = new RegExp(
        `(?:^|[^A-Za-zÀ-ÖØ-öø-ÿ'’\\-])${firstPattern}\\s+((?:${word}\\.?\\s+){1,4})(JR\\.?|SR\\.?|II|III|IV|V)(?=\\s|[,;|]|$)`,
        "i"
    );

    for (const source of sources) {
        // The name should be near the top, but 3000 chars gives rendered templates
        // plenty of room for hidden labels/metadata before the visible heading.
        const head = normalizeUnicode(String(source).slice(0, 3000))
            .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015]/g, "-")
            .replace(/[\|\•\–\—]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
        const m = re.exec(head);
        if (!m) continue;

        const between = String(m[1] || "").trim().split(/\s+/).filter(Boolean);
        const surnameTokens = between.filter(t => !/^[A-Za-z]\\.?$/.test(t));
        if (!surnameTokens.length) continue;

        const lastParts = [surnameTokens[surnameTokens.length - 1]];
        let i = surnameTokens.length - 2;
        while (i >= 0) {
            const single = surnameTokens[i].toUpperCase().replace(/\.$/, "");
            const phrase = `${single} ${lastParts.map(v => v.toUpperCase().replace(/\.$/, "")).join(" ")}`;
            if (NAME_PREFIXES.has(single) || NAME_PREFIXES.has(phrase)) {
                lastParts.unshift(surnameTokens[i]);
                i--;
            } else break;
        }

        const last = normalizeContactDisplayCase(lastParts.join(" ").replace(/\./g, ""));
        if (!last || isNameCredentialToken(last)) continue;

        console.info(`Toolbar NAME v93: current suffix field rescued -> ${firstDisplay} / ${last}.`);
        return {
            first: firstDisplay,
            last,
            suffixBoundaryName: true,
            suffixCurrentFieldRepair: true
        };
    }

    return null;
}


// v161 HIGH-CONFIDENCE LEADING HYPHENATED SURNAME:
// A resume that begins with an explicit First [Middle Initial] Hyphenated-Last
// is strong enough to trust before the broader first-pair heuristics.
//
// Examples:
//   Melissa A. Booth-Maye ...
//   Mary Smith-Jones ...
//
// This is deliberately narrow:
// - it must be at the very START of the resume header,
// - the surname itself must contain a hyphen,
// - only an optional one-letter middle initial may sit between First and Last,
// - ordinary stopwords/location words/credentials are still rejected.
//
// This does NOT change generic name parsing or any non-hyphenated-name behavior.
function findLeadingHyphenatedSurnameHeaderName(text) {
    if (!text) return null;

    const head = normalizeUnicode(String(text).slice(0, 220))
        .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015]/g, "-")
        .replace(/^[\s|•·,;:]+/, "");

    const token = "[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ'’]*";
    const re = new RegExp(
        "^(" + token + ")\\s+(?:([A-Za-z])\\.?\\s+)?(" + token + "(?:-" + token + ")+)(?=\\s|$|[,|•·;:])",
        "i"
    );

    const m = re.exec(head);
    if (!m) return null;

    const firstRaw = String(m[1] || "").trim();
    const lastRaw = String(m[3] || "").trim();
    const firstUpper = firstRaw.toUpperCase();
    const lastPartsUpper = lastRaw.toUpperCase().split("-");

    if (!firstRaw || !lastRaw) return null;
    if (NAME_STOPWORDS.has(firstUpper) || LOCATION_WORDS.has(firstUpper)) return null;
    if (isNameCredentialToken(firstRaw) || isNameCredentialToken(lastRaw)) return null;

    for (const part of lastPartsUpper) {
        if (!part || NAME_STOPWORDS.has(part) || LOCATION_WORDS.has(part)) return null;
    }

    const first = normalizeContactDisplayCase(firstRaw);
    const last = normalizeContactDisplayCase(lastRaw);
    if (!first || !last) return null;

    console.info(`Toolbar NAME v161: explicit leading hyphenated surname -> ${first} / ${last}.`);
    return {
        first,
        last,
        explicitLeadingHyphenatedSurname: true
    };
}

function hybridExtractName() {
    // v87: inherit the rare iframe fallback from getResumeText(); ordinary resumes
    // still return txtResumeRaw exactly as before.
    const raw = getResumeText();

    // v34: Some Word resumes begin with document metadata / the source filename,
    // for example:
    //   Microsoft Word - Alicia_Perkovich_Credit_Operations_Resume Alicia Perkovich Medina, OH ...
    //
    // "Microsoft Word" is made of two ordinary-looking words, so the generic
    // first-pair name detector can mistake that metadata for the applicant name
    // and never reach the real "Alicia Perkovich" header.
    //
    // Remove ONLY this very specific leading Word+filename wrapper before name
    // detection. Keep the original raw resume unchanged for every other feature.
    const rawForName = String(raw || "").replace(
        /^\s*Microsoft\s+Word\s*-\s*\S+\s+/i,
        ""
    );

    // v92: A visible Jr/Sr/II/III/IV/V immediately after a name is a hard
    // surname boundary. Check BOTH raw and rendered resume sources before any
    // broader name heuristic. This catches visible headers such as IVY MATHEWS JR.
    // even when txtResumeRaw does not preserve that header cleanly.
    const suffixBoundaryName = findSuffixBoundaryNameFromResumeSources(rawForName);
    if (suffixBoundaryName?.first && suffixBoundaryName?.last) {
        return suffixBoundaryName;
    }

    // v161: Before broad name heuristics, trust only the very narrow case where
    // the resume itself STARTS with First [Middle Initial] Hyphenated-Last.
    // This fixes partial site surnames such as Maye -> Booth-Maye without
    // weakening confirmation for ordinary/non-hyphenated names.
    const leadingHyphenatedName = findLeadingHyphenatedSurnameHeaderName(rawForName);
    if (leadingHyphenatedName?.first && leadingHyphenatedName?.last) {
        return leadingHyphenatedName;
    }

    // The raw resume header is the safest source when it begins with a clear
    // first/last name. extractNameFromTop reads only the first consecutive
    // name-like pair, instead of sending hundreds of words to parseNameLine.
    //
    // The old code passed an entire iframe span to parseNameLine(). That parser
    // intentionally uses the first surviving word as the first name and the
    // FINAL surviving word as the last name. A large span beginning with
    // "JOSHUA ROSENBERG ..." and ending near "Loan" therefore became
    // "Joshua Loan".
    // v43: trusted multi-word first names get first priority. This is intentionally
    // exact-match only; it does NOT create another generic three-name rule.
    const safeHeaderName = findSafeFirstNameInHeader(rawForName);
    if (safeHeaderName?.first && safeHeaderName?.last) {
        return safeHeaderName;
    }

    // v58: A clean rendered first line / dedicated Name heading outranks the flattened raw-header
    // first-two-token shortcut. This fixes cases such as "David Abarca Quesada"
    // where the email local-part resembles only "David Abarca".
    const explicitHeadingName = getExplicitResumeNameHeading();
    if (explicitHeadingName?.first && explicitHeadingName?.last) {
        console.info(
            `Toolbar NAME v58: rendered/explicit heading -> ${explicitHeadingName.first} / ${explicitHeadingName.last}.`
        );
        return explicitHeadingName;
    }

    const rawHeaderName = extractNameFromTop(rawForName);
    if (rawHeaderName?.first && rawHeaderName?.last) {
        return rawHeaderName;
    }

    try {
        const iframe = document.querySelector("#divResumeContainer iframe");
        const doc = iframe?.contentDocument || iframe?.contentWindow?.document;

        if (doc) {
            // Prefer explicit name elements, but never parse their entire text
            // as one long name line. Some resume HTML applies .Name to a parent
            // containing much more than the applicant's name.
            const nameNodes = Array.from(
                doc.querySelectorAll(".Section1 p.Name, p.Name, .Name")
            );

            for (const el of nameNodes) {
                const value = String(el.textContent || "").trim();
                if (!value || /@/.test(value)) continue;

                const detected = extractNameFromTop(value);
                if (detected?.first && detected?.last) {
                    return detected;
                }
            }

            // Last-resort span fallback. Only inspect genuinely short,
            // name-shaped spans. Never feed a paragraph or whole resume block
            // into parseNameLine().
            const spans = Array.from(doc.querySelectorAll("span"));

            for (const span of spans) {
                const value = String(span.textContent || "")
                    .replace(/\s+/g, " ")
                    .trim();
                if (!value || /@|\d/.test(value)) continue;

                const parts = value.split(/\s+/);
                if (parts.length < 2 || parts.length > 4) continue;
                if (!looksLikeRealNameLine(value)) continue;

                const parsed = parseNameLine(value);
                if (parsed?.first && parsed?.last) {
                    return parsed;
                }
            }
        }
    } catch (error) {
        console.warn("Toolbar NAME: iframe name reading failed.", error);
    }

    // Final raw fallback for unusual headers where the first-pair extractor
    // could not find a name. Limit parsing to the first visible header segment,
    // not the first 500 characters of the resume.
    const firstHeaderSegment = String(rawForName || "")
        .split(/\b(?:PROFESSIONAL\s+SUMMARY|SUMMARY|OBJECTIVE|EXPERIENCE|EMPLOYMENT|EDUCATION|SKILLS)\b/i)[0]
        .slice(0, 220)
        .trim();

    return parseNameLine(firstHeaderSegment);
}
function normalizeNameForCompare(value) {
    return normalizeUnicode(value || "")
        .toLowerCase()
        .replace(/[’]/g, "'")
        .replace(/[^a-zà-öø-ÿ'\- ]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}
function getResumeHeaderLines() {
    const lines = [];
    try {
        const iframe = document.querySelector("#divResumeContainer iframe");
        const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
        if (doc) {
            // Explicit name elements are the strongest confirmation source.
            for (const el of doc.querySelectorAll(".Section1 p.Name, p.Name, .Name")) {
                const value = el.textContent?.trim();
                if (value) lines.push({ text: value, strong: true });
            }

            const sectionText = doc.querySelector(".Section1")?.innerText || doc.body?.innerText || "";
            sectionText.split(/\r?\n/).slice(0, 12).forEach(line => {
                const value = line.trim();
                if (value) lines.push({ text: value, strong: false });
            });
        }
    } catch (e) {}

    const raw = getResumeText();
    raw.split(/\r?\n/).slice(0, 12).forEach(line => {
        const value = line.trim();
        if (value) lines.push({ text: value, strong: false });
    });
    return lines;
}
function isAutoNameConfirmed(name) {
    if (!name?.first || !name?.last) return false;

    const first = normalizeNameForCompare(name.first).split(" ")[0];
    const last = normalizeNameForCompare(name.last);
    if (!first || !last) return false;
    if (name.lateVerifiedHeading) return true; // v425: independently verified, uniquely matched late heading

    // Section headings, job words, and resume labels can appear in large bold
    // spans and must never be treated as a person's name.
    const blockedWords = new Set([
        "general", "manager", "management", "sales", "customer", "service",
        "representative", "professional", "specialist", "coordinator", "director",
        "engineer", "analyst", "associate", "supervisor", "administrator",
        "operations", "marketing", "account", "accounts", "support", "resume",
        "summary", "objective", "experience", "education", "skills", "core",
        "competency", "competencies", "development", "employment", "history",
        "technical", "qualifications", "profile", "projects", "certifications"
    ]);
    const proposedWords = `${first} ${last}`.split(/\s+/);
    if (proposedWords.some(word => blockedWords.has(word))) {
        console.warn(`Toolbar AUTO: rejected heading/job words as a name: "${name.first} ${name.last}".`);
        return false;
    }

    const escapeRegex = value =>
        value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const exactPattern = new RegExp(
        `(^|[^A-Za-zÀ-ÖØ-öø-ÿ])${escapeRegex(first)}\\s+(?:[A-Za-z]\\.?\\s+)?${escapeRegex(last)}([^A-Za-zÀ-ÖØ-öø-ÿ]|$)`,
        "i"
    );

    // An explicit Name element is trusted, but ordinary spans are not. The old
    // logic searched broad header lines, which allowed headings such as
    // "Core Competencies" to confirm themselves as a name.
    for (const item of getResumeHeaderLines().filter(item => item.strong)) {
        const normalized = normalizeNameForCompare(item.text);
        if (!normalized || /@|\d{3}/.test(item.text)) continue;

        if (exactPattern.test(normalized)) return true;

        const words = normalized.split(" ");
        if (words.includes(first) && words.includes(last)) return true;
    }

    // Otherwise, require the proposed first and last name together in the
    // actual contact/header area before the resume's first major section.
    let headerText = "";
    try {
        const iframe = document.querySelector("#divResumeContainer iframe");
        const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
        headerText = doc?.querySelector(".Section1")?.innerText ||
                     doc?.body?.innerText || "";
    } catch (e) {}

    if (!headerText) headerText = getResumeText();

    headerText = String(headerText || "")
        .split(/\b(?:PROFESSIONAL\s+SUMMARY|SUMMARY|OBJECTIVE|CORE\s+COMPETENCIES|EXPERIENCE|EMPLOYMENT|EDUCATION|SKILLS)\b/i)[0]
        .slice(0, 500);

    const normalizedHeader = normalizeNameForCompare(headerText);
    if (exactPattern.test(normalizedHeader)) return true;

    console.warn(
        `Toolbar AUTO: skipped unconfirmed name "${name.first} ${name.last}". ` +
        "The proposed name was not found together in the contact header."
    );
    return false;
}
function resumeInitialsMatchCurrentFullName(firstInput, lastInput) {
    const currentFirst = String(firstInput?.value || "").trim();
    const currentLast = String(lastInput?.value || "").trim();

    // Only protect an existing name that contains real full-name parts.
    if (
        !currentFirst ||
        !currentLast ||
        /^[A-Za-z]\.?$/.test(currentFirst) ||
        /^[A-Za-z]\.?$/.test(currentLast)
    ) {
        return false;
    }

    const firstInitial = normalizeNameForCompare(currentFirst).charAt(0);
    const lastWords = normalizeNameForCompare(currentLast)
        .split(/\s+/)
        .filter(Boolean);
    const lastInitial = lastWords[0]?.charAt(0) || "";

    if (!firstInitial || !lastInitial) return false;

    const escapeRegex = value =>
        value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Requires the resume header/name element to begin with exactly the same
    // first and last initials as the existing full contact name.
    const initialsPattern = new RegExp(
        "^\\s*" +
        escapeRegex(firstInitial) +
        "\\.?\\s+" +
        escapeRegex(lastInitial) +
        "\\.?(?=\\s|$)",
        "i"
    );

    const possibleHeaders = [];

    try {
        const iframe = document.querySelector("#divResumeContainer iframe");
        const doc = iframe?.contentDocument || iframe?.contentWindow?.document;

        if (doc) {
            for (const el of doc.querySelectorAll(
                ".Section1 p.Name, p.Name, .Name"
            )) {
                const value = String(el.textContent || "")
                    .replace(/\s+/g, " ")
                    .trim();

                if (value) possibleHeaders.push(value);
            }

            const sectionText =
                doc.querySelector(".Section1")?.innerText ||
                doc.body?.innerText ||
                "";

            const firstVisibleLine = String(sectionText)
                .split(/\r?\n/)
                .map(line => line.trim())
                .find(Boolean);

            if (firstVisibleLine) possibleHeaders.push(firstVisibleLine);
        }
    } catch (error) {
        console.warn(
            "Toolbar NAME: could not inspect iframe initials.",
            error
        );
    }

    const rawFirstLine = getResumeText()
        .split(/\r?\n/)
        .map(line => line.trim())
        .find(Boolean);

    if (rawFirstLine) possibleHeaders.push(rawFirstLine);

    const matches = possibleHeaders.some(header =>
        initialsPattern.test(
            normalizeUnicode(header)
                .replace(/\s+/g, " ")
                .trim()
        )
    );

    if (matches) {
        console.log(
            `Toolbar NAME: preserving "${currentFirst} ${currentLast}" ` +
            `because the resume header initials match ${firstInitial.toUpperCase()} ${lastInitial.toUpperCase()}.`
        );
    }

    return matches;
}
function removeMiddleInitialFromLastName(lastName) {
    const parts = String(lastName || "").trim().split(/\s+/).filter(Boolean);

    // The site occasionally stores a middle initial at the beginning of the
    // Last Name field (for example, "A. Hernandez"). Remove only leading
    // one-letter initials; preserve genuine compound surnames and prefixes.
    while (parts.length > 1 && /^[A-Za-z]\.?$/.test(parts[0])) {
        parts.shift();
    }

    return parts.join(" ");
}

// v279 COMPOUND-SURNAME PREFIX EXCEPTION:
// Keep the v266 rule that accidental multi-word Last Name values collapse to the
// final word, BUT preserve legitimate compound surnames that begin with one of
// our recognized surname prefixes. Examples: "De Leon", "De Senzo",
// "De La Cruz", "Van Buren", "Von Trapp". Ordinary accidental pairs such as
// "Black Elk" or "Mary Smith" still collapse to "Elk" / "Smith".
function enforceSingleLastName(value) {
    const clean = String(value || "").replace(/\s+/g, " ").trim();
    if (!clean) return clean;

    const parts = clean.split(" ").filter(Boolean);
    if (parts.length <= 1) return clean;

    // A valid compound surname is: recognized prefix phrase + terminal surname.
    // Test every possible prefix boundary so multi-word prefixes such as
    // "De La" and "Van Der" are retained as well as simple "De".
    for (let prefixLen = parts.length - 1; prefixLen >= 1; prefixLen--) {
        const prefix = parts.slice(0, prefixLen).join(" ").toUpperCase();
        if (NAME_PREFIXES.has(prefix)) {
            return parts.map(toProper).join(" ");
        }
    }

    return parts[parts.length - 1];
}

function normalizeFirstNameInitialsCase(value) {
    const clean = String(value || "").trim();

    // v127: If First Name is exactly two initials, keep both letters uppercase.
    // Examples: "Aj" -> "AJ", "A j" -> "A J", "A.J." -> "A.J.".
    if (/^[A-Za-z]{2}$/.test(clean)) return clean.toUpperCase();
    if (/^[A-Za-z]\s+[A-Za-z]$/.test(clean)) return clean.toUpperCase();
    if (/^[A-Za-z]\.\s*[A-Za-z]\.?$/.test(clean)) return clean.toUpperCase();

    return clean;
}

// v206 HARD NAME-DIGIT CLEANUP:
// Numbers are never valid in WallStJobs First/Last Name fields. Strip ALL digits
// from BOTH existing fields before resume-name detection runs. This cleanup is
// intentionally independent of whether a name can be found in the resume, so
// values such as "Jayanna2733" become "Jayanna" even when detection later fails.
function stripDigitsFromName(value) {
    return String(value || "")
        .replace(/\d+/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function cleanExistingNameFields(firstInput, lastInput) {
    let changed = false;

    if (firstInput) {
        const originalFirst = String(firstInput.value || "").trim();
        const cleanedFirst = normalizeFirstNameInitialsCase(normalizeContactDisplayCase(
            stripNameTitlesAndCredentials(
                stripDigitsFromName(originalFirst),
                { stripLeading: true, stripTrailing: true }
            )
        ));

        if (cleanedFirst !== originalFirst) {
            firstInput.value = cleanedFirst;
            triggerEvents(firstInput);
            changed = true;
        }
    }

    if (lastInput) {
        const originalLast = String(lastInput.value || "").trim();

        // First preserve the existing middle-initial cleanup, then remove
        // trailing titles/suffixes/credentials such as CPC-A, MBA, Jr., III.
        let cleanedLast = applyLearnedMacLastNameCase(
            enforceSingleLastName(
                stripNameTitlesAndCredentials(
                    removeMiddleInitialFromLastName(stripDigitsFromName(originalLast)),
                    { stripLeading: false, stripTrailing: true }
                )
            )
        );

        // v91 TRANSACTIONAL SAFETY:
        // If the current Last Name is ONLY Jr./Sr./II/III/IV/V, do not blank it here.
        // Detection below must first produce a real replacement surname. This prevents
        // a failed/blocked detection from leaving the Last Name empty.
        const cleanedLastToken = normalizeNameCredentialToken(cleanedLast);
        const cleanedLastNoPeriods = cleanedLastToken.replace(/\./g, "");
        const suffixOnlyExisting =
            NAME_SUFFIXES.has(cleanedLastToken) ||
            NAME_SUFFIXES.has(cleanedLastNoPeriods);

        // v206: digit removal must still happen even if the field was only digits.
        // Preserve the existing suffix-only transactional safety, but otherwise
        // allow the cleaned value to become blank when the original contained no name.
        if (!suffixOnlyExisting && cleanedLast !== originalLast) {
            lastInput.value = cleanedLast;
            triggerEvents(lastInput);
            changed = true;
        }
    }

    return changed;
}

function fillNameFields(options = {}) {
    // v356: Diagnostic-only decision trace. No name rules changed.
    const traceAuto = (stage, detail = "") => {
        if (options.auto) console.info(`Toolbar AUTO NAME v356: ${stage}${detail ? "; " + detail : ""}`);
    };
    traceAuto("ENTER fillNameFields", `requireConfirmation=${Boolean(options.requireConfirmation)}`);
    // v48 HARD REVERT GUARD:
    // Once the user has reverted Name on this applicant, NO Auto Name path may
    // write to First/Last again. Manual clicking of the Name button remains allowed.
    if (options.auto && window.__frt7_name_reverted === true) {
        console.info("Toolbar NAME v48: Auto Name blocked because Name was reverted.");
        return false;
    }

    const firstInput =
        document.querySelector("#txtFirstNameDataEntry") ||
        document.querySelector("#txtFirstName");

    const lastInput =
        document.querySelector("#txtLastNameDataEntry") ||
        document.querySelector("#txtLastName");

    if (!firstInput || !lastInput) {
        console.warn("Toolbar: name fields not found.");
        return false;
    }

    // v132 HARD MANUAL NAME LOCK:
    // Every Auto Name path ultimately comes through fillNameFields(), including
    // delayed refinement passes that run for several seconds after page load.
    // Guard HERE, before even cleaning the existing values, so a human edit to
    // either First or Last can never be changed by any later Auto pass. A trusted
    // manual click of the Name button is still allowed because options.auto=false.
    if (options.auto && isNameManuallyLocked(firstInput, lastInput)) {
        console.info("Toolbar NAME v132: Auto Name blocked because user manually edited First/Last.");
        return false;
    }

    // v249 INVALID-EXISTING-NAME EXCEPTION:
    // Capture the site's raw values BEFORE the normal cleanup below. The existing
    // two-field Auto guard normally prevents changing both First + Last at once,
    // except for an exact flip. If either original field contains obvious invalid
    // name data (digits, a punctuation/symbol-only value such as "--", or symbols
    // other than normal name punctuation), allow a confirmed resume name to repair
    // BOTH fields. Normal apostrophes, hyphens, periods, spaces, and Unicode letters
    // are not treated as invalid, so legitimate names keep the existing protection.
    const rawExistingNameBeforeCleanup = {
        first: String(firstInput.value || "").trim(),
        last: String(lastInput.value || "").trim()
    };
    const hasInvalidExistingNameCharacters = value => {
        const raw = String(value || "").trim();
        if (!raw) return false;
        if (/\d/u.test(raw)) return true;
        if (!/\p{L}/u.test(raw)) return true;
        return /[^\p{L}\p{M}'’\-.\s]/u.test(raw);
    };
    const existingNameHasInvalidCharacters =
        hasInvalidExistingNameCharacters(rawExistingNameBeforeCleanup.first) ||
        hasInvalidExistingNameCharacters(rawExistingNameBeforeCleanup.last);

    // Always clean the values already present on the page, even when name
    // detection later decides not to replace them.
    const cleanedExisting = cleanExistingNameFields(firstInput, lastInput);
    traceAuto("CURRENT", `first=${JSON.stringify(firstInput.value)} last=${JSON.stringify(lastInput.value)} cleaned=${Boolean(cleanedExisting)}`);

    /*
     * Preserve the existing full contact name when the resume only presents
     * matching initials.
     *
     * Example:
     * Existing contact: Joshua Bellamy
     * Resume header: J B
     *
     * This prevents the flattened header "J B Chapel Hill..." from being
     * misread as first name J and last name Chapel.
     *
     * This protection applies to both Auto mode and the manual Name button.
     */
    if (resumeInitialsMatchCurrentFullName(firstInput, lastInput)) {
        traceAuto("BLOCK", "resume initials match existing full name");
        return cleanedExisting;
    }

    const text = getResumeText();

    // v438 EXACT HEADER FLIP: only swap two already-present names when the
    // beginning of the raw resume explicitly contains them in reverse order.
    // Do not infer a new name or use a job title as a surname.
    if (options.auto && !existingNameHasInvalidCharacters &&
        rawExistingNameBeforeCleanup.first && rawExistingNameBeforeCleanup.last) {
        const escapePart = v => String(v).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const a = rawExistingNameBeforeCleanup.first;
        const b = rawExistingNameBeforeCleanup.last;
        const raw = String(document.getElementById("txtResumeRaw")?.value || "");
        const exactFlip = new RegExp(`^\\s*${escapePart(b)}\\s+${escapePart(a)}(?=\\s|[^A-Za-z]|$)`, "i").test(raw.slice(0, 400));
        if (exactFlip && a.toLowerCase() !== b.toLowerCase()) {
            const swapped = { first: normalizeContactDisplayCase(b), last: applyLearnedMacLastNameCase(a) };
            if (!isRejectedAutoName(swapped)) {
                firstInput.value = swapped.first;
                triggerEvents(firstInput);
                lastInput.value = swapped.last;
                triggerEvents(lastInput);
                window.__frt7_last_auto_name = { ...swapped };
                console.info(`Toolbar NAME v438: exact raw-header flip confirmed -> ${swapped.first} / ${swapped.last}.`);
                showNameChangedToast();
                return true;
            }
        }
    }

    // v92 TRANSACTIONAL SUFFIX OVERRIDE:
    // If the site's current Last Name is itself only a generational suffix, give
    // the dedicated raw+rendered suffix detector first chance to repair it. This
    // path is shared by Auto and the manual Name button. It never blanks the field:
    // a replacement is written only after a real surname has been recovered.
    const currentLastToken = normalizeNameCredentialToken(lastInput.value);
    const currentLastNoPeriods = currentLastToken.replace(/\./g, "");
    const currentLastIsSuffixOnly =
        NAME_SUFFIXES.has(currentLastToken) || NAME_SUFFIXES.has(currentLastNoPeriods);

    // v425: Narrow misplaced-name heading recovery. Some converted resumes put
    // CONTACT/EDUCATION/SKILLS/LANGUAGES before the actual applicant name.
    // Only use an ALL-CAPS First [middle initial] Last heading directly before
    // a professional subtitle / ABOUT ME, and require the existing first name
    // to match exactly. Never infer a surname from the email or a school name.
    const findLateApplicantHeading = () => {
        if (!options.auto || currentLastIsSuffixOnly) return null;
        const raw = String(document.getElementById("txtResumeRaw")?.value || "");
        const existingFirst = String(firstInput.value || "").trim();
        if (!existingFirst || !raw || raw.length > 30000) return null;
        const fold = v => normalizeUnicode(String(v)).normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const re = /\b([A-ZÀ-ÖØ-Þ]{3,})\s+([A-ZÀ-ÖØ-Þ])\.\s+([A-ZÀ-ÖØ-Þ]{3,})\s+(?=[A-ZÀ-ÖØ-Þ][A-ZÀ-ÖØ-Þ\s|.]{5,85}\bABOUT\s+ME\b)/g;
        const matches = [...raw.matchAll(re)].filter(m =>
            fold(m[1]) === fold(existingFirst) &&
            !NAME_STOPWORDS.has(m[3]) && !isNameCredentialToken(m[3]));
        if (matches.length !== 1) return null;
        const m = matches[0];
        return { first: normalizeContactDisplayCase(m[1]),
                 last: normalizeContactDisplayCase(m[3]),
                 lateVerifiedHeading: true };
    };
    const lateVerifiedName = findLateApplicantHeading();
    if (lateVerifiedName) console.info(`Toolbar NAME v425: verified late applicant heading -> ${lateVerifiedName.first} / ${lateVerifiedName.last}.`);

    const name = currentLastIsSuffixOnly
        ? (findSurnameBeforeSuffixForCurrentFirst(firstInput.value, text) ||
           findSuffixBoundaryNameFromResumeSources(text) ||
           hybridExtractName(text))
        : (lateVerifiedName || hybridExtractName(text));

    traceAuto("DETECTED", name ? `first=${JSON.stringify(name.first)} last=${JSON.stringify(name.last)} suffixRepair=${Boolean(name.suffixCurrentFieldRepair)}` : "no candidate");

    // v420: Preserve an already-correct contact name found together at the
    // beginning of the raw resume (allowing a middle initial).  This guard
    // applies to ALL automatic Name paths, even early passes which intentionally
    // use requireConfirmation=false.  Manual Name-button clicks are unaffected.
    if (options.auto && name && !existingNameHasInvalidCharacters &&
        rawExistingNameBeforeCleanup.first && rawExistingNameBeforeCleanup.last &&
        !name.suffixCurrentFieldRepair) {
        const escapeNamePart = v => String(v).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const currentFirst = rawExistingNameBeforeCleanup.first.trim();
        const currentLast = rawExistingNameBeforeCleanup.last.trim();
        const proposedFirst = String(name.first || "").trim();
        const proposedLast = String(name.last || "").trim();
        const rawHeader = String(document.getElementById("txtResumeRaw")?.value || getResumeText() || "").slice(0, 400);
        const confirmedCurrent = new RegExp(
            `^\\s*${escapeNamePart(currentFirst)}\\s+(?:[A-Za-z]\\.?\\s+)?${escapeNamePart(currentLast)}(?=\\s|[^A-Za-z]|$)`, "i"
        ).test(rawHeader);
        if (confirmedCurrent &&
            (currentFirst.toLowerCase() !== proposedFirst.toLowerCase() ||
             currentLast.toLowerCase() !== proposedLast.toLowerCase())) {
            console.info(`Toolbar NAME v420: preserved confirmed header name "${currentFirst} ${currentLast}"; rejected candidate "${proposedFirst} ${proposedLast}".`);
            traceAuto("BLOCK", "existing full name confirmed at start of resume header");
            return cleanedExisting;
        }
    }
    if (!name) {
        console.warn("Toolbar: could not infer name.");
        return cleanedExisting;
    }

    // v93: When the site's Last Name is literally a suffix and the same current
    // First Name is found in a rendered/raw "First ... Surname Suffix" header,
    // that is already a transactional confirmation. Do not let the broader Auto
    // confirmation heuristic veto this exact repair.
    if (options.requireConfirmation && !name?.suffixCurrentFieldRepair && !isAutoNameConfirmed(name)) {
        traceAuto("BLOCK", "candidate failed isAutoNameConfirmed");
        return cleanedExisting;
    }

    // Rejected names are a hard block for BOTH Auto and the manual Name button.
    // A one-word manual rejected entry blocks that word in either First or Last;
    // a multi-word entry follows isRejectedAutoName()'s phrase matching rules.
    const nameIsRejected = name?.suffixBoundaryName
        ? isManuallyRejectedName(name)
        : isRejectedAutoName(name);

    if (nameIsRejected) {
        traceAuto("BLOCK", "detected name is in rejected-name protection");
        console.warn(`Toolbar NAME: skipped previously rejected detected name "${name.first} ${name.last}".`);
        if (options.auto) pendingAutoNameLearning = null;
        return cleanedExisting;
    }

    // Final safety cleanup used by BOTH Auto and the manual Name button.
    name.first = normalizeFirstNameInitialsCase(normalizeContactDisplayCase(
        stripNameTitlesAndCredentials(
            stripDigitsFromName(name.first),
            { stripLeading: true, stripTrailing: true }
        )
    ));
    name.last = applyLearnedMacLastNameCase(
        enforceSingleLastName(
            stripNameTitlesAndCredentials(
                removeMiddleInitialFromLastName(stripDigitsFromName(name.last)),
                { stripLeading: false, stripTrailing: true }
            )
        )
    );

    traceAuto("NORMALIZED CANDIDATE", `first=${JSON.stringify(name.first)} last=${JSON.stringify(name.last)}`);
    // v398: Do not replace a full first name with the combined initials of
    // the existing first and last names (Domonique Williams -> DW Williams).
    // Preserve legitimate two-letter first names unless BOTH initials match.
    const existingFirstForInitialGuard = String(firstInput.value || "").trim();
    const existingLastForInitialGuard = String(lastInput.value || "").trim();
    const proposedFirstForInitialGuard = String(name.first || "").replace(/\./g, "").trim();
    if (/^[A-Za-z]{2}$/.test(proposedFirstForInitialGuard) &&
        existingFirstForInitialGuard.length > 2 &&
        existingLastForInitialGuard.length > 1 &&
        proposedFirstForInitialGuard.toUpperCase() ===
            (existingFirstForInitialGuard[0] + existingLastForInitialGuard[0]).toUpperCase() &&
        String(name.last || "").trim().toUpperCase() === existingLastForInitialGuard.toUpperCase()) {
        traceAuto("BLOCK", `combined first/last initials ${JSON.stringify(name.first)} would replace full first name ${JSON.stringify(existingFirstForInitialGuard)}`);
        console.warn(`Toolbar NAME v398: preserved ${existingFirstForInitialGuard} ${existingLastForInitialGuard}; rejected combined-initial first name ${name.first}.`);
        if (options.auto) pendingAutoNameLearning = null;
        return cleanedExisting;
    }

    // v89 HARD SUFFIX STOP:
    // A suffix can NEVER be the Last Name by itself. The generic credential
    // stripper preserves a one-token value to avoid deleting legitimate surnames,
    // so explicitly reject true suffix-only last-name values here.
    const normalizedLastSuffixCheck = normalizeNameCredentialToken(name.last);
    const normalizedLastSuffixNoPeriods = normalizedLastSuffixCheck.replace(/\./g, "");
    if (
        NAME_SUFFIXES.has(normalizedLastSuffixCheck) ||
        NAME_SUFFIXES.has(normalizedLastSuffixNoPeriods)
    ) {
        console.warn(`Toolbar NAME v89: refused suffix-only Last Name "${name.last}".`);
        if (options.auto) pendingAutoNameLearning = null;
        return cleanedExisting;
    }

    if (!name.first || !name.last) {
        console.warn("Toolbar NAME: title/credential cleanup left an incomplete name; keeping existing fields.");
        return cleanedExisting;
    }

    // v55: Never write an explicitly rejected one-word token into Last Name.
    // This is checked AFTER cleanup so punctuation/case cannot bypass the guard.
    if (!name?.suffixBoundaryName && isRejectedLastNameCandidate(name.last)) {
        traceAuto("BLOCK", `rejected last-name token ${JSON.stringify(name.last)}`);
        console.warn(`Toolbar NAME v55: refused rejected Last Name token "${name.last}".`);
        if (options.auto) pendingAutoNameLearning = null;
        return cleanedExisting;
    }

    // v32: NEVER replace both First + Last with initials.
    //
    // A real applicant can legitimately have ONE initial in either field
    // (for example "J Smith" or "Joshua R"), so those cases are still allowed.
    // The unsafe case is ONLY when the detected replacement would make BOTH
    // fields initials, such as "J R". In that case preserve whatever name is
    // already on the page.
    const proposedFirstIsInitial = /^[A-Za-z]\.?$/.test(String(name.first || "").trim());
    const proposedLastIsInitial  = /^[A-Za-z]\.?$/.test(String(name.last || "").trim());

    if (proposedFirstIsInitial && proposedLastIsInitial) {
        traceAuto("BLOCK", "both proposed names are initials");
        console.warn(
            `Toolbar NAME: refused to replace existing name with two initials "${name.first} ${name.last}".`
        );
        if (options.auto) pendingAutoNameLearning = null;
        return cleanedExisting;
    }

    // v321: A detected middle initial is not a replacement surname.
    // In particular, "WILKINS, DONYELE E" must not turn Donyele Wilkins
    // into Donyele E. Preserve the existing complete surname.
    if (/^[A-Za-z]\.?$/.test(String(name.last || "").trim()) &&
        String(lastInput.value || "").trim().replace(/[^A-Za-z]/g, "").length > 1) {
        traceAuto("BLOCK", "proposed surname is a single initial");
        console.info(`Toolbar NAME v321: refused initial-only replacement surname "${name.last}".`);
        if (options.auto) pendingAutoNameLearning = null;
        return cleanedExisting;
    }

    // v263 SPLIT LAST-NAME REPAIR — DIRECT CURRENT-FIELD ANCHOR:
    // Do NOT depend on the general name detector agreeing with First Name. In the
    // broken-surname case the detector itself is what is wrong. Anchor only to the
    // CURRENT page First + Last values and require the raw resume to begin with:
    //     currentFirst + currentLastFragment + lowercaseContinuation
    // Example: Stephanie + Fi + elds => Fields.
    // The lowercase continuation is the safety signal; "Hard Worker" will not match.
    {
        const currentFirst = String(firstInput.value || "").trim();
        const currentLast = String(lastInput.value || "").trim();

        const foldLetters = value => normalizeUnicode(String(value || ""))
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^A-Za-z]/g, "")
            .toLowerCase();

        if (currentFirst && currentLast && currentLast.length <= 8) {
            const rawTop = String(document.getElementById("txtResumeRaw")?.value || "")
                .slice(0, 700)
                .replace(/\u00a0/g, " ")
                .replace(/^[\s|•·,;:]+/, "");

            const firstRe = escapeRegexLiteral(currentFirst);
            const lastRe = escapeRegexLiteral(currentLast);
            const headerRe = new RegExp(
                "^" + firstRe + "\\s+" + lastRe +
                "\\s+([a-zà-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ'’.-]{1,15})(?=\\s|$|[,|•·;:])"
            );
            const m = headerRe.exec(rawTop);

            if (m) {
                const continuation = String(m[1] || "").replace(/^[.'’\-]+/, "");
                const repairedLast = applyLearnedMacLastNameCase(
                    normalizeContactDisplayCase(currentLast + continuation)
                );
                const repairedFold = foldLetters(repairedLast);
                const currentFold = foldLetters(currentLast);

                // v448: A verified complete surname must not absorb the next
                // lowercase description word (Ayana Wylie dependable worker).
                // Preserve genuine split-surname repairs when the rendered heading
                // does NOT already confirm the current first and last names.
                const explicitHeading = getExplicitResumeNameHeading();
                const currentNameVerified = explicitHeading &&
                    foldLetters(explicitHeading.first) === foldLetters(currentFirst) &&
                    foldLetters(explicitHeading.last) === currentFold;
                if (currentNameVerified) {
                    console.info(`Toolbar NAME v448: preserved verified heading surname "${currentLast}"; refused to append "${continuation}".`);
                }

                // v418: A flattened email local-part can repeat the first name after a correct surname.
                // Never append that repeated first name to the surname.
                if (!currentNameVerified && continuation.length >= 2 && foldLetters(continuation) !== foldLetters(currentFirst) && repairedFold.length >= 3 && repairedFold !== currentFold) {
                    console.info(
                        `Toolbar NAME v263: direct split Last Name repair "${currentLast} ${continuation}" -> "${repairedLast}".`
                    );
                    name.first = currentFirst;
                    name.last = repairedLast;
                    name.__v263SplitLastRepair = true;
                }
            }
        }
    }

    // v434: Exception for a site surname made by concatenating 3+ distinct
    // header tokens (Erik / Bryanherreramartinez vs Erik Bryan Herrera Martinez).
    // Require a clean explicit heading AND the exact raw-header token sequence;
    // ordinary two-part/compound surnames keep their existing protections.
    const frt7V434ConcatenatedHeader = (() => {
        if (!options.auto) return false;
        const fold = v => normalizeUnicode(String(v || "")).normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z]/g, "").toLowerCase();
        const first = fold(firstInput.value), oldLast = fold(lastInput.value);
        const candidateFirst = fold(name.first), candidateLast = fold(name.last);
        if (!first || first !== candidateFirst || !oldLast || oldLast === candidateLast) return false;
        const explicit = getExplicitResumeNameHeading();
        if (!explicit || fold(explicit.first) !== first || fold(explicit.last) !== candidateLast) return false;
        const raw = String(document.getElementById("txtResumeRaw")?.value || "").trim();
        const tokens = (raw.slice(0, 220).match(/^[A-Za-zÀ-ÖØ-öø-ÿ'’.-]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ'’.-]+){3,}/) || [""])[0]
            .split(/\s+/).filter(Boolean);
        if (tokens.length < 4 || fold(tokens[0]) !== first) return false;
        for (let count = 3; count <= Math.min(5, tokens.length - 1); count++) {
            const parts = tokens.slice(1, count + 1);
            if (fold(parts.join("")) === oldLast && fold(parts[parts.length - 1]) === candidateLast) {
                console.info(`Toolbar NAME v434: confirmed concatenated site surname from ${count} header tokens; allowing last name "${name.last}".`);
                return true;
            }
        }
        return false;
    })();

    // v261 SPLIT LAST-NAME GUARD:
    // Flattened resume text can insert whitespace INSIDE a surname, e.g.
    //   "Stephanie Fi    elds"  -> detector may see Last="Fi"
    // while WallStJobs already correctly has Last="Fields".
    //
    // Before Auto is allowed to make a one-field Last Name correction, check the
    // very top of txtResumeRaw. If the existing surname can be reconstructed there
    // from 2-4 adjacent alphabetic fragments immediately following the current
    // first name, preserve the existing full surname. This is intentionally narrow:
    // it does NOT globally glue words together and it does NOT affect City/Email/etc.
    if (options.auto) {
        const existingFirstForSplitGuard = String(firstInput.value || "").trim();
        const existingLastForSplitGuard = String(lastInput.value || "").trim();
        const proposedFirstForSplitGuard = String(name.first || "").trim();
        const proposedLastForSplitGuard = String(name.last || "").trim();

        const foldNameLetters = value => normalizeUnicode(String(value || ""))
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^A-Za-z]/g, "")
            .toLowerCase();

        const firstFold = foldNameLetters(existingFirstForSplitGuard);
        const existingLastFold = foldNameLetters(existingLastForSplitGuard);
        const proposedFirstFold = foldNameLetters(proposedFirstForSplitGuard);
        const proposedLastFold = foldNameLetters(proposedLastForSplitGuard);

        // Only intervene when First Name is staying the same and Auto wants to
        // shorten/change Last Name. That keeps all existing flip/two-field logic intact.
        if (
            firstFold &&
            existingLastFold.length >= 3 &&
            proposedFirstFold === firstFold &&
            proposedLastFold !== existingLastFold
        ) {
            const rawTop = String(document.getElementById("txtResumeRaw")?.value || "")
                .slice(0, 700)
                .replace(/\u00a0/g, " ");

            const words = rawTop.match(/[A-Za-zÀ-ÖØ-öø-ÿ'’.-]+/g) || [];
            const foldedWords = words.map(foldNameLetters);

            let splitSurnameConfirmed = false;

            for (let i = 0; i < foldedWords.length && i < 24; i++) {
                if (foldedWords[i] !== firstFold) continue;

                let joined = "";
                for (let j = i + 1; j < foldedWords.length && j <= i + 4; j++) {
                    if (!foldedWords[j]) break;
                    joined += foldedWords[j];

                    if (joined === existingLastFold && j > i + 1) {
                        splitSurnameConfirmed = true;
                        break;
                    }
                    if (!existingLastFold.startsWith(joined)) break;
                }
                if (splitSurnameConfirmed) break;
            }

            if (splitSurnameConfirmed && !frt7V434ConcatenatedHeader) {
                traceAuto("GUARD", "v261 split-surname preservation");
                console.info(
                    `Toolbar NAME v261: preserved existing Last Name "${existingLastForSplitGuard}" ` +
                    `because the resume header contains it split across whitespace.`
                );
                name.last = existingLastForSplitGuard;
            }
        }
    }

    // v355: Apply the EXISTING v265 rendered-refinement truncation protection
    // to the primary Auto Name write path too. v261 only checks txtResumeRaw,
    // which can contain merely "Life" for iframe-based Word resumes.
    // This is Auto-only: manual Name retains its existing behavior.
    if (options.auto) {
        const existingFirst = String(firstInput.value || "").trim();
        const existingLast = String(lastInput.value || "").trim();
        const proposedFirst = String(name.first || "").trim();
        const proposedLast = String(name.last || "").trim();
        // v357: The foldTypography helper in scheduleRenderedNameRefinement()
        // is local to that function and unavailable here. Use a local equivalent.
        const foldAutoSurname = value => normalizeUnicode(String(value || ""))
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[’]/g, "'").replace(/[^A-Za-z'\-]+/g, "").toLowerCase();
        const currentFold = foldAutoSurname(existingLast);
        const proposedFold = foldAutoSurname(proposedLast);
        if (foldAutoSurname(existingFirst) === foldAutoSurname(proposedFirst) &&
            currentFold.length >= 3 && proposedFold.length >= 1 &&
            proposedFold.length < currentFold.length &&
            (currentFold.startsWith(proposedFold) || currentFold.endsWith(proposedFold)) &&
            !frt7V434ConcatenatedHeader) {
            console.info(`Toolbar NAME v355: existing v265 surname truncation protection applied to primary Auto path; preserved "${existingLast}" instead of "${proposedLast}" (raw resume may be empty; iframe name may be split).`);
            traceAuto("BLOCK", "v355 prefix/suffix truncation protection");
            pendingAutoNameLearning = null;
            return cleanedExisting;
        }
    }

    // v232 AUTO BOTH-FIELDS SAFETY:
    // Auto may still CLEAN the existing First/Last values above (digits, Jr./Sr.,
    // credentials, leading middle initial, etc.). But if resume detection would
    // replace BOTH cleaned fields with different values, preserve the cleaned
    // existing name. This prevents false detections such as "Hard Worker" from
    // replacing a valid site name such as "Theresa Budd". A one-field correction
    // is still allowed, and the manual Name button keeps its existing behavior.
    if (options.auto) {
        const existingFirst = String(firstInput.value || "").trim();
        const existingLast = String(lastInput.value || "").trim();
        const proposedFirst = String(name.first || "").trim();
        const proposedLast = String(name.last || "").trim();
        const firstWouldChange = existingFirst !== proposedFirst;
        const lastWouldChange = existingLast !== proposedLast;

        // v233 FLIP EXCEPTION:
        // If the detector is doing nothing except swapping the two existing fields,
        // allow it. WallStJobs sometimes has First/Last stored backwards, e.g.
        //   First=Budd, Last=Theresa -> First=Theresa, Last=Budd.
        // This is intentionally exact (case-insensitive) so unrelated two-field
        // replacements such as Theresa Budd -> Hard Worker remain blocked.
        const isExactFirstLastFlip =
            existingFirst.localeCompare(proposedLast, undefined, { sensitivity: "accent" }) === 0 &&
            existingLast.localeCompare(proposedFirst, undefined, { sensitivity: "accent" }) === 0;

        // v424: Permit a two-field correction only when BOTH existing initials
        // match the proposed full name, in the same First/Last order.
        // Require a confirmed resume-header name; initials alone are not evidence.
        const firstInitialOf = value => normalizeUnicode(String(value || ""))
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .match(/[A-Za-z]/)?.[0]?.toUpperCase() || "";
        const isMatchingInitialsConfirmedName =
            existingFirst.length > 1 && existingLast.length > 1 &&
            proposedFirst.length > 1 && proposedLast.length > 1 &&
            firstInitialOf(existingFirst) === firstInitialOf(proposedFirst) &&
            firstInitialOf(existingLast) === firstInitialOf(proposedLast) &&
            Boolean(firstInitialOf(existingFirst)) && Boolean(firstInitialOf(existingLast)) &&
            isAutoNameConfirmed(name);

        // v446: Exact joined-name recovery. The resume must START with the
        // independently detected full name, and one existing field must equal
        // the entire First+Last concatenation. Never accept partial substrings.
        const foldJoinedName = value => normalizeUnicode(String(value || ""))
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^A-Za-z]/g, "").toLowerCase();
        const rawNameHeader = String(document.getElementById("txtResumeRaw")?.value || "")
            .replace(/\u00a0/g, " ").trimStart().slice(0, 300);
        const escapeHeaderName = value => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const exactHeaderName = proposedFirst.length >= 2 && proposedLast.length >= 2 &&
            new RegExp(`^${escapeHeaderName(proposedFirst)}\\s+${escapeHeaderName(proposedLast)}(?=\\s|[^A-Za-z]|$)`, "i").test(rawNameHeader);
        const joinedProposed = foldJoinedName(proposedFirst + proposedLast);
        const isExactJoinedHeaderName = Boolean(
            exactHeaderName && joinedProposed.length >= 6 &&
            (foldJoinedName(existingFirst) === joinedProposed ||
             foldJoinedName(existingLast) === joinedProposed) &&
            !isRejectedAutoName(name)
        );

        // v317: Never let digits or punctuation bypass the BOTH-field guard.
        // cleanExistingNameFields() already strips digits independently.
        if (firstWouldChange && lastWouldChange && !isExactFirstLastFlip && !isMatchingInitialsConfirmedName && !isExactJoinedHeaderName) {
            console.warn(
                `Toolbar NAME v317: refused replacement of BOTH name fields ` +
                `"${existingFirst} ${existingLast}" -> "${proposedFirst} ${proposedLast}"; ` +
                `preserved cleaned existing name.`
            );
            pendingAutoNameLearning = null;
            return cleanedExisting;
        }

        if (firstWouldChange && lastWouldChange && isExactJoinedHeaderName) {
            console.info(`Toolbar NAME v446: exact joined contact name matches resume header; allowed both-field correction -> ${proposedFirst} / ${proposedLast}.`);
        }

        if (firstWouldChange && lastWouldChange && isMatchingInitialsConfirmedName && !isExactFirstLastFlip) {
            console.info(`Toolbar NAME v424: allowed confirmed matching-initials correction "${existingFirst} ${existingLast}" -> "${proposedFirst} ${proposedLast}".`);
        }

        if (firstWouldChange && lastWouldChange && isExactFirstLastFlip) {
            console.info(
                `Toolbar NAME v233: allowed exact First/Last flip ` +
                `"${existingFirst} ${existingLast}" -> "${proposedFirst} ${proposedLast}".`
            );
        }
    }

    traceAuto("ALLOW", `writing first=${JSON.stringify(name.first)} last=${JSON.stringify(name.last)}`);
    const originalBeforeAuto = {
        first: String(firstInput.value || "").trim(),
        last: String(lastInput.value || "").trim()
    };
    firstInput.value = name.first;
    triggerEvents(firstInput);

    lastInput.value = name.last;
    triggerEvents(lastInput);

    window.__frt7_last_auto_name = {
        first: firstInput.value,
        last: lastInput.value
    };

    if (options.auto) {
        pendingAutoNameLearning = {
            proposed: { first: firstInput.value, last: lastInput.value },
            original: originalBeforeAuto,
            reverted: false
        };
    }

    traceAuto("WRITTEN", `first=${JSON.stringify(firstInput.value)} last=${JSON.stringify(lastInput.value)}`);
    return true;
}

// v251 RENDERED-NAME REFINEMENT:
// txtResumeRaw can lose meaningful surname formatting/characters that still exist in
// the rendered resume iframe (for example "Del Mar" -> "Delmar" or "Treviño" ->
// "Trevio"). This is deliberately a narrow Name-only refinement: it reads only the
// rendered iframe header, respects Revert/manual-name locks, and never changes any
// Email/Phone/City/State/ZIP logic.
let frt7RenderedNameRefineToken = 0;
function scheduleRenderedNameRefinement() {
    const token = ++frt7RenderedNameRefineToken;
    const delays = [120, 450, 900, 1600];

    const foldTypography = value => normalizeUnicode(String(value || ""))
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[’]/g, "'")
        .replace(/[^A-Za-z'\-]+/g, "")
        .toLowerCase();

    const tryRenderedRepair = () => {
        if (token !== frt7RenderedNameRefineToken) return true;
        if (window.__frt7_name_reverted === true) return true;

        const firstInput = document.querySelector("#txtFirstNameDataEntry") || document.querySelector("#txtFirstName");
        const lastInput = document.querySelector("#txtLastNameDataEntry") || document.querySelector("#txtLastName");
        if (!firstInput || !lastInput) return false;
        if (isNameManuallyLocked(firstInput, lastInput)) return true;

        let renderedName = null;
        try {
            const iframe = document.querySelector("#divResumeContainer iframe");
            const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
            if (!doc) return false;

            // First prefer the existing explicit-heading parser. If the name and
            // phone share one rendered line, fall back to the existing top-header
            // extractor, which stops at contact data and preserves surname prefixes.
            renderedName = getExplicitResumeNameHeading();
            if (!renderedName?.first || !renderedName?.last) {
                const renderedText = doc.querySelector(".Section1")?.innerText || doc.body?.innerText || "";
                renderedName = extractNameFromTop(renderedText);
            }
        } catch (_) {
            return false;
        }

        if (!renderedName?.first || !renderedName?.last) return false;
        // v438: delayed iframe writes must obey the same rejected-name rules
        // as the main Name button. This prevents blocked job-title surnames.
        if (isRejectedAutoName(renderedName)) {
            console.info("Toolbar NAME v438: blocked rejected delayed iframe candidate.");
            return true;
        }
        if (!isAutoNameConfirmed(renderedName)) return true;

        const currentFirst = String(firstInput.value || "").trim();
        const currentLast = String(lastInput.value || "").trim();
        const proposedFirst = normalizeContactDisplayCase(renderedName.first);
        const proposedLast = applyLearnedMacLastNameCase(enforceSingleLastName(renderedName.last));
        const firstWouldChange = currentFirst !== proposedFirst;
        const lastWouldChange = currentLast !== proposedLast;
        // v321: The delayed iframe refinement also writes directly to fields.
        // Never replace a complete surname with a middle initial.
        if (/^[A-Za-z]\.?$/.test(proposedLast) &&
            currentLast.replace(/[^A-Za-z]/g, "").length > 1) {
            console.info(`Toolbar NAME v321: blocked delayed middle-initial surname "${proposedLast}".`);
            return true;
        }

        if (!firstWouldChange && !lastWouldChange) return true;

        // v265 RENDERED-REFINEMENT TRUNCATION GUARD:
        // This delayed iframe repair path writes directly to the fields and therefore
        // bypasses fillNameFields() and its Auto guards. Never let it shorten an
        // already-complete Last Name to a strict prefix when First Name is unchanged.
        // Examples: Stephanie Fields -> Stephanie Fi; Charlotte Vue -> Charlotte Ue.
        // Broken Word/HTML table cells can separate the start of a surname from its end.
        const currentLastFoldForTruncation = foldTypography(currentLast);
        const proposedLastFoldForTruncation = foldTypography(proposedLast);
        const sameFirstForTruncation = foldTypography(currentFirst) === foldTypography(proposedFirst);
        // v448: A previously incorrect joined surname is not protected from
        // correction back to the independently verified rendered heading.
        const verifiedHeadingForRestore = getExplicitResumeNameHeading();
        const verifiedRestore = verifiedHeadingForRestore &&
            foldTypography(verifiedHeadingForRestore.first) === foldTypography(proposedFirst) &&
            foldTypography(verifiedHeadingForRestore.last) === foldTypography(proposedLast);
        if (
            sameFirstForTruncation &&
            !verifiedRestore &&
            currentLastFoldForTruncation.length >= 3 &&
            proposedLastFoldForTruncation.length >= 1 &&
            proposedLastFoldForTruncation.length < currentLastFoldForTruncation.length &&
            (currentLastFoldForTruncation.startsWith(proposedLastFoldForTruncation) ||
             currentLastFoldForTruncation.endsWith(proposedLastFoldForTruncation))
        ) {
            console.info(
                `Toolbar NAME v265: blocked delayed rendered-name truncation ` +
                `"${currentLast}" -> "${proposedLast}".`
            );
            return true;
        }

        // Keep the existing both-fields safety. The only extra BOTH-field allowance
        // here is when the iframe is restoring typography/Unicode/spacing to the same
        // underlying names (Jose Nunez -> José Núñez, Delmar -> Del Mar, etc.).
        if (firstWouldChange && lastWouldChange) {
            const sameUnderlyingFirst = foldTypography(currentFirst) === foldTypography(proposedFirst);
            const sameUnderlyingLast = foldTypography(currentLast) === foldTypography(proposedLast);
            if (!sameUnderlyingFirst || !sameUnderlyingLast) return true;
        }

        if (firstWouldChange) {
            firstInput.value = proposedFirst;
            triggerEvents(firstInput);
        }
        if (lastWouldChange) {
            lastInput.value = proposedLast;
            triggerEvents(lastInput);
        }

        window.__frt7_last_auto_name = { first: firstInput.value, last: lastInput.value };
        console.info(`Toolbar NAME v251: restored rendered iframe name -> ${firstInput.value} / ${lastInput.value}.`);
        showNameChangedToast();
        return true;
    };

    delays.forEach(delay => setTimeout(() => {
        if (token !== frt7RenderedNameRefineToken) return;
        tryRenderedRepair();
    }, delay));
}

function fillNameFieldsWithLoadRetries() {
    // v178 ONE-SHOT NAME:
    // Legacy helper retained for compatibility, but it now performs ONE attempt only.
    // No 250/600/1100/1800/2000 ms retries and no iframe-load retry.
    if (window.__frt7_name_reverted) return;
    if (!getResumeText().trim()) return;
    fillNameFields({ auto: true });
}

    // v281 HARD REFERENCE-EMAIL EXCLUSION:
    // A reference's email must never become the applicant's email.
    function frt7IsReferenceEmailAt(sourceText, emailIndex) {
        const source = String(sourceText || "");
        if (!source || !Number.isFinite(emailIndex) || emailIndex < 0) return false;

        const before = source.slice(0, emailIndex);
        const compact = before.slice(Math.max(0, before.length - 320)).replace(/\s+/g, " ");

        // Inline forms such as "Reference: Jane Doe ... jane@email.com".
        if (/\b(?:professional\s+|personal\s+|employment\s+)?references?\b[^@\n]{0,280}$/i.test(compact)) {
            return true;
        }

        // REFERENCES section: remains reference-only until another major resume
        // section heading begins.
        const upper = before.toUpperCase();
        const refs = [...upper.matchAll(/\bREFERENCES?\b/g)];
        if (!refs.length) return false;
        const lastRef = refs[refs.length - 1].index ?? -1;

        const headingRe = /\b(?:EXPERIENCE|WORK\s+HISTORY|EMPLOYMENT|EDUCATION|ACADEMIC|SKILLS|CERTIFICATIONS?|LICENSES?|PROJECTS?|AWARDS?|LANGUAGES?|SUMMARY|OBJECTIVE|PROFILE)\b/g;
        const headings = [...upper.matchAll(headingRe)];
        const lastHeading = headings.length ? (headings[headings.length - 1].index ?? -1) : -1;

        return lastRef > lastHeading;
    }

    // v327: Never treat any portion of the CONTACT PHONE as an email prefix.
    // Only remove a prefix when the remaining address is a complete email.
    function frt7RemoveContactPhoneFromEmail(candidate) {
        const original = String(candidate || "").trim();
        const at = original.indexOf("@");
        if (at < 1) return original;
        let digits = String(document.querySelector("#txtPhoneDataEntry")?.value ||
            document.querySelector("#txtPhone")?.value || "").replace(/\D/g, "");
        if (digits.length === 11 && digits[0] === "1") digits = digits.slice(1);
        if (digits.length !== 10 || !isUsableTenDigitPhone(digits)) return original;
        const local = original.slice(0, at);
        // All possible phone tails (including 478-8360, 8360 and 915-478-8360).
        for (let start = 0; start <= 6; start++) {
            const tail = digits.slice(start);
            const pattern = new RegExp("^[\\s()./-]*" + tail.split("").join("[\\s()./-]*") + "[\\s()./-]*", "i");
            const hit = local.match(pattern);
            if (!hit) continue;
            const remainder = local.slice(hit[0].length);
            if (/^[a-z][a-z0-9._%+-]*$/i.test(remainder)) {
                const repaired = remainder + original.slice(at);
                if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,24}$/i.test(repaired)) {
                    console.info(`Toolbar EMAIL v327: removed contact-phone prefix from email: "${original}" -> "${repaired}".`);
                    return repaired;
                }
            }
        }
        return original;
    }

    function extractEmail(text) {
        if (!text) return null;

        // v258 BROKEN KNOWN-PROVIDER WHITESPACE REPAIR:
        // Resume text occasionally inserts whitespace inside a well-known email
        // provider domain, e.g. moorebball2010@yah oo.com. Repair ONLY the domain
        // portion of explicit known providers; never remove whitespace globally.
        // This makes the normal extractor see the address, while preserving the
        // existing OCR typo guard for genuinely uncertain provider spellings.
        let emailSource = String(text);
        const brokenKnownProviders = [
            "gmail", "googlemail", "yahoo", "ymail", "outlook", "hotmail", "live",
            "msn", "aol", "icloud", "appleid", "windstream"
        ];
        for (const provider of brokenKnownProviders) {
            const spacedProvider = provider.split("").join("\\s*");
            const tld = provider === "windstream" ? "net" : "com";
            const spacedTld = tld.split("").join("\\s*");
            const brokenDomainRe = new RegExp(
                "(@\\s*)" + spacedProvider + "\\s*\\.\\s*" + spacedTld + "(?![A-Z0-9.-])",
                "ig"
            );
            emailSource = emailSource.replace(brokenDomainRe, (_, atPart) =>
                String(atPart || "@").replace(/\s+/g, "") + provider + "." + tld
            );
        }

        // v281: Search in document order, but permanently reject reference emails.
        // If the first email belongs to a reference, continue to the next candidate.
        const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/ig;
        let m = null;
        for (const candidate of emailSource.matchAll(re)) {
            const idx = Number.isInteger(candidate.index) ? candidate.index : -1;
            if (frt7IsReferenceEmailAt(emailSource, idx)) {
                console.info(`Toolbar EMAIL v281: ignored reference email "${candidate[0]}".`);
                continue;
            }
            m = candidate;
            break;
        }

        // Apply the same reference exclusion to the truncated-known-provider fallback.
        if (!m) {
            const truncatedKnownProvider = /[A-Z0-9._%+-]+@(?:gmail|googlemail|yahoo|ymail|outlook|hotmail|live|msn|aol|icloud|appleid)(?:\.co)?(?=$|[^A-Z0-9.-])/ig;
            for (const candidate of String(text).matchAll(truncatedKnownProvider)) {
                const idx = Number.isInteger(candidate.index) ? candidate.index : -1;
                if (frt7IsReferenceEmailAt(String(text), idx)) {
                    console.info(`Toolbar EMAIL v281: ignored truncated reference email "${candidate[0]}".`);
                    continue;
                }
                m = candidate;
                break;
            }
        }
        if (!m) return null;

        let email = m[0];

        // v197.5 SMOOSHED STATE -> EMAIL DEGLUE:
        // A flattened contact line can look like:
        //   "ProfessionalTacoma, WAmandy.anderson1114@gmail.com"
        // The broad email regex legally starts at "WAmandy...", so the state leaks into
        // the email username. Strip those two letters ONLY when all of this is proven:
        //   - the source itself has an uppercase 2-letter U.S. state at match start;
        //   - that state is immediately after a comma in the header;
        //   - a real U.S. city for that exact state ends immediately before the comma.
        // This leaves ordinary usernames that happen to begin with "wa", "in", etc. alone.
        const sourceForStateLead = emailSource;
        const rawEmailMatch = String(m[0] || "");
        const rawEmailIndex = Number.isInteger(m.index) ? m.index : sourceForStateLead.indexOf(rawEmailMatch);
        const possibleStateLead = rawEmailMatch.slice(0, 2);
        const isKnownStateLead =
            /^[A-Z]{2}$/.test(possibleStateLead) &&
            Object.values(STATE_MAP).includes(possibleStateLead);
        if (
            isKnownStateLead &&
            rawEmailIndex >= 0 &&
            /^[A-Za-z]/.test(rawEmailMatch.slice(2, 3))
        ) {
            const beforeEmail = sourceForStateLead.slice(Math.max(0, rawEmailIndex - 140), rawEmailIndex);
            const commaBeforeState = /,\s*$/.test(beforeEmail);
            if (commaBeforeState) {
                const beforeComma = beforeEmail.replace(/,\s*$/, "");
                const cityProof = findUsCitySuffixBeforeState(beforeComma, possibleStateLead, false);
                if (cityProof) {
                    email = email.slice(2);
                    console.info(
                        `Toolbar EMAIL v197.5: removed glued state "${possibleStateLead}" ` +
                        `before email after proven ${cityProof.city}, ${possibleStateLead}.`
                    );
                }
            }
        }

        // v256 FLATTENED HEADER EMAIL DEGLUE:
        // Two additional flattened-header shapes can make the broad email regex
        // begin before the real username:
        //   53LawlorStWaterburyCT06708917-292-4015Quinasia110@icloud.com
        //   Glenford, OH 43739akfeyh@gmail.com
        // Repair ONLY when the junk is proven to be a phone immediately before an
        // alphabetic username, or a 5-digit ZIP immediately after a proven state.
        // This keeps ordinary numeric email usernames intact.
        {
            const source = sourceForStateLead;
            const at = email.lastIndexOf("@");
            if (at > 0 && rawEmailIndex >= 0) {
                let local = email.slice(0, at);
                const domain = email.slice(at);

                // If a complete phone occurs anywhere inside the matched local-part
                // and is immediately followed by an alphabetic username, everything
                // through that phone belongs to the flattened contact header.
                const phoneInside = /(?:\+?1[\s().\/-]*)?\d{3}[\s().\/-]*\d{3}[\s().\/-]*\d{4}(?=[A-Za-z][A-Za-z0-9._%+-]*$)/g;
                let phoneHit = null;
                let pm;
                while ((pm = phoneInside.exec(local))) phoneHit = pm;
                if (phoneHit) {
                    const afterPhone = local.slice(phoneHit.index + phoneHit[0].length);
                    if (/^[A-Za-z][A-Za-z0-9._%+-]*$/.test(afterPhone)) {
                        local = afterPhone;
                    }
                }

                // A ZIP may be glued directly to the real username. Strip it only
                // when those exact five digits are immediately preceded in the
                // source by a recognized two-letter U.S. state (allowing separators).
                const zipLead = local.match(/^(\d{5})(?=[A-Za-z])/);
                if (zipLead) {
                    const zipStartInSource = rawEmailIndex + (email.slice(0, at).length - local.length);
                    const beforeZip = source.slice(Math.max(0, zipStartInSource - 12), zipStartInSource);
                    const stateBeforeZip = beforeZip.match(/(?:^|[^A-Za-z])([A-Z]{2})[\s,|:\-]*$/);
                    const provenState = stateBeforeZip && Object.values(STATE_MAP).includes(stateBeforeZip[1]);
                    const currentZip = String(document.getElementById("txtZipDataEntry")?.value || "").replace(/\D/g, "").slice(0, 5);
                    if (provenState || (currentZip && currentZip === zipLead[1])) {
                        local = local.slice(5);
                    }
                }

                email = local + domain;
            }
        }

        // v109 FLATTENED CONTACT DEGLUE:
        // Some resumes lose every separator between ZIP, phone, and email:
        //   "AZ 85140602.781.1163amy.sester2013@gmail.com"
        // The broad email regex then legally starts at "85140602.781.1163amy...".
        // If the matched local-part begins with a complete phone immediately
        // followed by the real alphabetic email username, peel the phone off.
        // Also tolerate a 5-digit ZIP glued immediately in front of that phone.
        email = email.replace(
            /^(?:\d{5})?(?:1[-.]?)?\d{3}[-.]\d{3}[-.]\d{4}(?=[A-Z])/i,
            ""
        );

        // Preserve the older cleanup variants too.
        email = email.replace(
            /^(?:1[-.]?)?(?:\d{3}[-.]\d{3}[-.]\d{4})(?=[A-Z])/i,
            ""
        );
        email = email.replace(/^\d{10}(?=[A-Z])/i, "");
        email = email.replace(/^\d{3}[-.]\d{4}(?=[A-Z])/i, "");

        // v197.3 NARROW PHONE-TAIL EMAIL DEGLUE:
        // Only strip a numeric lead when it is provably the tail of a real phone
        // number in THIS SAME source text and removing it leaves an alphabetic
        // username. This does not alter normal numeric email usernames.
        const sourceForPhoneLead = String(text || "").slice(0, 2200);
        const phoneTailFragments = new Set();
        const phoneLeadRe = /(?:\+?1[\s().\/\-]*)?(\d{3})[\s().\/\-]*(\d{3})[\s().\/\-]*(\d{4})(?!\d)/g;
        let phoneLeadMatch;
        while ((phoneLeadMatch = phoneLeadRe.exec(sourceForPhoneLead))) {
            const digits = `${phoneLeadMatch[1]}${phoneLeadMatch[2]}${phoneLeadMatch[3]}`;
            phoneTailFragments.add(digits);
            phoneTailFragments.add(digits.slice(-7));
            phoneTailFragments.add(digits.slice(-4));
        }
        for (const frag of [...phoneTailFragments].sort((a, b) => b.length - a.length)) {
            if (email.startsWith(frag) && /^[A-Za-z]/.test(email.slice(frag.length))) {
                email = email.slice(frag.length);
                break;
            }

            // v205 PHONE-TAIL EMAIL DEGLUE WITH PUNCTUATION:
            // A flattened header can make the broad email matcher begin in the
            // middle of the phone, e.g.
            //   (804)-246-9666gainesj402@gmail.com
            // becomes
            //   -246-9666gainesj402@gmail.com
            // Match ONLY a decorated form of a phone tail already proven to come
            // from a real phone number in this same resume. This keeps legitimate
            // numeric email usernames untouched.
            const decoratedFrag = frag
                .split("")
                .map(d => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
                .join("[\\s()./\\-]*");
            const decoratedLead = new RegExp(
                "^[\\s()./\\-]*" + decoratedFrag + "(?=[A-Za-z])",
                "i"
            );
            const decoratedMatch = email.match(decoratedLead);
            if (decoratedMatch) {
                email = email.slice(decoratedMatch[0].length);
                break;
            }
        }

        return sanitizeEmail(frt7RemoveContactPhoneFromEmail(email));
    }

    // v197.3: identify ONLY the specific bad-prefill shape where WallStJobs has
    // prepended the tail of the candidate's phone to the otherwise-correct resume
    // email. This lets Auto bypass a false manual lock without weakening real edits.
    function isPhoneLeadContaminatedCurrentEmail(currentEmail) {
        const current = String(currentEmail || "").trim().toLowerCase();
        const at = current.lastIndexOf("@");
        if (at <= 0) return false;

        const raw = String(document.getElementById("txtResumeRaw")?.value || getResumeText() || "");
        const expected = String(extractEmail(raw) || "").trim().toLowerCase();
        if (!expected || expected === current) return false;

        const local = current.slice(0, at);
        const fragments = [];

        const addPhone = rawPhone => {
            let digits = String(rawPhone || "").replace(/\D/g, "");
            if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
            if (digits.length !== 10) return;
            fragments.push(digits, digits.slice(-7), digits.slice(-4));
        };

        addPhone(
            document.querySelector("#txtPhoneDataEntry")?.value ||
            document.querySelector("#txtPhone")?.value ||
            ""
        );

        const header = raw.slice(0, 2200);
        const phoneRe = /(?:\+?1[\s().\/\-]*)?(\d{3})[\s().\/\-]*(\d{3})[\s().\/\-]*(\d{4})(?!\d)/g;
        let pm;
        while ((pm = phoneRe.exec(header))) addPhone(`${pm[1]}${pm[2]}${pm[3]}`);

        for (const frag of [...new Set(fragments)].sort((a, b) => b.length - a.length)) {
            if (!frag || !local.startsWith(frag)) continue;
            const candidate = current.slice(frag.length);
            if (/^[a-z]/i.test(candidate) && candidate === expected) return true;
        }
        return false;
    }

    // v77: Some user-facing popup controls change #txtEmail programmatically, so
    // their input/change events are not browser-trusted. Track our OWN Email writes
    // separately; any other Email input/change event can safely count as a manual
    // correction for the current applicant.
    let frt7InternalEmailWriteDepth = 0;

    // v289 AUTO EMAIL / MANUAL-LOCK SEPARATION:
    // During Auto Email's short stick-verification window, WallStJobs can repaint
    // #txtEmail and emit synthetic input/change events. v77 used to mistake that
    // repaint for a popup/manual override, lock Email, and cancel Auto. Keep an
    // applicant-scoped Auto-owned settle marker so only those synthetic events are
    // ignored. Trusted typing/paste/cut still creates the normal manual lock.
    let frt7AutoEmailSettleKey = "";
    let frt7AutoEmailSettleUntil = 0;

    function frt7BeginAutoEmailSettle(key, ms = 2600) {
        frt7AutoEmailSettleKey = String(key || "");
        frt7AutoEmailSettleUntil = Date.now() + Math.max(250, Number(ms) || 2600);
    }

    function frt7EndAutoEmailSettle(key = "") {
        if (!key || frt7AutoEmailSettleKey === String(key)) {
            frt7AutoEmailSettleKey = "";
            frt7AutoEmailSettleUntil = 0;
        }
    }

    function frt7IsAutoEmailSettling() {
        const key = getManualContactApplicantKey();
        return Boolean(
            key &&
            frt7AutoEmailSettleKey === key &&
            Date.now() <= frt7AutoEmailSettleUntil
        );
    }

    function runInternalEmailWrite(fn) {
        frt7InternalEmailWriteDepth++;
        try {
            return fn();
        } finally {
            frt7InternalEmailWriteDepth = Math.max(0, frt7InternalEmailWriteDepth - 1);
        }
    }

    function cleanExistingEmailField(emailInput) {
        if (!emailInput) return false;
        const current = String(emailInput.value || "").trim();
        const cleaned = sanitizeEmail(current);
        if (cleaned && cleaned !== current) {
            runInternalEmailWrite(() => {
                emailInput.value = cleaned;
                triggerEvents(emailInput);
            });
            return true;
        }
        return false;
    }

    function emailDomain(email) {
        const clean = String(email || "").trim().toLowerCase();
        const at = clean.lastIndexOf("@");
        return at >= 0 ? clean.slice(at + 1) : "";
    }

    function isAzulmailEmail(email) {
        const domain = emailDomain(email);
        return domain === "azulmail.net" || domain.endsWith(".azulmail.net");
    }

    // v196 INDEED RELAY OVERRIDE:
    // If WallStJobs currently contains an Indeed relay address, the actual email
    // found in the resume is authoritative. This intentionally overrides the
    // azulmail/.edu destination protection and the OCR no-touch guard for this
    // one source-address case. Shared by both Auto Email and the Email button.
    function isIndeedEmailRelay(email) {
        const domain = emailDomain(email);
        return domain === "indeedemail.com" || domain.endsWith(".indeedemail.com");
    }

    function isProtectedEmailDestination(email) {
        const domain = emailDomain(email);
        return domain === "azulmail.net" ||
               domain.endsWith(".azulmail.net") ||
               domain === "edu" ||
               domain.endsWith(".edu");
    }

    function shouldBlockProtectedEmailChange(currentEmail, proposedEmail) {
        const current = String(currentEmail || "").trim().toLowerCase();
        const proposed = String(proposedEmail || "").trim().toLowerCase();

        // If nothing would change, there is nothing to block.
        if (current && current === proposed) return false;

        // v196: An Indeed relay in the contact field is disposable. Always allow
        // the real resume email to replace it, including azulmail.net and .edu.
        if (isIndeedEmailRelay(current)) return false;

        // Otherwise preserve the existing protected-destination rule.
        return isProtectedEmailDestination(proposed) && !isAzulmailEmail(current);
    }

    function frt7ResumeEmailForContact() {
        const rawEmail = extractEmail(getResumeText());
        if (rawEmail) return rawEmail;
        // Rare site failure: the rendered resume has a contact address, but
        // txtResumeRaw does not. Limit fallback to the visible contact header.
        return extractEmail(getIframeResumeTextForRareFallback().slice(0, 1800));
    }

    // v403 PDF hyperlink gap status/repair for FBSPL, Indeed Posting Responses, and Indeed TTT.
    function frt7IsFbsplSource() {
        // v412: identify the applicant source from its labeled page metadata,
        // including input/select values and label/value layouts. Never infer
        // source from resume prose, or enable repair for Career Builder.
        const allowed = /^(?:FBSPL|Indeed\s+Posting\s+Responses|Indeed\s+TTT)$/i;
        const other = /^(?:Career\s+Builder|Resume\s+Library)$/i;
        const normalize = v => String(v || '').replace(/\s+/g, ' ').trim();
        const body = document.body;
        if (!body) return false;
        const page = normalize(body.innerText || '');
        const labelMatch = page.match(/\bSource\s*:?\s*(FBSPL|Indeed\s+Posting\s+Responses|Indeed\s+TTT|Career\s+Builder|Resume\s+Library)\b/i);
        if (labelMatch) return allowed.test(normalize(labelMatch[1]));
        for (const el of document.querySelectorAll('input, select, [data-source], [id*="source" i], [name*="source" i]')) {
            const key = normalize([el.id, el.name, el.getAttribute('data-source')].join(' '));
            if (!/source/i.test(key)) continue;
            const value = normalize(el.tagName === 'SELECT' ? el.selectedOptions?.[0]?.textContent || el.value : el.value || el.getAttribute('data-source') || el.textContent);
            if (allowed.test(value)) return true;
            if (other.test(value)) return false;
        }
        return false;
    }
    // v437: Isolate the PDF-converted contact-header email field BEFORE joining
    // any whitespace. The FBSPL template places the email after a phone/ZIP
    // field separated by a vertical bar. This prevents unrelated header words
    // (e.g. "Profile") from becoming part of a valid email.
    function frt7FbsplHeaderEmail() {
        const raw = String(getResumeText() || getIframeResumeTextForRareFallback() || "")
            .slice(0, 1200).replace(/[\u00a0\u2007\u202f]/g, " ");
        const stop = raw.search(/\b(?:Willing to relocate|Authorized to work|Work experience|Professional summary|Professional Summary|Education|Skills)\b/i);
        const header = stop >= 0 ? raw.slice(0, stop) : raw.slice(0, 400);
        const emailRe = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?:com|net|org|edu|gov)\b/i;
        // A vertical bar marks a true field boundary in these PDF headers.
        // Do not join across bars or across a run of 2+ spaces.
        for (const field of header.split('|').slice(1)) {
            if (!emailRe.test(field)) continue;
            const chunks = field.split(/\s{2,}/).map(x => x.trim()).filter(Boolean);
            for (const chunk of chunks) {
                const hit = emailRe.exec(chunk);
                if (!hit) continue;
                const at = chunk.indexOf('@', hit.index);
                const before = chunk.slice(0, at);
                const local = before.match(/^\s*([A-Z0-9._%+-]+(?: [A-Z0-9._%+-]+)?)$/i);
                if (!local) continue;
                // Exactly one whitespace gap inside the isolated header field
                // may be a PDF conversion artifact. A separate word before an
                // already intact email is not proof; only join if the fragment
                // has no ordinary word boundary outside this field.
                const candidate = sanitizeEmail((local[1].replace(/ /g, '') + chunk.slice(at, hit.index + hit[0].length)).toLowerCase());
                if (/^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|net|org|edu|gov)$/i.test(candidate) &&
                    !isObviousOcrEmailDomainIssue(candidate)) return candidate;
            }
        }
        return null;
    }
    // v439: When no pipe-delimited email field exists, NEVER join separate
    // whitespace tokens. Accept only an intact, token-bounded resume email.
    // This protects "Julie Yale    C-JServices@Juno.com" from becoming
    // "yalec-jservices@juno.com" via the legacy v401 fallback.
    // v440: Exact, token-bounded known-provider .comm typo in the resume header.
    // Never use partial .com matching, whitespace joining, or unknown domains.
    function frt7KnownCommHeaderEmails() {
        const raw = String(getResumeText() || getIframeResumeTextForRareFallback() || '').slice(0, 650);
        const found = new Set();
        const re = /(^|[^A-Z0-9._%+\-@])([A-Z0-9._%+\-]+)@(gmail|googlemail|yahoo|ymail|outlook|hotmail|live|msn|aol|icloud|appleid)\.comm(?=$|[^A-Z0-9.-])/gi;
        for (const match of raw.matchAll(re)) {
            found.add((match[2] + '@' + match[3] + '.com').toLowerCase());
        }
        return [...found];
    }
    // v443: Repair a single PDF conversion gap inside a KNOWN provider domain.
    // Only a complete, bounded email in the contact header; never join local-part
    // words, phone numbers, ZIPs, or unknown domains.
    function frt7FbsplKnownDomainGapEmail() {
        const raw = String(getResumeText() || getIframeResumeTextForRareFallback() || '')
            .slice(0, 1000).replace(/[\u00a0\u2007\u202f]/g, ' ');
        const stop = raw.search(/\b(?:Willing to relocate|Work authorization|Work experience|Professional summary|Education|Skills|Areas of expertise)\b/i);
        const header = stop >= 0 ? raw.slice(0, stop) : raw.slice(0, 450);
        const providers = new Set(['gmail.com','googlemail.com','yahoo.com','ymail.com','outlook.com','hotmail.com','icloud.com','aol.com','live.com','msn.com']);
        const found = new Set();
        const re = /(^|[^A-Z0-9._%+\-@])([A-Z0-9._%+\-]+)@([A-Z0-9]+) ([A-Z0-9]+\.com)(?=$|[^A-Z0-9.-])/gi;
        for (const hit of header.matchAll(re)) {
            const domain = (hit[3] + hit[4]).toLowerCase();
            if (!providers.has(domain)) continue;
            const candidate = sanitizeEmail(hit[2] + '@' + domain);
            if (!isObviousOcrEmailDomainIssue(candidate)) found.add(candidate);
        }
        return found.size === 1 ? [...found][0] : null;
    }
    // v441: Name-anchored repair of ONE internal space in an unstructured
    // contact header. Unlike the old recovery, this never prepends an arbitrary
    // word to a complete email. Require a long fragment beginning with the
    // applicant's first name AND continuing into a surname, plus an email
    // immediately after a SINGLE space. Never cross two spaces or a section.
    function frt7FbsplNameAnchoredGapEmail() {
        const raw = String(getResumeText() || getIframeResumeTextForRareFallback() || '')
            .slice(0, 650).replace(/[\u00a0\u2007\u202f]/g, ' ');
        const stop = raw.search(/\b(?:Willing to relocate|Work authorization|Work experience|Professional summary|Education|Skills|Areas of expertise)\b/i);
        const header = stop >= 0 ? raw.slice(0, stop) : raw.slice(0, 350);
        const nameMatch = header.match(/^\s*([A-Za-z][A-Za-z'’-]+)\s+([A-Za-z][A-Za-z'’-]+)(?:\s+([A-Za-z][A-Za-z'’-]+))?/);
        if (!nameMatch) return null;
        const first = nameMatch[1].toLowerCase().replace(/[^a-z]/g, '');
        const surnames = [nameMatch[2], nameMatch[3]].filter(Boolean)
            .map(v => v.toLowerCase().replace(/[^a-z]/g, ''));
        const found = new Set();
        const re = /(^|[^A-Z0-9._%+\-@])([A-Z0-9._%+\-]{5,}) ([A-Z0-9._%+\-]+)@([A-Z0-9.-]+\.(?:com|net|org|edu|gov))(?=$|[^A-Z0-9.-])/gi;
        for (const match of header.matchAll(re)) {
            const left = match[2].toLowerCase();
            const right = match[3].toLowerCase();
            // Prefix must include the full first name and at least two letters
            // from a surname; this excludes 'Yale C-JServices' and 'Profile jvelas2'.
            if (!left.startsWith(first) || left.length < first.length + 2) continue;
            const tail = left.slice(first.length);
            if (!surnames.some(s => s.startsWith(tail) && tail.length >= 2)) continue;
            const candidate = sanitizeEmail(left + right + '@' + match[4]);
            if (!isObviousOcrEmailDomainIssue(candidate)) found.add(candidate);
        }
        return found.size === 1 ? [...found][0] : null;
    }
    // v442: Exact-contact corroboration for ONE conversion gap in the contact
    // header. This is a confirmation, not permission to join arbitrary words:
    // never cross 2+ spaces, never use a full name token as the prefix, and
    // require the joined result to equal the complete existing contact email.
    // v444: Join a single space only when the fragment immediately before an
    // otherwise valid email completes the applicant's EXACT first/last name
    // together with the beginning of the email local part. Never prepend a
    // separate full name (John john45@...) or cross a double-space boundary.
    function frt7FbsplSplitNameEmail() {
        const raw = String(getResumeText() || getIframeResumeTextForRareFallback() || '')
            .slice(0, 900).replace(/[\u00a0\u2007\u202f]/g, ' ');
        const stop = raw.search(/\b(?:Willing to relocate|Work authorization|Work experience|Professional summary|Education|Skills|Areas of expertise)\b/i);
        const header = stop >= 0 ? raw.slice(0, stop) : raw.slice(0, 450);
        const first = String(document.getElementById('txtFirstNameDataEntry')?.value || document.getElementById('txtFirstName')?.value || '').trim().toLowerCase();
        const last = String(document.getElementById('txtLastNameDataEntry')?.value || document.getElementById('txtLastName')?.value || '').trim().toLowerCase();
        const names = [first, last].filter(n => /^[a-z]{3,}$/.test(n));
        const found = new Set();
        const re = /(^|[^A-Z0-9._%+\-@])([A-Z]{2,}) ([A-Z0-9._%+\-]+)@([A-Z0-9.-]+\.(?:com|net|org|edu|gov))(?=$|[^A-Z0-9.-])/gi;
        for (const hit of header.matchAll(re)) {
            const left = hit[2].toLowerCase();
            const right = hit[3].toLowerCase();
            // The gap must be WITHIN the name, not after a whole name.
            if (!names.some(name => left.length < name.length && name.startsWith(left) && right.startsWith(name.slice(left.length)))) continue;
            const candidate = sanitizeEmail(hit[2] + hit[3] + '@' + hit[4]);
            if (!isObviousOcrEmailDomainIssue(candidate)) found.add(candidate);
        }
        return found.size === 1 ? [...found][0] : null;
    }
    function frt7FbsplContactConfirmedGapEmail(existingEmail) {
        const existing = sanitizeEmail(String(existingEmail || '').trim());
        if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.(?:com|net|org|edu|gov)$/i.test(existing) ||
            isObviousOcrEmailDomainIssue(existing)) return null;
        const raw = String(getResumeText() || getIframeResumeTextForRareFallback() || '')
            .slice(0, 650).replace(/[\u00a0\u2007\u202f]/g, ' ');
        const stop = raw.search(/\b(?:Willing to relocate|Work authorization|Work experience|Professional summary|Education|Skills|Areas of expertise)\b/i);
        const header = stop >= 0 ? raw.slice(0, stop) : raw.slice(0, 350);
        const name = header.match(/^\s*([A-Za-z][A-Za-z'’-]+)\s+([A-Za-z][A-Za-z'’-]+)(?:\s+([A-Za-z][A-Za-z'’-]+))?/);
        if (!name) return null;
        const nameWords = new Set(name.slice(1).filter(Boolean).map(x => x.toLowerCase()));
        const pattern = /(^|[^A-Z0-9._%+\-@])([A-Z0-9._%+\-]{2,}) ([A-Z0-9._%+\-]+)@([A-Z0-9.-]+\.(?:com|net|org|edu|gov))(?=$|[^A-Z0-9.-])/gi;
        for (const hit of header.matchAll(pattern)) {
            const left = hit[2].toLowerCase();
            if (nameWords.has(left) || /^\d{5}(?:-\d{4})?$/.test(left)) continue;
            const candidate = sanitizeEmail(hit[2] + hit[3] + '@' + hit[4]);
            if (candidate === existing) return existing;
        }
        return null;
    }
    function frt7FbsplUnstructuredIntactEmails() {
        const raw = String(getResumeText() || getIframeResumeTextForRareFallback() || "").slice(0, 2200);
        const found = new Set();
        const re = /(^|[^A-Z0-9._%+\-@])([A-Z0-9._%+\-]+@[A-Z0-9.-]+\.(?:com|net|org|edu|gov))(?=$|[^A-Z0-9.-])/gi;
        for (const match of raw.matchAll(re)) {
            const candidate = sanitizeEmail(match[2]);
            if (!isObviousOcrEmailDomainIssue(candidate)) found.add(candidate);
        }
        return [...found];
    }
    function frt7FbsplBrokenEmail() {
        // v401: safe boundary extraction applies to EVERY source.
        const raw = String(getResumeText() || getIframeResumeTextForRareFallback() || "").slice(0, 2200)
            .replace(/[\u00a0\u2007\u202f]/g, " ");
        const results = new Set();
        // Limit candidate extraction to an explicit, complete domain ending.
        // This prevents a following applicant name being glued to .com.
        const ending = /\.(?:com|net|org|edu|gov)/ig;
        for (const end of raw.matchAll(ending)) {
            const stop = end.index + end[0].length;
            const at = raw.lastIndexOf('@', end.index);
            if (at < 0 || stop - at > 90) continue;
            const left = raw.slice(Math.max(0, at - 100), at);
            // Take only the local-part run and at most one internal gap.
            // Do not absorb a preceding standalone phone or unrelated word.
            const localMatch = left.match(/([A-Z0-9._%+-]+(?:\s+[A-Z0-9._%+-]+)?)$/i);
            if (!localMatch) continue;
            let local = localMatch[1].replace(/\s+/g, '');
            // v410: A ZIP in a flattened contact header is not part of the email.
            // Require the exact ZIP in the contact field AND an explicit whitespace
            // boundary in the resume; never strip digits actually joined to an email.
            const contactZip = String(document.getElementById('txtZipDataEntry')?.value || '').trim();
            if (/^\d{5}(?:-\d{4})?$/.test(contactZip)) {
                const zipBase = contactZip.slice(0, 5);
                const localWithGap = localMatch[1];
                const zipLead = new RegExp('^' + zipBase + '(?:-\\d{4})?\\s+([A-Z0-9._%+-]+)$', 'i');
                const zipHit = localWithGap.match(zipLead);
                if (zipHit && /^[A-Z]/i.test(zipHit[1])) {
                    console.info(`Toolbar EMAIL v410: excluded verified contact ZIP ${zipBase} before email.`);
                    local = zipHit[1];
                }
            }
            // v423: Remove a state+ZIP accidentally glued to the email username.
            // Require the exact contact state and ZIP and the matching state/ZIP
            // sequence immediately before the username in the resume. Never
            // strip a bare ZIP or state without this combined proof.
            const contactState = String(document.getElementById('txtStateDataEntry')?.value || '').trim().toUpperCase();
            const contactZip5 = String(document.getElementById('txtZipDataEntry')?.value || '').trim().match(/^(\d{5})(?:-\d{4})?$/)?.[1] || '';
            if (/^[A-Z]{2}$/.test(contactState) && contactZip5 && Object.values(STATE_MAP).includes(contactState)) {
                const gluedPrefix = contactState + contactZip5;
                if (local.toUpperCase().startsWith(gluedPrefix) &&
                    /^[A-Za-z][A-Za-z0-9._%+-]*$/.test(local.slice(gluedPrefix.length))) {
                    const sourceBeforeAt = raw.slice(Math.max(0, at - 120), at);
                    const escapedState = contactState;
                    const escapedZip = contactZip5;
                    const locationTail = new RegExp('(?:,\\s*' + escapedState + '\\s*' + escapedZip + '|\\b' + escapedState + '\\s+' + escapedZip + ')', 'i');
                    if (locationTail.test(sourceBeforeAt)) {
                        local = local.slice(gluedPrefix.length);
                        console.info(`Toolbar EMAIL v423: removed verified state+ZIP ${gluedPrefix} from email username.`);
                    }
                }
            }
            // Also handle "Omaha, NE 68116luz@...": the whitespace before
            // ZIP means the state is outside the captured email local-part.
            if (contactZip5 && contactState && local.startsWith(contactZip5) &&
                /^[A-Za-z][A-Za-z0-9._%+-]*$/.test(local.slice(5))) {
                const localStart = at - localMatch[1].length;
                const preceding = raw.slice(Math.max(0, localStart - 35), localStart);
                if (new RegExp('(?:,\\s*|\\b)' + contactState + '\\s+$', 'i').test(preceding)) {
                    local = local.slice(5);
                    console.info(`Toolbar EMAIL v423: removed verified ZIP ${contactZip5} following state ${contactState}.`);
                }
            }
            const domain = raw.slice(at + 1, stop).replace(/\s+/g, '');
            // v402: Strip a phone ONLY when it is a complete 10-digit number
            // immediately preceding the email local part. Handles 346-285-3838,
            // (346) 285-3838, and 6786879390 without removing email digits.
            // The number must be visible in the resume itself.
            const phonePrefix = local.match(/^(\(?[2-9]\d{2}\)?[-.]?[2-9]\d{2}[-.]?\d{4})([A-Z][A-Z0-9._%+-]*)$/i);
            if (phonePrefix) {
                const digits = phonePrefix[1].replace(/\D/g, '');
                if (isUsableTenDigitPhone(digits)) local = phonePrefix[2];
            }
            // If the phone was separated by whitespace, localMatch can include
            // both tokens. Strip the full leading phone, never partial digits.
            local = local.replace(/^(?:\(?[2-9]\d{2}\)?[-.]?[2-9]\d{2}[-.]?\d{4})\s+(?=[a-z])/i, '');
            // v407: A flattened phone immediately before the email may contribute
            // its LAST seven digits (e.g. 512-3391). Remove only when verified
            // against the applicant's complete contact phone AND resume context.
            const contactDigits = String(document.getElementById('txtPhoneDataEntry')?.value || document.getElementById('txtPhone')?.value || '').replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
            if (contactDigits.length === 10 && isUsableTenDigitPhone(contactDigits)) {
                const tail7 = contactDigits.slice(3);
                const prefix = `${tail7.slice(0,3)}-${tail7.slice(3)}`;
                if (local.toLowerCase().startsWith(prefix.toLowerCase()) && local.length > prefix.length && /^[a-z]/i.test(local.slice(prefix.length))) {
                    const beforeAt = raw.slice(Math.max(0, at - 120), at);
                    if (beforeAt.includes(contactDigits.slice(0,3)) || beforeAt.includes(tail7.slice(0,3))) {
                        console.info(`Toolbar EMAIL v407: removed verified phone tail ${prefix} from extracted email.`);
                        local = local.slice(prefix.length);
                    }
                }
            }
            // v408: A dash used as a separator before an email is never
            // part of the username. Preserve hyphens *inside* usernames.
            local = local.replace(/^-+/, '');
            // v408: Identify a phone tail from the resume itself, not solely
            // the contact phone field (which may initially be incorrect).
            // Example: "{954} 512-3391 Merriweatherjayla@gmail.com".
            // Only strip when a complete phone ending with this exact tail
            // occurs immediately before the extracted email in the header.
            const phoneTail = local.match(/^([2-9]\d{2})[-.]([0-9]{4})([a-z][a-z0-9._%+-]*)$/i);
            if (phoneTail) {
                const preceding = raw.slice(Math.max(0, at - 130), at);
                const tail = phoneTail[1] + phoneTail[2];
                const fullPhone = new RegExp('(?:^|[^0-9])([2-9]\\d{2})[\\s{}()./-]*' + phoneTail[1] + '[\\s()./-]*' + phoneTail[2] + '(?=\\s|[A-Za-z]|$)', 'i');
                const hit = preceding.match(fullPhone);
                if (hit && isUsableTenDigitPhone(hit[1] + tail)) {
                    console.info('Toolbar EMAIL v408: removed resume-verified phone tail before email.');
                    local = phoneTail[3];
                }
            }
            // v435: A PDF conversion can glue only the final four phone digits
            // to the following email (903-504-9010moms@... -> 9010moms@...).
            // Strip them ONLY with independent proof: the applicant's contact
            // phone matches a complete phone printed directly before the email
            // in the resume. Never strip numeric email prefixes on a mere match.
            if (contactDigits.length === 10 && isUsableTenDigitPhone(contactDigits)) {
                const last4 = contactDigits.slice(-4);
                if (local.startsWith(last4) && /^[A-Za-z][A-Za-z0-9._%+-]*$/.test(local.slice(4))) {
                    const localStart = at - localMatch[1].length;
                    const nearby = raw.slice(Math.max(0, localStart - 100), localStart);
                    const phoneRe = new RegExp('(?:^|[^0-9])' + contactDigits.slice(0,3) +
                        '[\\s()./-]*' + contactDigits.slice(3,6) + '[\\s()./-]*' +
                        last4 + '[\\s()./-]*$', 'i');
                    // A complete preceding phone with the final four digits
                    // already included in the local match is also valid proof.
                    const prefixRe = new RegExp('(?:^|[^0-9])' + contactDigits.slice(0,3) +
                        '[\\s()./-]*' + contactDigits.slice(3,6) + '[\\s()./-]*$');
                    if (phoneRe.test(nearby) || prefixRe.test(nearby)) {
                        console.info('Toolbar EMAIL v435: removed resume-verified final four phone digits from email.');
                        local = local.slice(4);
                    }
                }
            }
            const candidate = sanitizeEmail(`${local}@${domain}`.toLowerCase());
            if (!/^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|net|org|edu|gov)$/i.test(candidate)) continue;
            if (isObviousOcrEmailDomainIssue(candidate)) continue;
            results.add(candidate);
        }
        return [...results];
    }
    function frt7FbsplEmailStatus() {
        if (!frt7IsFbsplSource()) return;
        const input = document.getElementById('txtEmail');
        const status = document.getElementById('divCheckEmailStatus');
        if (!input || !status) return;
        const current = String(input.value || '').trim().toLowerCase();
        const headerEmail = frt7FbsplHeaderEmail();
        const candidates = headerEmail ? [headerEmail] : frt7FbsplUnstructuredIntactEmails();
        candidates.push(...frt7KnownCommHeaderEmails());
        // v412: for the three approved PDF-conversion sources only, confirm an
        // existing correct email even when the PDF inserted whitespace around @
        // or within the address. Never turn green based on a different email.
        const rawHeader = String(getResumeText() || getIframeResumeTextForRareFallback() || '').slice(0, 2200);
        const compact = rawHeader.replace(/[\s\u00a0\u2007\u202f]+/g, '').toLowerCase();
        if (!candidates.includes(current) && !(current.includes('@') && compact.includes(current))) return;
        const message = 'Email address found in resume.';
        if (status.textContent !== message) status.textContent = message;
        if (status.style.color !== 'rgb(0, 170, 0)') status.style.color = 'rgb(0, 170, 0)';
    }
    // Observe only the existing site's status text, not the whole page.
    let frt7FbsplStatusObserver = null;
    function frt7FbsplWatchStatus() {
        if (!frt7IsFbsplSource()) return;
        const status = document.getElementById('divCheckEmailStatus');
        if (!status || frt7FbsplStatusObserver) return;
        frt7FbsplStatusObserver = new MutationObserver(() => frt7FbsplEmailStatus());
        frt7FbsplStatusObserver.observe(status, { childList:true, characterData:true, subtree:true, attributes:true, attributeFilter:['style'] });
        frt7FbsplEmailStatus();
    }
    setInterval(() => {
        if (!frt7IsFbsplSource()) { frt7FbsplStatusObserver?.disconnect(); frt7FbsplStatusObserver = null; return; }
        if (frt7FbsplStatusObserver && !document.getElementById('divCheckEmailStatus')?.isConnected) {
            frt7FbsplStatusObserver.disconnect(); frt7FbsplStatusObserver = null;
        }
        frt7FbsplWatchStatus();
    }, 800);

    function fillEmailField() {
        const email = frt7RemoveContactPhoneFromEmail(frt7ResumeEmailForContact());
        const emailInput = document.querySelector("#txtEmail");
        if (!emailInput) {
            console.warn("Toolbar: email field not found.");
            return false;
        }

        if (!email && !frt7IsFbsplSource()) {
            console.warn("Toolbar: no email found.");
            return false;
        }

        // v411: whitespace-gap candidate reconstruction is strictly limited to
        // FBSPL, Indeed Posting Responses and Indeed TTT; other sources use
        // ordinary email extraction without joining neighboring tokens.
        // Prefer the already-correct contact email when the repaired resume
        // PDF version matches; otherwise replace it only for one unambiguous
        // broken address. Never infer from multiple different candidates.
        if (frt7IsFbsplSource()) {
            const headerEmail = frt7FbsplHeaderEmail();
            const existingForGap = String(emailInput.value || '').trim().toLowerCase();
            const contactConfirmed = headerEmail ? null : frt7FbsplContactConfirmedGapEmail(existingForGap);
            if (contactConfirmed) {
                frt7FbsplEmailStatus();
                console.info(`Toolbar EMAIL v442: single header gap exactly matches existing contact email: "${contactConfirmed}"; preserved.`);
                return true;
            }
            const domainGap = headerEmail ? null : frt7FbsplKnownDomainGapEmail();
            const splitNameEmail = (headerEmail || domainGap) ? null : frt7FbsplSplitNameEmail();
            const nameAnchored = (headerEmail || domainGap || splitNameEmail) ? null : frt7FbsplNameAnchoredGapEmail();
            const broken = headerEmail ? [headerEmail] : domainGap ? [domainGap] : splitNameEmail ? [splitNameEmail] : nameAnchored ? [nameAnchored] : frt7FbsplUnstructuredIntactEmails();
            const existing = String(emailInput.value || '').trim().toLowerCase();
            if (broken.includes(existing)) {
                frt7FbsplEmailStatus();
                console.info(`Toolbar EMAIL v401: recovered email matches existing contact: "${existing}".`);
                return true;
            }
            // v417: FBSPL PDF conversion may split a header email ("k aizen991")
            // while a later resume contact block contains the complete address.
            // If the extractor produced multiple candidates, trust ONLY a single
            // complete, token-bounded address that is also among those candidates.
            // This avoids joining an adjacent name/word into the local part.
            if (broken.length > 1) {
                const header = String(getResumeText() || getIframeResumeTextForRareFallback() || '').slice(0, 2200);
                const complete = new Set();
                const exactRe = /(^|[\s|;,])([A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?:com|net|org|edu|gov))(?=$|[\s|;,])/gi;
                for (const match of header.matchAll(exactRe)) {
                    const candidate = sanitizeEmail(match[2]);
                    if (broken.includes(candidate) && !isObviousOcrEmailDomainIssue(candidate)) complete.add(candidate);
                }
                if (complete.size === 1) {
                    const confirmed = [...complete][0];
                    if (confirmed === existing) {
                        frt7FbsplEmailStatus();
                        console.info(`Toolbar EMAIL v417: verified complete resume email matches contact: "${existing}".`);
                        return true;
                    }
                    if (!isManualContactLocked('email', emailInput) &&
                        !shouldBlockProtectedEmailChange(existing, confirmed)) {
                        runInternalEmailWrite(() => { emailInput.value = confirmed; triggerEvents(emailInput); });
                        frt7FbsplEmailStatus();
                        console.info(`Toolbar EMAIL v417: chose unique complete email over ambiguous PDF candidates: "${existing}" -> "${confirmed}".`);
                        return true;
                    }
                }
                // v445: When multiple intact, independently bounded emails occur in
                // the actual contact header, choose the first in document order.
                // Do not reconstruct or concatenate neighboring words here.
                const headerStop = header.search(/\b(?:Willing to relocate|Authorized to work|Work experience|Professional summary|Education|Skills)\b/i);
                const contactHeader = headerStop >= 0 ? header.slice(0, headerStop) : header.slice(0, 400);
                const firstHeaderEmailRe = /(^|[^A-Z0-9._%+\-@])([A-Z0-9._%+\-]+@[A-Z0-9.-]+\.(?:com|net|org|edu|gov))(?=$|[^A-Z0-9.-])/gi;
                for (const match of contactHeader.matchAll(firstHeaderEmailRe)) {
                    const first = sanitizeEmail(match[2]);
                    if (!broken.includes(first) || isObviousOcrEmailDomainIssue(first)) continue;
                    if (first === existing) {
                        frt7FbsplEmailStatus();
                        console.info(`Toolbar EMAIL v445: first intact contact-header email already matches: "${first}".`);
                        return true;
                    }
                    if (isManualContactLocked('email', emailInput) || shouldBlockProtectedEmailChange(existing, first)) break;
                    runInternalEmailWrite(() => { emailInput.value = first; triggerEvents(emailInput); });
                    frt7FbsplEmailStatus();
                    console.info(`Toolbar EMAIL v445: chose first intact contact-header email: "${existing}" -> "${first}".`);
                    return true;
                }
                console.info(`Toolbar EMAIL v417: ambiguous PDF candidates=${broken.length}; complete corroborated candidates=${complete.size}.`);
            }
            if (broken.length === 1 && !isManualContactLocked('email', emailInput) &&
                !shouldBlockProtectedEmailChange(existing, broken[0])) {
                runInternalEmailWrite(() => { emailInput.value = broken[0]; triggerEvents(emailInput); });
                frt7FbsplEmailStatus();
                console.info(`Toolbar EMAIL v401: recovered email: "${existing}" -> "${broken[0]}".`);
                return true;
            }
        }
        // v440: Correct only an isolated known-provider .comm typo in the header.
        // A single unique candidate is required; preserve manual edits and protections.
        if (frt7IsFbsplSource()) {
            const corrected = frt7KnownCommHeaderEmails();
            const existing = String(emailInput.value || '').trim().toLowerCase();
            if (corrected.length === 1 && corrected[0] !== existing &&
                !isManualContactLocked('email', emailInput) &&
                !shouldBlockProtectedEmailChange(existing, corrected[0])) {
                runInternalEmailWrite(() => { emailInput.value = corrected[0]; triggerEvents(emailInput); });
                frt7FbsplEmailStatus();
                console.info(`Toolbar EMAIL v440: corrected known-provider .comm header typo: "${existing}" -> "${corrected[0]}".`);
                return true;
            }
        }
        // v416: Narrow repair only: a standalone @yahoo.om address in the
        // resume contact header is the known missing-c typo for @yahoo.com.
        // Do not override contact emails for other complete header addresses.
        if (frt7IsFbsplSource()) {
            const header = String(getIframeResumeTextForRareFallback() || getResumeText() || '').slice(0, 650);
            const matches = [...header.matchAll(/(^|[^A-Z0-9._%+\-])([A-Z0-9._%+\-]+@yahoo\.om)(?=$|[^A-Z0-9.-])/gi)]
                .map(m => m[2].replace(/@yahoo\.om$/i, '@yahoo.com').toLowerCase());
            const unique = [...new Set(matches)];
            const existing = String(emailInput.value || '').trim().toLowerCase();
            if (unique.length === 1 && unique[0] !== existing &&
                !isManualContactLocked('email', emailInput) &&
                !shouldBlockProtectedEmailChange(existing, unique[0])) {
                runInternalEmailWrite(() => { emailInput.value = unique[0]; triggerEvents(emailInput); });
                frt7FbsplEmailStatus();
                console.info(`Toolbar EMAIL v416: corrected exact Yahoo .om header typo: "${existing}" -> "${unique[0]}".`);
                return true;
            }
            if (unique.length) console.info(`Toolbar EMAIL v416: Yahoo .om header candidates=${unique.length}; existing email preserved.`);
        }
        if (frt7IsFbsplSource()) {
            console.warn('Toolbar EMAIL v401: no single safe FBSPL/Indeed Posting Responses/Indeed TTT email candidate; existing email preserved.');
            return false;
        }
        if (!email) { console.warn("Toolbar: no email found."); return false; }
        const currentBeforeCleanup = String(emailInput.value || "").trim();
        const indeedRelayOverride = isIndeedEmailRelay(currentBeforeCleanup);

        // v269 GENERIC BROKEN-LOCAL EMAIL NO-TOUCH GUARD:
        // Do not try to guess how a resume email was split. Instead, use the site's
        // already-loaded Contact Info email as the reference answer. If that complete
        // existing email appears in the resume once whitespace is removed, but does NOT
        // appear there normally, the resume has simply inserted whitespace inside that
        // same email. Preserve the existing Contact Info value.
        //
        // Examples handled without pattern-specific rules:
        //   mrreed2 9@gmail.com       + existing mrreed29@gmail.com
        //   camryn ar d@gmail.com     + existing camrynard@gmail.com
        //   angel capr on8@gmail.com  + existing angelcapron8@gmail.com
        //   jo hn.smi th23@gmail.com  + existing john.smith23@gmail.com
        //
        // This never constructs a new email or attaches nearby names/words.
        if (!indeedRelayOverride) {
            const existing = sanitizeEmail(currentBeforeCleanup || "");
            const existingLooksComplete = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,24}$/i.test(existing);
            if (existingLooksComplete) {
                const source = String(getResumeText() || getIframeResumeTextForRareFallback() || "");
                const sourceLower = source.toLowerCase();
                const compactSource = sourceLower.replace(/\s+/g, "");
                const existingLower = existing.toLowerCase();

                // Only invoke no-touch when whitespace removal is what makes the
                // existing address discoverable. A normally-present email continues
                // through the ordinary Email logic unchanged.
                if (!sourceLower.includes(existingLower) && compactSource.includes(existingLower)) {
                    console.warn(`Toolbar EMAIL v269: resume contains whitespace-split version of existing Contact Info email; left existing email untouched: "${existing}".`);
                    return false;
                }
            }
        }

        // v98 normally leaves uncertain OCR-provider addresses untouched.
        // v196 exception: when the current contact email is an Indeed relay, the
        // resume email is authoritative and must replace the relay.
        if (isObviousOcrEmailDomainIssue(email) && !indeedRelayOverride) {
            console.warn(`Toolbar EMAIL v98: possible OCR provider typo skipped; left existing email untouched: "${email}".`);
            return false;
        }

        cleanExistingEmailField(emailInput);

        const currentEmail = String(emailInput.value || "").trim();
        if (shouldBlockProtectedEmailChange(currentEmail, email)) {
            console.warn(
                `Toolbar EMAIL: protected destination skipped: "${email}". ` +
                "A .edu or azulmail.net address may only replace an existing azulmail.net address."
            );
            return false;
        }

        if (currentEmail.toLowerCase() === String(email).trim().toLowerCase()) {
            return true;
        }

        runInternalEmailWrite(() => {
            emailInput.value = email;
            triggerEvents(emailInput);
        });
        return true;
    }

    // AUTO EMAIL v113: applicant-aware fast delayed literal Email-button click.
    let delayedEmailClickTimer = null;
    let delayedEmailClickSignature = "";
    let delayedNameClickTimer = null;
    let delayedNameClickSignature = "";
    let delayedCityClickTimer = null;
    let delayedCityClickSignature = "";

    function getCurrentApplicantSignature() {
        const appMatch = String(location.href || "").match(/[?&]app=([^&#]+)/i);
        const appId = appMatch ? appMatch[1] : "";
        const rawHead = String(getResumeText() || "")
            .slice(0, 240)
            .replace(/\s+/g, " ")
            .trim();
        return `${appId}||${rawHead}`;
    }

    // v349: bounded Auto Name verification. All writes still go through the existing
    // Name button / fillNameFields({auto:true}), preserving BOTH-name protection,
    // swaps, rejection lists, Revert, and manual-edit locks.
    const frt7NameReadinessAttempts = new Map();
    function queueDelayedNameButtonClick(reason = "resume load") {
        const log = (message, warn = false) => console[warn ? "warn" : "info"](`Toolbar AUTO NAME v349: ${message}`);
        if (window.__frt7_auto_name_enabled === false) { log("SKIP: Name disabled in Auto settings."); return; }
        if (window.__frt7_name_reverted === true) { log("SKIP: Name was reverted for this applicant."); return; }
        const signature = getCurrentApplicantSignature();
        if (signature && delayedNameClickSignature === signature) { log("SKIP: already attempted for this applicant."); return; }
        const inputs = () => ({
            first: document.querySelector("#txtFirstNameDataEntry") || document.querySelector("#txtFirstName"),
            last: document.querySelector("#txtLastNameDataEntry") || document.querySelector("#txtLastName"),
            button: document.getElementById("frt7-name-btn")
        });
        const snapshot = () => {
            const {first,last} = inputs();
            return `${String(first?.value || "").trim()} / ${String(last?.value || "").trim()}`;
        };
        const start = inputs();
        if (!String(getResumeText() || "").trim() || !start.first || !start.last || !start.button) {
            log("WAIT: resume, Name button, or name inputs not ready; retrying shortly.", true);
            const tries = (frt7NameReadinessAttempts.get(signature) || 0) + 1;
            frt7NameReadinessAttempts.set(signature, tries);
            if (tries <= 6) setTimeout(() => {
                if (getCurrentApplicantSignature() === signature) queueDelayedNameButtonClick("late iframe/name readiness");
            }, 350);
            else log("STOP: Name/iframe remained unavailable after six readiness checks.", true);
            return;
        }
        if (isNameManuallyLocked(start.first, start.last)) { log("SKIP: manual First/Last edit lock."); return; }
        delayedNameClickSignature = signature;
        const initial = snapshot();
        const click = (attempt) => {
            if (getCurrentApplicantSignature() !== signature) { log("STOP: applicant changed."); return false; }
            if (window.__frt7_auto_name_enabled === false || window.__frt7_name_reverted === true) { log("STOP: Auto Name disabled or reverted."); return false; }
            const {first,last,button} = inputs();
            if (!first || !last || !button || isNameManuallyLocked(first,last)) { log("STOP: inputs unavailable or manually edited."); return false; }
            log(`attempt ${attempt}: invoking existing protected Name button; before=${snapshot()}; reason=${reason}.`);
            window.__frt7_auto_name_click_in_progress = true;
            try { button.click(); } finally { window.__frt7_auto_name_click_in_progress = false; }
            return true;
        };
        if (!click(1)) return;
        // The button handler awaits rejectedAutoNamesReady, so verify after its
        // asynchronous continuation. Do not repeatedly click after a successful change.
        setTimeout(() => {
            if (getCurrentApplicantSignature() !== signature) return;
            const now = snapshot();
            if (now !== initial) { log(`SUCCESS: ${initial} -> ${now}.`); return; }
            log(`VERIFY: no name change after first attempt (${now}); one guarded retry.`);
            if (!click(2)) return;
            setTimeout(() => {
                if (getCurrentApplicantSignature() !== signature) return;
                const finalName = snapshot();
                if (finalName !== initial) log(`SUCCESS after retry: ${initial} -> ${finalName}.`);
                else log(`UNCHANGED after two protected attempts: ${finalName}. Possible name protection/rejection, or no valid candidate; no further retries.`, true);
            }, 450);
        }, 650);
    }

    function clickNameButtonOnceWhenResumeLoads() {
        queueDelayedNameButtonClick("settled resume load");
    }

    function getCurrentApplicantId() {
        const m = String(location.href || "").match(/[?&]app=([^&#]+)/i);
        return m ? String(m[1]) : "";
    }

    function queueDelayedEmailButtonClick(reason = "resume load") {
        // AUTO EMAIL v218 — BOUNDED STICK-VERIFY RETRY:
        // v180 made Email Auto a single click. That was fast, but WallStJobs can
        // finish/repaint #txtEmail AFTER that click, so the correct resume email can
        // be overwritten and the user then has to press Email manually.
        //
        // v218 keeps the SAME Email button + fillEmailField() decision logic, but
        // verifies that the value actually stuck and retries briefly while this same
        // applicant is settling. No retry can continue after a real human edit.
        if (window.__frt7_auto_email_enabled === false) return;

        const lifecycleKey = getManualContactApplicantKey();
        const startingSignature = getCurrentApplicantSignature();
        const startedAt = Date.now();
        frt7BeginAutoEmailSettle(lifecycleKey, 3000);
        const retryDelays = [0, 120, 240, 360, 480, 600];
        let attemptIndex = 0;
        let finished = false;

        if (delayedEmailClickTimer) {
            clearTimeout(delayedEmailClickTimer);
            delayedEmailClickTimer = null;
        }

        // v120 existed specifically for WallStJobs' initial synthetic Email repaint,
        // but it was never actually invoked. Clear that stale initial lock now, once,
        // before the first Auto Email attempt for this stabilized applicant.
        const initialEmailInput = document.querySelector("#txtEmail");
        clearInitialEmailManualLockForApplicant(lifecycleKey, initialEmailInput);

        const finish = (signature = "", verifyLater = false) => {
            finished = true;
            if (verifyLater) {
                // Keep ownership through the two late stick checks (450/1000 ms).
                frt7BeginAutoEmailSettle(lifecycleKey, 1400);
                setTimeout(() => frt7EndAutoEmailSettle(lifecycleKey), 1450);
            } else {
                frt7EndAutoEmailSettle(lifecycleKey);
            }
            if (delayedEmailClickTimer) {
                clearTimeout(delayedEmailClickTimer);
                delayedEmailClickTimer = null;
            }
            if (signature) delayedEmailClickSignature = signature;
            if (verifyLater) {
                [450, 1000].forEach(delay => setTimeout(() => {
                    if (window.__frt7_auto_email_enabled === false ||
                        (lifecycleKey && getManualContactApplicantKey() !== lifecycleKey)) return;
                    const input = document.querySelector("#txtEmail");
                    const expectedNow = sanitizeEmail(frt7RemoveContactPhoneFromEmail(frt7ResumeEmailForContact() || ""));
                    if (!input || !expectedNow ||
                        String(input.value || "").trim().toLowerCase() === expectedNow.toLowerCase()) return;
                    if (isManualContactLocked("email", input) &&
                        !isIndeedEmailRelay(input.value) &&
                        !isPhoneLeadContaminatedCurrentEmail(input.value)) return;
                    clearInitialEmailManualLockForApplicant(lifecycleKey, input);
                    const button = document.getElementById("frt7-email-btn");
                    if (button && input.dataset.frt7LateEmailRepair !== lifecycleKey) {
                        input.dataset.frt7LateEmailRepair = lifecycleKey;
                        button.click();
                    }
                }, delay));
            }
        };

        const attempt = () => {
            delayedEmailClickTimer = null;
            if (finished || window.__frt7_auto_email_enabled === false) return;
            if (lifecycleKey && getManualContactApplicantKey() !== lifecycleKey) return finish();

            const emailBtn = document.getElementById("frt7-email-btn");
            const emailInput = document.querySelector("#txtEmail");
            if (!emailBtn || !emailInput) {
                if (attemptIndex < retryDelays.length - 1) {
                    attemptIndex++;
                    delayedEmailClickTimer = setTimeout(attempt, retryDelays[attemptIndex]);
                }
                return;
            }

            const current = String(emailInput.value || "").trim();
            const indeedRelayOverride = isIndeedEmailRelay(current);

            // A trusted human edit must always win. The initial synthetic site lock was
            // cleared above; any lock created after Auto begins is treated as intentional.
            if (
                isManualContactLocked("email", emailInput) &&
                !indeedRelayOverride &&
                !isPhoneLeadContaminatedCurrentEmail(current)
            ) {
                console.info("Toolbar AUTO EMAIL v218: stopped because email was edited after Auto began.");
                return finish();
            }

            const rawText = getResumeText();
            const rawEmail = frt7ResumeEmailForContact();
            if (!rawText.trim() || !rawEmail) {
                if (attemptIndex < retryDelays.length - 1) {
                    attemptIndex++;
                    delayedEmailClickTimer = setTimeout(attempt, retryDelays[attemptIndex]);
                } else {
                    console.warn("Toolbar AUTO EMAIL v218: resume email never became ready inside retry window.");
                }
                return;
            }

            if (isObviousOcrEmailDomainIssue(rawEmail) && !indeedRelayOverride) {
                console.info(`Toolbar AUTO EMAIL v218: possible OCR provider typo skipped; existing email preserved: "${rawEmail}".`);
                return finish(startingSignature || getCurrentApplicantSignature());
            }

            const expected = String(sanitizeEmail(frt7RemoveContactPhoneFromEmail(rawEmail)) || "").trim().toLowerCase();
            if (!expected) return finish();

            if (shouldBlockProtectedEmailChange(current, expected)) {
                console.info(`Toolbar AUTO EMAIL v218: intentionally skipped protected destination "${expected}".`);
                return finish(startingSignature || getCurrentApplicantSignature());
            }

            if (current.toLowerCase() === expected) {
                return finish(startingSignature || getCurrentApplicantSignature(), true);
            }

            console.info(`Toolbar AUTO EMAIL v218: Email-button attempt ${attemptIndex + 1} (${reason}).`);
            frt7BeginAutoEmailSettle(lifecycleKey, 2600);
            emailBtn.click();

            // Verify after WallStJobs has had a moment to react. If its own late paint
            // overwrites our value, remove ONLY the synthetic lock created by that paint
            // and try the same Email button again. Trusted typing still creates a lock
            // through beforeinput/input and will stop the next attempt.
            setTimeout(() => {
                if (finished || (lifecycleKey && getManualContactApplicantKey() !== lifecycleKey)) return;
                const liveInput = document.querySelector("#txtEmail");
                const live = String(liveInput?.value || "").trim().toLowerCase();
                if (live === expected) {
                    finish(startingSignature || getCurrentApplicantSignature(), true);
                    return;
                }

                // WallStJobs' late programmatic repaint can emit synthetic input/change,
                // which v77 records as a manual lock. During this short Auto-owned settle
                // window, clear that repaint lock so Auto can restore the resume email.
                clearInitialEmailManualLockForApplicant(lifecycleKey, liveInput);

                if (attemptIndex < retryDelays.length - 1 && Date.now() - startedAt < 2200) {
                    attemptIndex++;
                    delayedEmailClickTimer = setTimeout(attempt, retryDelays[attemptIndex]);
                } else {
                    console.warn("Toolbar AUTO EMAIL v218: correct email did not stick before retry window ended.");
                }
            }, 90);
        };

        attempt();
    }

    function clickEmailButtonOnceWhenResumeLoads() {
        queueDelayedEmailButtonClick("500ms settled resume load");
    }

    // v189 CITY-ONLY SETTLED CANONICALIZER:
    // WallStJobs can pre-fill City with flattened address text such as
    // "Four Mile Loop Cheraw" while State=SC and ZIP=29520 are already correct.
    // Resolve ONLY the City field to an exact saved/database city name. No State,
    // ZIP, Phone, Email, or Name write exists anywhere in this function.
    // v190 PERFORMANCE-ONLY FAST PATH FOR THE v189 CITY-ONLY CANONICALIZER.
    // The visible behavior is unchanged:
    //   - it still writes ONLY City;
    //   - saved/Learned City+State remains authoritative;
    //   - the U.S. City DB remains a fallback;
    //   - ambiguous cases still use the full v189 header logic;
    //   - the same 0/250/750/1500ms repaint window remains.
    //
    // The speedup is that normal already-correct cities now return in O(1), and obvious
    // "extra words + one clear saved/database city" cases are resolved from the indexed
    // City+State stores without re-running the heavier header parsers several times.
    let frt7CityCanonicalizerQueueV190 = {
        key: "",
        token: 0,
        timers: []
    };

    function frt7GetIndexedContainedCityCandidatesV190(currentCity, currentState) {
        const words = String(currentCity || "").split(/\s+/).filter(Boolean);
        if (!words.length) return [];

        const currentNorm = normalizeLearnedCity(currentCity);
        const byNorm = new Map();

        for (let start = 0; start < words.length; start++) {
            for (let end = start + 1; end <= words.length; end++) {
                const candidate = normalizeContactDisplayCase(
                    words.slice(start, end).join(" ")
                        .replace(/^[^A-Za-zÀ-ÖØ-öø-ÿ.'’\-]+|[^A-Za-zÀ-ÖØ-öø-ÿ.'’\-]+$/g, "")
                );
                if (!candidate) continue;

                const norm = normalizeLearnedCity(candidate);
                if (!norm || norm === currentNorm) continue;

                const pairKey = learnedCityStateKey(candidate, currentState);
                const learned = learnedCitiesCache?.[pairKey];
                const learnedOk = Boolean(
                    learned &&
                    learned.deleted !== true &&
                    learned.city &&
                    learned.trustedManualCity !== false &&
                    String(learned.state || "").trim().toUpperCase() === currentState
                );
                const usOk = Boolean(usCityDbLoaded && isUsCityDatabasePair(candidate, currentState));
                if (!learnedOk && !usOk) continue;

                const existing = byNorm.get(norm);
                const rec = {
                    city: learnedOk
                        ? normalizeContactDisplayCase(String(learned.city || candidate))
                        : candidate,
                    learned: learnedOk,
                    us: usOk,
                    endsField: end === words.length,
                    words: end - start,
                    start
                };

                // Same city can be encountered through more than one contiguous token route.
                // Keep the strongest representation only.
                if (
                    !existing ||
                    Number(rec.learned) > Number(existing.learned) ||
                    Number(rec.endsField) > Number(existing.endsField) ||
                    rec.words > existing.words ||
                    rec.start > existing.start
                ) {
                    byNorm.set(norm, rec);
                }
            }
        }

        return [...byNorm.values()].sort((a, b) =>
            Number(b.learned) - Number(a.learned) ||
            Number(b.endsField) - Number(a.endsField) ||
            b.words - a.words ||
            b.start - a.start
        );
    }

    // v191 ONE-SHOT ZIP KICK AFTER CITY CANONICALIZATION:
    // The City-only cleanup can finish at the end of the existing 2-second settle window.
    // When it ACTUALLY changes City and ZIP is blank, request the normal ZIP lookup once
    // for that final City+State. No new watcher, heartbeat, retry window, or polling.
    function frt7KickZipOnceAfterCityCanonicalizationV191(city, state, reason = "city canonicalized") {
        const finalCity = normalizeContactDisplayCase(String(city || "").trim());
        const finalState = String(state || "").trim().toUpperCase();
        if (!finalCity || !/^[A-Z]{2}$/.test(finalState)) return false;
        if (frt7HumanTouchedLocation()) return false;

        const cityInput = document.getElementById("txtCityDataEntry");
        const stateInput = document.getElementById("txtStateDataEntry");
        const zipInput = document.getElementById("txtZipDataEntry");
        if (!cityInput || !stateInput || !zipInput) return false;
        if (String(zipInput.value || "").trim()) return false;
        if (
            isManualContactLocked("city", cityInput) ||
            isManualContactLocked("state", stateInput) ||
            isManualContactLocked("zip", zipInput)
        ) return false;

        browser.storage.local.get([AUTO_KEY, AUTO_FIELDS_KEY]).then(stored => {
            const fields = { ...DEFAULT_AUTO_FIELDS, ...(stored[AUTO_FIELDS_KEY] || {}) };
            if (!stored[AUTO_KEY] || !fields.zipLookup) return;
            if (frt7HumanTouchedLocation()) return;
            if (String(zipInput.value || "").trim()) return;

            if (runConfirmedZipLookup(
                { city: finalCity, state: finalState },
                { zipStatus: "blank" }
            )) {
                console.info(
                    `Toolbar AUTO ZIP v191: City canonicalizer settled ${finalCity}, ${finalState}; ` +
                    `requested ZIP once (${reason}).`
                );
            }
        }).catch(() => {});

        return true;
    }

    function frt7CanonicalizeSavedCityFieldOnlyV189(reason = "city settle") {
        const cityInput = document.getElementById("txtCityDataEntry");
        const stateInput = document.getElementById("txtStateDataEntry");
        if (!cityInput || !stateInput) return false;

        // Preserve the existing rule that a genuine human location edit wins.
        if (frt7HumanTouchedLocation() || isManualContactLocked("city", cityInput)) return false;

        let currentCity = String(cityInput.value || "").replace(/\s+/g, " ").trim();
        const currentState = String(stateInput.value || "").trim().toUpperCase();
        if (!currentCity || !/^[A-Z]{2}$/.test(currentState)) return false;
        let cityChangedByCanonicalizerV191 = false;

        // v333: The delayed city-only canonicalizer is independent of Auto's
        // source lock. Respect the SAME Career Builder / Resume Library lock
        // before punctuation cleaning, suffix matching, or any field writes.
        // A genuinely different trusted full header location can still override
        // via the existing source-protection exception.
        if (frt7SourceProtectionAllowed() &&
            frt7CareerBuilderValidLocationMustStay("city-only canonicalizer")) {
            console.info(`Toolbar CITY v333: skipped delayed city-only cleanup/canonicalization; protected source city "${currentCity}, ${currentState}".`);
            return false;
        }

        // v195 RENDERED CITY SPELLING RECOVERY — City only.
        //
        // WallStJobs' hidden txtResumeRaw can lose characters that are still present
        // in the rendered resume. Example:
        //   rendered resume: "Mayagüez, PR"
        //   txtResumeRaw:     "Mayagez, PR"
        //
        // getResumeText() intentionally prefers txtResumeRaw on ordinary resumes, so
        // the normal City pipeline never sees the correct rendered spelling. For City
        // ONLY, inspect the rendered contact header and restore its spelling when:
        //   - it is an explicit "City, ST" pair in the rendered TRUE header,
        //   - ST equals the already-visible State field,
        //   - the rendered city contains a non-ASCII letter, and
        //   - after accent folding, it differs from the current city by AT MOST one
        //     inserted/deleted/substituted letter.
        //
        // This does not change State/ZIP/Phone/Email/Name and does not make the iframe
        // a general resume source.
        function frt7RestoreRenderedCitySpellingV195() {
            let rendered = "";
            try {
                const iframe = document.querySelector("#divResumeContainer iframe");
                const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
                rendered = String(
                    doc?.querySelector(".Section1")?.innerText ||
                    doc?.body?.innerText ||
                    document.querySelector("#divResumeContainer")?.innerText ||
                    ""
                );
            } catch (_) {
                rendered = String(document.querySelector("#divResumeContainer")?.innerText || "");
            }
            if (!rendered.trim()) return "";

            // Only inspect the rendered contact/header region, never Experience/Education.
            const sectionMatch = rendered.search(
                /\b(?:PROFESSIONAL\s+SUMMARY|SUMMARY|OBJECTIVE|CORE\s+COMPETENCIES|EXPERIENCE|EMPLOYMENT|EDUCATION|SKILLS)\b/i
            );
            const header = (sectionMatch >= 0 ? rendered.slice(0, sectionMatch) : rendered.slice(0, 900)).slice(0, 900);

            const fold = value => normalizeUnicode(String(value || ""))
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toUpperCase()
                .replace(/[^A-Z]/g, "");

            const oneEditOrLess = (a, b) => {
                if (a === b) return true;
                if (Math.abs(a.length - b.length) > 1) return false;

                // Same length: allow exactly one substituted character.
                if (a.length === b.length) {
                    let diff = 0;
                    for (let i = 0; i < a.length; i++) {
                        if (a[i] !== b[i] && ++diff > 1) return false;
                    }
                    return diff <= 1;
                }

                // Different by one character: allow one insertion/deletion.
                const shorter = a.length < b.length ? a : b;
                const longer = a.length < b.length ? b : a;
                let i = 0, j = 0, skipped = 0;
                while (i < shorter.length && j < longer.length) {
                    if (shorter[i] === longer[j]) {
                        i++; j++;
                    } else {
                        if (++skipped > 1) return false;
                        j++;
                    }
                }
                return true;
            };

            const stateEsc = currentState.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const pairRe = new RegExp(
                "([A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ.'’\\-]*" +
                "(?:\\s+[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ.'’\\-]*){0,3})" +
                "\\s*,\\s*" + stateEsc + "\\b",
                "ig"
            );

            const currentFold = fold(currentCity);
            let m;
            while ((m = pairRe.exec(header)) !== null) {
                let candidate = String(m[1] || "").trim();

                // If the line also contains email/phone/name text, keep only the visual
                // contact segment nearest the state.
                candidate = (candidate.split(/[|;]/).pop() || candidate).trim();
                const parts = candidate.split(/\s+/).filter(Boolean);
                if (parts.length > 4) candidate = parts.slice(-4).join(" ");

                candidate = normalizeContactDisplayCase(candidate);
                if (!candidate || !/[^\x00-\x7F]/.test(candidate)) continue;

                const candidateFold = fold(candidate);
                if (!candidateFold || !currentFold) continue;
                if (!oneEditOrLess(candidateFold, currentFold)) continue;

                return candidate;
            }
            return "";
        }

        const renderedCityV195 = frt7RestoreRenderedCitySpellingV195();
        if (renderedCityV195 && renderedCityV195 !== currentCity) {
            try {
                const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
                if (setter) setter.call(cityInput, renderedCityV195);
                else cityInput.value = renderedCityV195;
            } catch (_) {
                cityInput.value = renderedCityV195;
            }
            cityInput.dispatchEvent(new Event("input", { bubbles: true }));
            cityInput.dispatchEvent(new Event("change", { bubbles: true }));
            console.info(
                `Toolbar CITY v195: restored rendered city spelling "${currentCity}" -> "${renderedCityV195}".`
            );
            currentCity = renderedCityV195;
            cityChangedByCanonicalizerV191 = true;
        }

        // CITY CHARACTER CLEAN — City only.
        // Run BEFORE the existing "already-valid City+State" fast return so a
        // WallStJobs-prefilled value such as "/ Holly Hill" cannot be preserved
        // just because State/ZIP are otherwise valid. Letters and spaces only.
        let cleanedCity = normalizeContactDisplayCase(
            currentCity
                .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ ]+/g, " ")
                .replace(/\s+/g, " ")
                .trim()
        );

        // v429: Preserve standard city-name abbreviation periods after character cleanup.
        // The earlier letters-only sanitizer stripped "St." every time, causing the
        // trusted header restoration and the city cleaner to fight each other.
        // Only restore periods for recognized standalone abbreviations, not arbitrary dots.
        cleanedCity = cleanedCity.replace(/\b(St|Mt|Ft|Ste)\s+(?=[A-Za-zÀ-ÖØ-öø-ÿ])/gi,
            (_, abbr) => ({st:'St.', mt:'Mt.', ft:'Ft.', ste:'Ste.'})[abbr.toLowerCase()] + ' ');

        if (cleanedCity && cleanedCity !== currentCity) {
            try {
                const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
                if (setter) setter.call(cityInput, cleanedCity);
                else cityInput.value = cleanedCity;
            } catch (_) {
                cityInput.value = cleanedCity;
            }
            cityInput.dispatchEvent(new Event("input", { bubbles: true }));
            cityInput.dispatchEvent(new Event("change", { bubbles: true }));
            console.info(`Toolbar CITY clean: "${currentCity}" -> "${cleanedCity}".`);
            currentCity = cleanedCity;
            cityChangedByCanonicalizerV191 = true;
        }

        const currentNorm = normalizeLearnedCity(currentCity);
        const exactKey = learnedCityStateKey(currentCity, currentState);
        const exactLearned = learnedCitiesCache?.[exactKey];

        // v194 EXPLICIT TRUE-HEADER CITY OVERRIDE:
        // A WallStJobs-prefilled City can itself be a perfectly valid U.S. City+State
        // (for example South Bend, IN), while the resume's actual contact header gives
        // a DIFFERENT explicit City+State (for example Mishawaka, IN). The old v190
        // fast return stopped here merely because South Bend, IN exists in the database,
        // so the true header never got a chance to win.
        //
        // Before preserving an already-valid current City, do ONE indexed true-header
        // check. This remains City-only: it does not write State, ZIP, Phone, Email, or Name.
        // It also keeps the existing manual-location lock fully authoritative.
        let v194ExplicitHeaderCity = "";
        if (usCityDbLoaded) {
            // v278 FIX — canonicalizer must obey the SAME authoritative-header priority
            // as Auto City. The old v194 code skipped Learned Cities and asked the broad
            // U.S. database matcher first. On Juliette Tedim's resume that broad matcher
            // returned the later EDUCATION location "Fort Lauderdale, FL" even though
            // the real contact header explicitly says learned "Port Saint Lucie, FL".
            //
            // If Auto has already locked an authoritative header pair, use that.
            // Otherwise resolve through the shared authoritative resolver, whose order is
            // learned/explicit header before broader database fallbacks.
            const resumeTextV278 = String(getResumeText() || "");
            const lockedV278 = (() => {
                try { return frt7GetAuthoritativeHeaderLocation(); } catch (_) { return null; }
            })();
            const resolvedV278 =
                (lockedV278?.city ? lockedV278 : null) ||
                getAuthoritativeHeaderLocationForAuto(resumeTextV278);

            const v194HeaderState = String(resolvedV278?.state || "").trim().toUpperCase();
            const v194HeaderCity = normalizeContactDisplayCase(String(resolvedV278?.city || "").trim());

            if (
                v194HeaderCity &&
                v194HeaderState === currentState &&
                (
                    resolvedV278?.learned ||
                    resolvedV278?.trusted ||
                    isUsCityDatabasePair(v194HeaderCity, v194HeaderState)
                ) &&
                normalizeLearnedCity(v194HeaderCity) !== currentNorm
            ) {
                v194ExplicitHeaderCity = v194HeaderCity;
            }
        }

        if (v194ExplicitHeaderCity) {
            console.info(
                `Toolbar CITY v194: explicit true-header city overrides valid site city ` +
                `"${currentCity}" -> "${v194ExplicitHeaderCity}" (${currentState}).`
            );

            try {
                const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
                if (setter) setter.call(cityInput, v194ExplicitHeaderCity);
                else cityInput.value = v194ExplicitHeaderCity;
            } catch (_) {
                cityInput.value = v194ExplicitHeaderCity;
            }
            cityInput.dispatchEvent(new Event("input", { bubbles: true }));
            cityInput.dispatchEvent(new Event("change", { bubbles: true }));

            frt7KickZipOnceAfterCityCanonicalizationV191(
                v194ExplicitHeaderCity,
                currentState,
                `${reason}: explicit true-header city`
            );
            return true;
        }

        // v190 FASTEST COMMON CASE:
        // If the field already IS an exact active saved/database City+State pair AND
        // the true header did not explicitly identify a different city, there is nothing
        // for this "remove extra words" reconciler to do.
        if (
            (
                exactLearned &&
                exactLearned.deleted !== true &&
                exactLearned.city &&
                exactLearned.trustedManualCity !== false &&
                String(exactLearned.state || "").trim().toUpperCase() === currentState
            ) ||
            (usCityDbLoaded && isUsCityDatabasePair(currentCity, currentState))
        ) {
            if (cityChangedByCanonicalizerV191) {
                frt7KickZipOnceAfterCityCanonicalizationV191(
                    currentCity,
                    currentState,
                    `${reason}: character cleanup`
                );
            }
            return false;
        }

        // v329: An exact authoritative true-header City/State must never be
        // shortened by the later contained-city/suffix canonicalizer.  The
        // header fill and delayed canonicalizer previously fought each other
        // (Silver Lake, WI -> Lake, WI).  Only protect an EXACT match, so
        // legitimate cleanup of extra words around a city still works.
        const v329Trusted = (() => {
            try { return frt7GetAuthoritativeHeaderLocation(); } catch (_) { return null; }
        })();
        const v329TrustedCity = String(v329Trusted?.city || "").trim();
        const v329TrustedState = String(v329Trusted?.state || "").trim().toUpperCase();
        if (v329TrustedCity && v329TrustedState === currentState &&
            normalizeLearnedCity(v329TrustedCity) === currentNorm) {
            console.info(`Toolbar CITY v329: preserved exact authoritative header city "${currentCity}", ${currentState}; skipped suffix canonicalization.`);
            return false;
        }

        const containsWholeCity = candidate => {
            const canonical = normalizeContactDisplayCase(String(candidate || "").trim());
            if (!canonical) return false;
            const esc = canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
            return new RegExp(
                "(^|[^A-Za-zÀ-ÖØ-öø-ÿ])" + esc + "(?=$|[^A-Za-zÀ-ÖØ-öø-ÿ])",
                "i"
            ).test(currentCity);
        };

        let canonicalCity = "";

        // v190 FAST OBVIOUS-JUNK CASE:
        // Test only contiguous word groups already present in City against the O(1)
        // saved/database indexes. If there is exactly one plausible City+State, or one
        // uniquely strongest suffix match, use it immediately. Ambiguity falls through
        // to the original v189 header logic below, preserving all existing decisions.
        const indexedMatches = frt7GetIndexedContainedCityCandidatesV190(currentCity, currentState);
        if (indexedMatches.length === 1) {
            canonicalCity = indexedMatches[0].city;
        } else if (indexedMatches.length > 1) {
            const top = indexedMatches[0];
            const second = indexedMatches[1];
            const topIsUniquelyStronger = Boolean(
                Number(top.learned) > Number(second.learned) ||
                (
                    Number(top.learned) === Number(second.learned) &&
                    (
                        Number(top.endsField) > Number(second.endsField) ||
                        (
                            Number(top.endsField) === Number(second.endsField) &&
                            top.words > second.words
                        )
                    )
                )
            );
            if (topIsUniquelyStronger) canonicalCity = top.city;
        }

        // ORIGINAL v189 DECISION PATH for any case that is not obvious from the indexes.
        if (!canonicalCity) {
            // 1) Strongest signal: an exact saved/database City+State found in the TRUE
            // resume header. This directly handles "2182 Four Mile Loop Cheraw, SC 29520".
            const resumeText = String(getResumeText() || "");
            const headerCandidates = [
                findTrustedLearnedCityInHeader(resumeText),
                findUsCityDatabaseInHeader(resumeText),
                findUsCityZipInHeaderV171(resumeText)
            ];
            for (const loc of headerCandidates) {
                const state = String(loc?.state || "").trim().toUpperCase();
                const city = normalizeContactDisplayCase(String(loc?.city || "").trim().replace(/[,;]+\s*$/, ""));
                if (city && state === currentState && containsWholeCity(city)) {
                    canonicalCity = city;
                    break;
                }
            }

            // 2) Saved/Learned Cities are authoritative even when the broader header
            // parser did not return them. Prefer the longest contained match.
            if (!canonicalCity) {
                const learnedMatches = Object.values(learnedCitiesCache || {})
                    .filter(entry =>
                        entry && entry.deleted !== true && entry.city &&
                        entry.trustedManualCity !== false &&
                        String(entry.state || "").trim().toUpperCase() === currentState &&
                        containsWholeCity(entry.city)
                    )
                    .map(entry => normalizeContactDisplayCase(entry.city))
                    .sort((a, b) => b.length - a.length);
                canonicalCity = learnedMatches[0] || "";
            }

            // 3) U.S. City Database fallback without scanning all 41k rows: test the
            // contiguous word groups already present in the City field against the indexed
            // City+State set. Prefer a match ending at the end of the field, then longest.
            if (!canonicalCity && indexedMatches.length) {
                const matches = [...indexedMatches].sort((a, b) =>
                    Number(b.endsField) - Number(a.endsField) ||
                    b.words - a.words ||
                    b.start - a.start
                );
                canonicalCity = matches[0]?.city || "";
            }
        }

        if (!canonicalCity || normalizeLearnedCity(canonicalCity) === currentNorm) return false;

        console.info(
            `Toolbar CITY v190: City-only canonicalizer (${reason}) "${currentCity}" -> "${canonicalCity}" (${currentState}).`
        );

        // Intentionally write ONLY City. Use the native value setter so the visible
        // field and submitted form value agree, then notify City listeners only.
        try {
            const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
            if (setter) setter.call(cityInput, canonicalCity);
            else cityInput.value = canonicalCity;
        } catch (_) {
            cityInput.value = canonicalCity;
        }
        cityInput.dispatchEvent(new Event("input", { bubbles: true }));
        cityInput.dispatchEvent(new Event("change", { bubbles: true }));

        frt7KickZipOnceAfterCityCanonicalizationV191(
            canonicalCity,
            currentState,
            reason
        );
        return true;
    }

    function frt7QueueCityOnlyCanonicalizerV189(reason = "city settle") {
        // Keep the SAME repaint checks as v189, but do not stack duplicate 4-timer
        // batches for the same applicant when DB-ready + unified-auto happen together.
        const key = getApplicantLifecycleKey() || getCurrentApplicantSignature() || "current";

        if (frt7CityCanonicalizerQueueV190.key === key && frt7CityCanonicalizerQueueV190.timers.length) {
            return;
        }

        for (const timer of frt7CityCanonicalizerQueueV190.timers) clearTimeout(timer);
        frt7CityCanonicalizerQueueV190.timers = [];
        frt7CityCanonicalizerQueueV190.key = key;
        const token = ++frt7CityCanonicalizerQueueV190.token;

        // v228 PERFORMANCE: the first check keeps the exact canonicalizer. Later
        // repaint checks are cheap unless WallStJobs actually changes City/State.
        // This preserves late-repaint repair without rescanning the same resume five times.
        let lastVisibleLocation = null;
        [0, 250, 750, 1500, 2000].forEach(delay => {
            const timer = setTimeout(() => {
                if (token !== frt7CityCanonicalizerQueueV190.token) return;
                if (frt7HumanTouchedLocation()) return;

                const cityNow = String(document.getElementById("txtCityDataEntry")?.value || "").trim();
                const stateNow = String(document.getElementById("txtStateDataEntry")?.value || "").trim().toUpperCase();
                const visibleLocation = `${cityNow}||${stateNow}`;

                if (delay === 0 || visibleLocation !== lastVisibleLocation) {
                    try {
                        frt7CanonicalizeSavedCityFieldOnlyV189(`${reason} +${delay}ms`);
                    } catch (_) {}
                    const cityAfter = String(document.getElementById("txtCityDataEntry")?.value || "").trim();
                    const stateAfter = String(document.getElementById("txtStateDataEntry")?.value || "").trim().toUpperCase();
                    lastVisibleLocation = `${cityAfter}||${stateAfter}`;
                }

                frt7CityCanonicalizerQueueV190.timers =
                    frt7CityCanonicalizerQueueV190.timers.filter(id => id !== timer);
            }, delay);
            frt7CityCanonicalizerQueueV190.timers.push(timer);
        });
    }


    // AUTO CITY v75:
    // Use the existing trusted City pipeline, but keep retrying briefly when the
    // first pass finds nothing. WallStJobs sometimes exposes txtResumeRaw before
    // the applicant's resume text has fully settled, so a single early scan can
    // miss a valid city and then appear to work only after a full refresh.
    //
    // IMPORTANT: a manual City edit ALWAYS wins. Every retry re-checks the
    // per-applicant manual-contact lock before touching the field.
    function queueDelayedCityButtonClick(reason = "resume load") {
        if (window.__frt7_auto_city_enabled === false) return;
        if (frt7HumanTouchedLocation()) return;

        const startedAt = Date.now();
        const maxRetryMs = 2000;

        if (delayedCityClickTimer) {
            clearTimeout(delayedCityClickTimer);
            delayedCityClickTimer = null;
        }

        const attempt = () => {
            delayedCityClickTimer = null;
            if (window.__frt7_auto_city_enabled === false) return;

            const rawText = String(getResumeText() || "");
            const cityBtn = document.getElementById("frt7-cityonly-btn");
            const cityInput = document.getElementById("txtCityDataEntry");

            // Wait for the actual new resume source and City field/button.
            if (!rawText.trim() || !cityBtn || !cityInput) {
                if (Date.now() - startedAt < 2000) {
                    delayedCityClickTimer = setTimeout(attempt, 400);
                } else {
                    console.warn("Toolbar AUTO CITY: txtResumeRaw/city field never became ready within 2s.");
                }
                return;
            }

            // A real manual city correction must win for this applicant.
            // This is checked on EVERY retry, not just the first pass.
            if (isManualContactLocked("city", cityInput)) {
                console.info("Toolbar AUTO CITY: stopped because user edited the city.");
                return;
            }

            // v297 SOURCE CITY/STATE EARLY LOCK:
            // The delayed Auto path has its own direct v237 header writer and therefore
            // can bypass fillCityOnlyFromResume entirely. For Career Builder / Resume
            // Library, a populated source City+State must stop this path BEFORE any
            // resume/header city scan. ZIP repair is handled by the normal ZIP pass.
            if (frt7SourceProtectionAllowed()) {
                const sourceNameV297 = frt7IsCareerBuilderSource() ? "Career Builder" : "Resume Library";
                const sourceStateInputV297 = document.getElementById("txtStateDataEntry");
                const sourceCityV297 = normalizeContactDisplayCase(String(cityInput?.value || "").trim());
                const sourceStateV297 = String(sourceStateInputV297?.value || "").trim().toUpperCase();
                if (sourceCityV297 && /^[A-Z]{2}$/.test(sourceStateV297)) {
                    console.info(`Toolbar AUTO CITY v297: ${sourceNameV297} early source lock; kept ${sourceCityV297}, ${sourceStateV297} and skipped delayed/header city detection.`);
                    const currentSignatureV297 = getCurrentApplicantSignature();
                    if (currentSignatureV297) delayedCityClickSignature = currentSignatureV297;
                    return;
                }
            }

            // v237 AUTHORITATIVE TRUSTED HEADER PAIR:
            // If the ACTUAL resume header contains a City, ST pair that exists in
            // either the user's Learned Cities or the active U.S. City Database,
            // that header pair ALWAYS wins over whatever WallStJobs pre-populated.
            // This is a direct Auto write -- it does NOT simulate/click City or City/ST.
            // Human City/State edits remain protected.
            const v237HeaderLoc =
                findTrustedLearnedCityInHeader(rawText) ||
                findUsCityDatabaseInHeader(rawText) ||
                findUsCityZipInHeaderV171(rawText);

            if (v237HeaderLoc?.city && /^[A-Z]{2}$/.test(String(v237HeaderLoc.state || "").trim().toUpperCase())) {
                const stateInput = document.getElementById("txtStateDataEntry");
                const wantedCity = normalizeContactDisplayCase(v237HeaderLoc.city);
                const wantedState = String(v237HeaderLoc.state || "").trim().toUpperCase();
                const cityLocked = isManualContactLocked("city", cityInput);
                const stateLocked = stateInput ? isManualContactLocked("state", stateInput) : false;

                if (!cityLocked && !stateLocked && stateInput) {
                    const oldCity = normalizeContactDisplayCase(String(cityInput.value || "").trim());
                    const oldState = String(stateInput.value || "").trim().toUpperCase();

                    if (oldCity !== wantedCity) {
                        cityInput.value = wantedCity;
                        triggerEvents(cityInput);
                    }
                    if (oldState !== wantedState) {
                        stateInput.value = wantedState;
                        triggerEvents(stateInput);
                    }

                    try {
                        frt7SetAuthoritativeHeaderLocation(
                            { ...v237HeaderLoc, city: wantedCity, state: wantedState },
                            "v237 trusted header pair wins"
                        );
                    } catch (_) {}

                    const currentSignature = getCurrentApplicantSignature();
                    if (currentSignature) delayedCityClickSignature = currentSignature;
                    console.info(
                        `Toolbar AUTO CITY v237: trusted HEADER pair wins -> ${wantedCity}, ${wantedState}` +
                        ` (was ${oldCity || "(blank)"}, ${oldState || "(blank)"}).`
                    );
                    return;
                }
            }

            // v119 SAVED HEADER CITY FIRST, OTHERWISE PRESERVE VALID LOCATION:
            // Priority is:
            //   1) If a Saved/Trusted City+State is found in the actual resume header,
            //      allow the existing Auto City logic below to use it, even if the
            //      WallStJobs City/State/ZIP currently match.
            //   2) If there is NO Saved/Trusted header city and WallStJobs already has
            //      a complete City + State + ZIP with an explicit State/ZIP MATCH,
            //      leave that existing valid location completely alone.
            //
            // This prevents a stray learned city elsewhere in the resume (such as
            // "Ava, LA") from replacing a valid Houston, TX 77001, while still keeping
            // the user's Saved-header-city priority intact.
            // v148 HEADER DATABASE PAIR PRIORITY:
            // Before preserving WallStJobs' already-populated City/State/ZIP, explicitly
            // check the built-in U.S. City Database for a TRUE-header City, ST pair.
            // This prevents a site parse such as Everett, WA from surviving when the
            // header explicitly says Elon, NC.
            const resumeTextForValidGuard = getResumeText();
            const explicitDbHeaderLocForValidGuard =
                findUsCityDatabaseInHeader(resumeTextForValidGuard) ||
                findUsCityZipInHeaderV171(resumeTextForValidGuard);

            const trustedHeaderLocForValidGuard =
                findExplicitLocationInLiteralRawContact() ||
                findExplicitRemoteHybridHeaderCity(resumeTextForValidGuard) ||
                findTrustedLearnedCityInHeader(resumeTextForValidGuard) ||
                explicitDbHeaderLocForValidGuard;
            const trustedHeaderStateForValidGuard = String(
                trustedHeaderLocForValidGuard?.state || ""
            ).trim().toUpperCase();
            const hasTrustedHeaderForValidGuard = Boolean(
                trustedHeaderLocForValidGuard?.city &&
                /^[A-Z]{2}$/.test(trustedHeaderStateForValidGuard)
            );

            const existingState = String(
                document.getElementById("txtStateDataEntry")?.value || ""
            ).trim().toUpperCase();
            const existingZip = String(
                document.getElementById("txtZipDataEntry")?.value || ""
            ).trim();
            let existingCity = String(cityInput.value || "").trim();

            // v188 CITY-FIELD-ONLY CANONICAL SAVED-CITY CLEANUP:
            // If the City field contains extra words around a City+State pair that exists
            // in EITHER Saved/Learned Cities OR the active U.S. City Database, strip the
            // City field down to ONLY that canonical city name. This patch intentionally
            // writes NO field except City. State/ZIP/Phone/Email/Name logic is untouched.
            function frt7CanonicalizeCurrentCityFieldOnly() {
                const currentState = String(
                    document.getElementById("txtStateDataEntry")?.value || ""
                ).trim().toUpperCase();
                const currentCity = String(cityInput.value || "").trim();

                if (
                    !currentCity ||
                    !/^[A-Z]{2}$/.test(currentState) ||
                    isManualContactLocked("city", cityInput)
                ) return currentCity;

                const normalizedWhole = normalizeLearnedCity(currentCity);
                // v315: A complete, valid city must never be shortened merely because
                // another city name is contained inside it (New York -> York).
                // Check the active city database, saved pairs, and area-code cities.
                const wholeCityIsKnown =
                    (usCityDbLoaded && isUsCityDatabasePair(currentCity, currentState)) ||
                    Object.values(learnedCitiesCache || {}).some(entry =>
                        entry && entry.deleted !== true && entry.city &&
                        String(entry.state || "").trim().toUpperCase() === currentState &&
                        normalizeLearnedCity(entry.city) === normalizedWhole
                    ) ||
                    Object.values(AREA_CODE_LOOKUP || {}).some(entry =>
                        entry && String(entry.state || "").trim().toUpperCase() === currentState &&
                        normalizeLearnedCity(entry.city) === normalizedWhole
                    );
                if (wholeCityIsKnown) return currentCity;
                const candidates = new Map();

                const addCandidate = cityValue => {
                    const savedCity = normalizeContactDisplayCase(String(cityValue || "").trim());
                    const savedNorm = normalizeLearnedCity(savedCity);
                    if (!savedCity || !savedNorm || savedNorm === normalizedWhole) return;
                    candidates.set(savedNorm, savedCity);
                };

                // User Saved/Learned City+State pairs.
                for (const entry of Object.values(learnedCitiesCache || {})) {
                    if (
                        entry && entry.deleted !== true && entry.city &&
                        entry.trustedManualCity !== false &&
                        String(entry.state || "").trim().toUpperCase() === currentState
                    ) addCandidate(entry.city);
                }

                // Built-in U.S. City Database rows for this exact state. Disabled rows
                // are excluded by the active pair set; custom DB overrides are included.
                if (usCityDbLoaded) {
                    for (const row of usCityDbRows || []) {
                        if (String(row?.state || "").trim().toUpperCase() !== currentState) continue;
                        if (!isUsCityDatabasePair(row.city, currentState)) continue;
                        addCandidate(row.city);
                    }
                    for (const ov of Object.values(usCityDbOverrides || {})) {
                        if (
                            ov && ov.disabled !== true && ov.city &&
                            String(ov.state || "").trim().toUpperCase() === currentState &&
                            isUsCityDatabasePair(ov.city, currentState)
                        ) addCandidate(ov.city);
                    }
                }

                const contained = [...candidates.values()]
                    .filter(savedCity => {
                        const esc = savedCity.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                                             .replace(/\s+/g, "\\s+");
                        return new RegExp(
                            "(^|[^A-Za-zÀ-ÖØ-öø-ÿ])" + esc +
                            "(?=$|[^A-Za-zÀ-ÖØ-öø-ÿ])",
                            "i"
                        ).test(currentCity);
                    })
                    // Prefer the longest valid City+State match if names overlap.
                    .sort((a, b) => b.length - a.length);

                if (!contained.length) return currentCity;

                // v315: Do not strip meaningful leading words from compound
                // place names even when a shorter city is also in the database.
                // This is a conservative veto; ambiguous names stay unchanged.
                if (/^(?:New|North|South|East|West|Fort|Mount|Saint|St\.?|Lake|Port|San|Santa|Los|Las|El|La)\s+/i.test(currentCity)) {
                    return currentCity;
                }

                const exactSavedCity = contained[0];
                console.info(
                    `Toolbar AUTO CITY v188: City-only cleanup "${currentCity}" -> ` +
                    `"${exactSavedCity}" (${currentState}).`
                );
                cityInput.value = exactSavedCity;
                triggerEvents(cityInput);
                return exactSavedCity;
            }

            existingCity = frt7CanonicalizeCurrentCityFieldOnly();

            // v148 LAST-NAME PRESERVE VETO:
            // Even if WallStJobs says its State/ZIP match, never bless the existing
            // City when that City is literally the applicant's Last Name.
            const existingCityIsApplicantLastName =
                Boolean(existingCity) &&
                learnedCityCollidesWithApplicantLastName(existingCity);

            if (existingCityIsApplicantLastName) {
                console.info(
                    `Toolbar AUTO CITY v148: existing website city "${existingCity}" matches applicant Last Name; ` +
                    "refusing valid-location preservation."
                );
            }

            // v183 SAVED-CITY-ONLY PRESERVE GUARD:
            // A green State/ZIP match is NOT enough reason to preserve arbitrary text
            // in the City field. WallStJobs can preload flattened header junk such as
            // "Support Contact San Antonio" while State=TX and ZIP=78218 still validate.
            //
            // Preserve the existing City only when the ENTIRE field is exactly one of
            // our active saved/trusted City+State pairs. Merely containing a saved city
            // as a suffix/prefix does not qualify; the normal trusted-city pass below
            // must then normalize the field to the exact saved city (e.g. San Antonio).
            const normalizedExistingCityForSavedGuard =
                normalizeLearnedCity(normalizeContactDisplayCase(existingCity));
            const existingCityIsExactSavedPair = Object.values(learnedCitiesCache || {}).some(entry =>
                entry &&
                entry.deleted !== true &&
                entry.city &&
                entry.trustedManualCity !== false &&
                normalizeLearnedCity(normalizeContactDisplayCase(entry.city)) === normalizedExistingCityForSavedGuard &&
                String(entry.state || "").trim().toUpperCase() === existingState
            );

            if (
                !hasTrustedHeaderForValidGuard &&
                !existingCityIsApplicantLastName &&
                existingCityIsExactSavedPair &&
                existingCity &&
                /^[A-Z]{2}$/.test(existingState) &&
                existingZip &&
                getWebsiteZipStatus() === "match"
            ) {
                // v125 LOAD-RACE FIX: Do not permanently bless the website's existing
                // location while the U.S. City Database is still loading. The resume may
                // contain an explicit City, ST pair that will become trusted as soon as
                // the database is ready. Keep retrying within the normal retry window.
                if (!usCityDbLoaded && usCityDbLoading) {
                    console.info(
                        `Toolbar AUTO CITY v125: U.S. city database still loading; delaying valid-location preservation for ${existingCity}, ${existingState} ${existingZip}.`
                    );
                    if (Date.now() - startedAt < maxRetryMs) {
                        delayedCityClickTimer = setTimeout(attempt, 700);
                    }
                    return;
                }

                delayedCityClickSignature = getCurrentApplicantSignature();
                console.info(
                    `Toolbar AUTO CITY v125: no trusted header city; existing valid location preserved -> ${existingCity}, ${existingState} ${existingZip}.`
                );
                return;
            }

            const currentSignature = getCurrentApplicantSignature();
            if (currentSignature && delayedCityClickSignature === currentSignature) return;

            const beforeCity = String(cityInput.value || "").trim();
            console.info(`Toolbar AUTO CITY v75: trusted-city scan after resume load (${reason}).`);
            const result = fillCityOnlyFromResume({ trustedOnly: true });
            // v188: The autofiller itself can also leave extra words in City. Run the
            // same City-only canonicalizer after the existing fill, without touching
            // any other field.
            frt7CanonicalizeCurrentCityFieldOnly();
            const afterCity = String(cityInput.value || "").trim();

            // Success means the trusted-city routine explicitly succeeded OR the
            // City field changed/populated as a result of this pass. Only then mark
            // this applicant as completed.
            const succeeded = result === true || (afterCity && afterCity !== beforeCity);
            if (succeeded) {
                delayedCityClickSignature = currentSignature;
                console.info(`Toolbar AUTO CITY v75: city filled successfully: "${afterCity}".`);
                return;
            }

            // Do not mark the applicant complete after a miss. Retry while the page
            // settles, unless the user manually edits City in the meantime.
            if (Date.now() - startedAt < maxRetryMs) {
                delayedCityClickTimer = setTimeout(attempt, 700);
            } else {
                console.info("Toolbar AUTO CITY v75: no trusted city found after retry window; leaving City unchanged.");
            }
        };

        delayedCityClickTimer = setTimeout(attempt, frt7FirstAutoDelay(1500));
    }

    function clickCityButtonOnceWhenResumeLoads() {
        queueDelayedCityButtonClick("resume load");
    }

    // v130 DIRECT AUTO CITY RECONCILER:
    // Keep the current working Auto system exactly as-is, but add one narrow safety
    // reconciliation for City. The manual City button already proves that the trusted
    // header matcher correctly finds Fort Worth. The remaining failure is that the site
    // can leave/repaint Arlington after the normal Auto pass.
    //
    // This does NOT click the City button. It directly runs the same trusted-city logic
    // and keeps the FIRST valid saved/trusted city in the true resume header authoritative
    // while the applicant page is settling.
    function queueFirstTrustedHeaderCityReconcile(reason = "resume load") {
        // v169: DISABLED.
        //
        // The normal Auto City path already calls queueDelayedCityButtonClick(), which
        // resolves the trusted header City and fills it. v130 added a second repeating
        // City owner whose job was to keep that City authoritative for ~2 seconds.
        // That is exactly what can fight a human correction. City Auto is now one-shot.
        return;
    }

    // v150 STICKY EXPLICIT HEADER LOCATION:
    // The video proved the correct header pair can be applied first and then be
    // overwritten several seconds later. Do not solve that with longer polling.
    // Instead, once an explicit TRUE-header pair is resolved, keep that exact pair
    // authoritative for this applicant against later PROGRAMMATIC/site repaints.
    // A genuine human edit still wins immediately.
    let frt7AuthoritativeHeaderLocation = null;
    let frt7AuthoritativeLocationWriteInProgress = false;

    function frt7AuthoritativeLocationKey() {
        try {
            const appId = getCurrentApplicantId();
            if (appId) return `app:${appId}`;
        } catch (_) {}
        return getApplicantLifecycleKey() || "";
    }

    // v347: A trusted location must contain an actual city name, not punctuation.
    function frt7ValidHeaderCity(loc) {
        const city = String(loc?.city || "").trim();
        const state = String(loc?.state || "").trim().toUpperCase();
        return /[A-Za-zÀ-ÖØ-öø-ÿ]/.test(city) &&
            !/^[^A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(city) &&
            /^[A-Z]{2}$/.test(state);
    }

    // v359: A complete existing address explicitly printed beside the applicant's
    // own phone/email in the resume is stronger than employer/education cities.
    // Scan the full flattened resume because Word sidebars may appear after Skills.
    // Require exact City + State + ZIP, and a nearby matching contact identifier.
    // v360: Cover-letter recipient locations are not applicant addresses.
    // Preserve an existing complete location when the applicant identifies their
    // state at the top, and a later Hiring Manager / Dear... recipient block
    // contains a different city/state. Never affects the manual Area button.
    function frt7ProtectCoverLetterApplicantLocation() {
        const raw = String(document.getElementById("txtResumeRaw")?.value || getResumeText() || "");
        const city = String(document.getElementById("txtCityDataEntry")?.value || "").trim();
        const state = String(document.getElementById("txtStateDataEntry")?.value || "").trim().toUpperCase();
        const zip = String(document.getElementById("txtZipDataEntry")?.value || "").trim();
        if (!city || !/^[A-Z]{2}$/.test(state) || !/^\d{5}(?:-\d{4})?$/.test(zip)) return false;
        const start = raw.slice(0, 300);
        const status = start.match(/\b(?:remote|hybrid)\s*[-–—:,/]\s*([A-Z]{2})\b/i);
        if (!status || status[1].toUpperCase() !== state) return false;
        const recipient = raw.search(/\b(?:Hiring Manager|Dear Hiring Manager|To Whom It May Concern)\b/i);
        if (recipient < 0 || recipient > 600) return false;
        // A named recipient block and greeting confirm this is a cover letter.
        if (!/\bDear\s+(?:Hiring Manager|[A-Z][a-z]+)\b/i.test(raw.slice(recipient, recipient + 500))) return false;
        console.info(`Toolbar CITY v360: cover-letter recipient address excluded; kept existing applicant ${city}, ${state} ${zip} (header says ${status[0]}).`);
        return true;
    }

    // v361: Resolve cover-letter applicant location BEFORE any learned city matcher.
    // The v360 boolean check alone was too late for the early trusted-header path.
    function frt7CoverLetterExistingLocationCandidate() {
        if (!frt7ProtectCoverLetterApplicantLocation()) return null;
        const city = String(document.getElementById("txtCityDataEntry")?.value || "").trim();
        const state = String(document.getElementById("txtStateDataEntry")?.value || "").trim().toUpperCase();
        const zip = String(document.getElementById("txtZipDataEntry")?.value || "").trim();
        return { city, state, zip, trusted:true, withState:true,
            explicitHeaderPair:true, coverLetterApplicantGuard:true, index:0 };
    }

    function frt7VerifiedExistingContactLocation() {
        const city = normalizeContactDisplayCase(document.getElementById("txtCityDataEntry")?.value || "");
        const state = String(document.getElementById("txtStateDataEntry")?.value || "").trim().toUpperCase();
        const zip = String(document.getElementById("txtZipDataEntry")?.value || "").trim();
        if (!city || !/^[A-Z]{2}$/.test(state) || !/^\d{5}(?:-\d{4})?$/.test(zip)) return null;
        const raw = String(document.getElementById("txtResumeRaw")?.value || "");
        if (!raw) return null;
        const escaped = city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[’']/g, "['’]").replace(/\s+/g, "\\s+");
        const re = new RegExp("(^|[^A-Za-z])(" + escaped + ")\\s*,?\\s*" + state + "\\s*[-, ]\\s*" + zip.slice(0,5) + "(?!\\d)", "ig");
        const phone = String(document.getElementById("txtPhoneDataEntry")?.value || document.getElementById("txtPhone")?.value || "").replace(/\D/g, "").slice(-10);
        const email = String(document.getElementById("txtEmail")?.value || "").trim().toLowerCase();
        let match;
        while ((match = re.exec(raw))) {
            const near = raw.slice(Math.max(0, match.index - 160), match.index + match[0].length + 260);
            const digits = near.replace(/\D/g, "");
            if ((phone.length === 10 && digits.includes(phone)) || (email.includes("@") && near.toLowerCase().includes(email))) {
                return {city, state, zip, trusted:true, withState:true, explicitHeaderPair:true, verifiedContact:true};
            }
        }
        return null;
    }

    function frt7SetAuthoritativeHeaderLocation(loc, reason = "header") {
        const state = String(loc?.state || "").trim().toUpperCase();
        const city = normalizeContactDisplayCase(String(loc?.city || "").trim());
        if (!frt7ValidHeaderCity({city, state})) return false;

        frt7AuthoritativeHeaderLocation = {
            key: frt7AuthoritativeLocationKey(),
            city,
            state,
            reason
        };
        return true;
    }

    function frt7GetAuthoritativeHeaderLocation() {
        const lock = frt7AuthoritativeHeaderLocation;
        if (!lock) return null;
        if (lock.key && lock.key !== frt7AuthoritativeLocationKey()) {
            frt7AuthoritativeHeaderLocation = null;
            return null;
        }
        if (!frt7ValidHeaderCity(lock)) { frt7AuthoritativeHeaderLocation = null; return null; }
        return lock;
    }

    function frt7EnforceAuthoritativeHeaderLocation(reason = "programmatic repaint") {
        // v292 TRUSTED LOCATION REPAINT FIX:
        // Diagnostics proved WallStJobs can repaint the ORIGINAL City/State a few
        // hundred milliseconds after Auto has correctly applied an authoritative
        // trusted/header pair. Keep ownership ONLY during the short initial settle
        // window, and NEVER after a real human location interaction.
        const lock = frt7GetAuthoritativeHeaderLocation();
        if (!lock?.city || !/^[A-Z]{2}$/.test(String(lock.state || "").toUpperCase())) return false;
        if (frt7HumanTouchedLocation()) return false;

        const cityInput = document.getElementById("txtCityDataEntry");
        const stateInput = document.getElementById("txtStateDataEntry");
        if (!cityInput || !stateInput) return false;
        if (isManualContactLocked("city", cityInput) || isManualContactLocked("state", stateInput)) return false;

        const wantedCity = normalizeContactDisplayCase(String(lock.city || "").replace(/[,;]+\s*$/, ""));
        const wantedState = String(lock.state || "").trim().toUpperCase();
        const currentCity = normalizeContactDisplayCase(String(cityInput.value || "").trim());
        const currentState = String(stateInput.value || "").trim().toUpperCase();
        if (currentCity === wantedCity && currentState === wantedState) return false;

        frt7AuthoritativeLocationWriteInProgress = true;
        try {
            if (currentCity !== wantedCity) {
                cityInput.value = wantedCity;
                triggerEvents(cityInput);
            }
            if (currentState !== wantedState) {
                stateInput.value = wantedState;
                triggerEvents(stateInput);
            }
        } finally {
            frt7AuthoritativeLocationWriteInProgress = false;
        }
        console.info(`Toolbar CITY v292: restored authoritative trusted location ${wantedCity}, ${wantedState} after ${reason}.`);
        return true;
    }

    function frt7QueueAuthoritativeLocationSettleGuard(reason = "trusted City/State fill") {
        const lock = frt7GetAuthoritativeHeaderLocation();
        if (!lock) return;
        const expectedKey = lock.key;
        // The observed failure happened ~300ms after the correct write. These sparse
        // checks cover only the existing <=2s applicant-settle period; there is no
        // permanent polling and a human touch cancels ownership immediately.
        for (const delay of [250, 500, 900, 1400]) {
            setTimeout(() => {
                const live = frt7GetAuthoritativeHeaderLocation();
                if (!live || live.key !== expectedKey || frt7HumanTouchedLocation()) return;
                frt7EnforceAuthoritativeHeaderLocation(`${reason} settle +${delay}ms`);
            }, delay);
        }
    }

    // v323 DISPLAY FORMAT ONLY: retain the exact ten phone digits and existing
    // selection/validation rules; normalize only the visible contact field.
    function frt7FormatPhoneDisplay() {
        const el = document.querySelector("#txtPhoneDataEntry") || document.querySelector("#txtPhone");
        if (!el) return;
        let digits = String(el.value || "").replace(/\D/g, "");
        if (digits.length === 11 && digits[0] === "1") digits = digits.slice(1);
        if (digits.length !== 10 || !isUsableTenDigitPhone(digits)) return;
        const formatted = `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`;
        if (el.value !== formatted) el.value = formatted;
    }
    document.addEventListener("change", e => {
        if (e.target?.matches?.("#txtPhoneDataEntry, #txtPhone"))
            queueMicrotask(frt7FormatPhoneDisplay);
    }, true);
    document.addEventListener("blur", e => {
        if (e.target?.matches?.("#txtPhoneDataEntry, #txtPhone"))
            queueMicrotask(frt7FormatPhoneDisplay);
    }, true);

    // v28 MANUAL CONTACT LOCK:
    // A human edit ALWAYS wins over Auto for the rest of the current applicant.
    // Store the protection by applicant lifecycle key as well as on the DOM node,
    // because WallStJobs can replace/repaint contact inputs after the user edits them.
    // A DOM-only dataset flag is lost when that happens, which was why Email could
    // "correct" a user's manual change back to the resume value.
    const frt7ManualContactLocks = new Map();

    // v211 PHONE REPAINT / FALSE MANUAL-LOCK FIX:
    // WallStJobs itself can repaint #txtPhoneDataEntry with a parsed/reference number
    // using synthetic input/change events while a new applicant is loading. v104 treated
    // every such synthetic change as a human override, which could lock the wrong number
    // before Auto Phone had a chance to replace it with the first/header resume phone.
    // Only a synthetic phone change that follows a real trusted phone-field interaction
    // is now treated as a manual popup/control action. Normal trusted typing is still
    // protected by the existing generic manual-contact listener below.
    let frt7RecentPhoneUserIntentAt = 0;
    const frt7PhoneUserIntentSelector = "#txtPhoneDataEntry, #txtPhone";
    for (const intentEvent of ["pointerdown", "mousedown", "keydown", "beforeinput", "paste", "cut"]) {
        document.addEventListener(intentEvent, event => {
            if (!event?.isTrusted) return;
            const target = event.target;
            if (!(target instanceof Element) || !target.matches(frt7PhoneUserIntentSelector)) return;
            frt7RecentPhoneUserIntentAt = Date.now();
        }, true);
    }

    // v169 CITY AUTO OWNERSHIP RULE:
    // Auto City may choose/fill the location during the initial applicant pass.
    // After a human physically touches City/State/ZIP, NO automatic City/location
    // writer may choose a different location for this applicant.
    //
    // Keep this marker deliberately simple and keyed only by the stable ?app= ID.
    let frt7HumanLocationTouchAppId = "";

    function frt7StableCurrentAppId() {
        try { return String(getCurrentApplicantId() || "").trim(); }
        catch (_) {
            const m = String(location.href || "").match(/[?&]app=([^&#]+)/i);
            return m ? String(m[1]) : "";
        }
    }

    function frt7HumanTouchedLocation() {
        const appId = frt7StableCurrentAppId();
        return Boolean(appId && frt7HumanLocationTouchAppId === appId);
    }

    function frt7MarkHumanLocationTouch(reason = "manual") {
        const appId = frt7StableCurrentAppId();
        if (!appId) return;
        frt7HumanLocationTouchAppId = appId;

        // Also arm all existing per-field guards.
        const key = getManualContactApplicantKey();
        if (key) {
            let locked = frt7ManualContactLocks.get(key);
            if (!locked) {
                locked = new Set();
                frt7ManualContactLocks.set(key, locked);
            }
            locked.add("city");
            locked.add("state");
            locked.add("zip");
        }

        // Cancel the ordinary delayed City retry if one is still pending.
        try {
            if (delayedCityClickTimer) {
                clearTimeout(delayedCityClickTimer);
                delayedCityClickTimer = null;
            }
        } catch (_) {}

        console.info(`Toolbar CITY v169: human location takeover (${reason}); Auto City is finished for app ${appId}.`);
    }

    function getManualContactFieldKey(el) {
        if (!el || !(el instanceof Element)) return "";
        if (el.matches("#txtFirstNameDataEntry, #txtFirstName")) return "first";
        if (el.matches("#txtLastNameDataEntry, #txtLastName")) return "last";
        if (el.matches("#txtEmail")) return "email";
        if (el.matches("#txtPhoneDataEntry, #txtPhone")) return "phone";
        if (el.matches("#txtCityDataEntry")) return "city";
        if (el.matches("#txtStateDataEntry")) return "state";
        if (el.matches("#txtZipDataEntry")) return "zip";
        return "";
    }

    function getManualContactApplicantKey() {
        // v132 MANUAL NAME/CONTACT LOCK STABILITY:
        // Prefer the WallStJobs applicant ID for manual-edit protection. The broader
        // lifecycle key includes a raw-resume fingerprint, which can legitimately
        // change while the SAME applicant is still settling/repainting. If a user
        // edits First/Last during that window, tying the lock to the fingerprint can
        // make the edit look like it belonged to a previous applicant and Auto Name
        // can overwrite it. Applicant ID is stable for the row and still changes
        // when we truly move to another applicant. Fall back to the old lifecycle
        // identity only on pages where no applicant ID exists.
        try {
            const appId = getCurrentApplicantId();
            if (appId) return `app:${appId}`;
            return getApplicantLifecycleKey() || getCurrentApplicantSignature() || String(location.href || "");
        } catch (_) {
            return getCurrentApplicantSignature?.() || String(location.href || "");
        }
    }

    function markManualContactEdit(el) {
        const field = getManualContactFieldKey(el);
        if (!field) return;
        const key = getManualContactApplicantKey();
        if (!key) return;
        let locked = frt7ManualContactLocks.get(key);
        if (!locked) {
            locked = new Set();
            frt7ManualContactLocks.set(key, locked);
        }
        locked.add(field);
        // v76: DOM inputs can be reused by WallStJobs for the next applicant.
        // Store WHICH applicant owns this edit marker instead of a global "1".
        // That keeps a human edit protected on this applicant without carrying the
        // lock into the next applicant when the same input element is recycled.
        try {
            el.dataset.frt7UserEdited = "1";
            el.dataset.frt7UserEditedKey = key;
        } catch (_) {}
        console.info(`Toolbar MANUAL LOCK v76: ${field} protected for current applicant.`);
    }

    function isManualContactLocked(field, el = null) {
        const key = getManualContactApplicantKey();

        if (
            (field === "city" || field === "state" || field === "zip") &&
            frt7HumanTouchedLocation()
        ) {
            return true;
        }

        // v76: A dataset marker is valid ONLY for the applicant that created it.
        // Clear stale markers left on DOM nodes that WallStJobs reused.
        if (el?.dataset?.frt7UserEdited === "1") {
            const markerKey = String(el.dataset.frt7UserEditedKey || "");
            if (key && markerKey === key) return true;
            try {
                delete el.dataset.frt7UserEdited;
                delete el.dataset.frt7UserEditedKey;
            } catch (_) {}
        }

        return Boolean(key && frt7ManualContactLocks.get(key)?.has(field));
    }

    // v120 EMAIL INITIAL-REPAINT LOCK FIX:
    // WallStJobs can programmatically repaint #txtEmail while a new applicant is
    // still settling. v77 correctly treats later programmatic popup changes as a
    // user override, but an initial site repaint can therefore create a false
    // manual Email lock before Auto Email gets its first stable pass.
    //
    // Clear ONLY Email's lock, ONLY once for the newly stabilized lifecycle key.
    // Normal typing remains protected, and later popup/programmatic Email changes
    // still create the same applicant-scoped manual lock as before.
    function clearInitialEmailManualLockForApplicant(key, emailInput) {
        if (!key) return;

        const locked = frt7ManualContactLocks.get(key);
        if (locked?.has("email")) {
            locked.delete("email");
            if (!locked.size) frt7ManualContactLocks.delete(key);
        }

        try {
            if (
                emailInput?.dataset?.frt7UserEdited === "1" &&
                String(emailInput.dataset.frt7UserEditedKey || "") === key
            ) {
                delete emailInput.dataset.frt7UserEdited;
                delete emailInput.dataset.frt7UserEditedKey;
            }
        } catch (_) {}
    }

    function isNameManuallyLocked(firstEl = null, lastEl = null) {
        return isManualContactLocked("first", firstEl) || isManualContactLocked("last", lastEl);
    }

    // v47: User-driven controls that change a contact field must count exactly
    // like typing in that field. WallStJobs' "Clear Phone" button clears the input
    // programmatically, so the resulting input/change event is not trusted and the
    // older manual-edit listener could miss it. Lock Phone BEFORE that button's
    // handler runs so Auto Phone can never put the number back on this applicant.
    document.addEventListener("click", event => {
        const control = event.target instanceof Element
            ? event.target.closest("button, input[type='button'], input[type='submit'], a")
            : null;
        if (!control) return;

        const label = String(
            control.value ||
            control.innerText ||
            control.textContent ||
            control.title ||
            ""
        ).replace(/\s+/g, " ").trim().toLowerCase();

        if (/^clear\s+phone\b/.test(label)) {
            const phoneInput =
                document.querySelector("#txtPhoneDataEntry") ||
                document.querySelector("#txtPhone");

            if (phoneInput) {
                markManualContactEdit(phoneInput);
                // Mark the authoritative Auto Phone reconciler satisfied for this
                // applicant too. The manual lock is the real protection; this simply
                // prevents unnecessary retry work.
                try {
                    frt7PhoneV28LastSatisfiedKey = getApplicantLifecycleKey();
                } catch (_) {}
                console.info("Toolbar PHONE v47: Clear Phone is a manual override; Auto Phone stopped for this applicant.");
            }
        }
    }, true);

    const manualContactSelector =
        "#txtEmail, #txtPhoneDataEntry, #txtPhone, #txtFirstNameDataEntry, #txtFirstName, " +
        "#txtLastNameDataEntry, #txtLastName, #txtCityDataEntry, #txtStateDataEntry, #txtZipDataEntry";

    const frt7LocationHumanSelector =
        "#txtCityDataEntry, #txtStateDataEntry, #txtZipDataEntry";

    for (const eventType of ["pointerdown", "mousedown", "keydown", "beforeinput", "paste", "cut"]) {
        document.addEventListener(eventType, event => {
            if (!event?.isTrusted) return;
            const target = event.target;
            if (!(target instanceof Element) || !target.matches(frt7LocationHumanSelector)) return;
            frt7MarkHumanLocationTouch(eventType);
        }, true);
    }

    // beforeinput catches the edit before a framework can repaint the input;
    // input/change/paste/cut cover normal typing, selects, paste, and deletion.
    //
    // v77 EMAIL POPUP FIX: a user-facing popup may set #txtEmail from JavaScript,
    // which makes its resulting input/change event isTrusted=false. Treat those
    // popup-driven Email events as manual UNLESS they are inside one of this
    // toolbar's explicitly tagged internal Email writes.
    for (const eventType of ["beforeinput", "input", "change", "paste", "cut"]) {
        document.addEventListener(eventType, event => {
            if (!(event.target instanceof Element) || !event.target.matches(manualContactSelector)) return;

            if (event?.isTrusted) {
                markManualContactEdit(event.target);
                if (event.target.matches("#txtCityDataEntry, #txtStateDataEntry, #txtZipDataEntry")) {
                    frt7MarkHumanLocationTouch(eventType);
                }
                return;
            }

            if (
                event.target.matches("#txtEmail") &&
                (eventType === "input" || eventType === "change") &&
                frt7InternalEmailWriteDepth === 0
            ) {
                // v289: Auto Email owns a short applicant-scoped settle/repaint
                // window. Synthetic events inside it are WallStJobs/Auto fallout,
                // not evidence that the user manually edited Email.
                if (frt7IsAutoEmailSettling()) {
                    console.info("Toolbar EMAIL v289: ignored synthetic Email event during Auto-owned settle window; Auto Email remains allowed to finish.");
                } else {
                    markManualContactEdit(event.target);

                    // Stop any already-scheduled Auto Email retry immediately. The
                    // applicant-scoped lock remains the authoritative protection.
                    if (delayedEmailClickTimer) {
                        clearTimeout(delayedEmailClickTimer);
                        delayedEmailClickTimer = null;
                    }

                    console.info("Toolbar EMAIL v77: popup/programmatic user change counted as manual; Auto Email stopped for this applicant.");
                }
            }

            // v211 PHONE MANUAL OVERRIDE:
            // Synthetic input/change events are NOT automatically human edits anymore.
            // WallStJobs uses the same kind of synthetic event while initially painting
            // a phone value, and that used to falsely lock a later reference number.
            // Preserve popup/control overrides only when a real trusted interaction with
            // the Phone field happened immediately beforehand.
            if (
                event.target.matches("#txtPhoneDataEntry, #txtPhone") &&
                (eventType === "input" || eventType === "change") &&
                !window.__frt7_internal_phone_write_in_progress
            ) {
                const recentHumanPhoneIntent =
                    frt7RecentPhoneUserIntentAt > 0 &&
                    (Date.now() - frt7RecentPhoneUserIntentAt) <= 2500;

                if (recentHumanPhoneIntent) {
                    markManualContactEdit(event.target);
                    try { frt7PhoneV28LastSatisfiedKey = getApplicantLifecycleKey(); } catch (_) {}
                    console.info("Toolbar PHONE v211: user-driven programmatic phone change counted as manual; Auto Phone stopped for this applicant.");
                } else {
                    console.info("Toolbar PHONE v211: ignored synthetic site phone repaint; Auto Phone remains allowed to reconcile the resume phone.");
                }
            }
        }, true);
    }

    function normalizePhoneSource(text) {
        return String(text || "")
            // v40: Resume HTML often uses Unicode "non-breaking hyphen" (U+2011),
            // en/em dashes, or other dash characters in phone numbers. Visually
            // they look like ordinary hyphens, but the phone regex previously only
            // accepted ASCII "-". Normalize all common dash variants first.
            .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212\uFE58\uFE63\uFF0D]/g, "-")
            // Some raw resumes preserve HTML entities literally. Their numeric
            // entity codes (for example &#9670; for ♦) must NEVER be mistaken for
            // phone digits. For the specific hyphen entities, preserve them as
            // separators instead of deleting the separation.
            .replace(/&#(?:8208|8209|8210|8211|8212|8213|8722);?/gi, "-")
            .replace(/&#(?:x2010|x2011|x2012|x2013|x2014|x2015|x2212);?/gi, "-")
            .replace(/&#(?:x[0-9a-f]+|\d+);?/gi, " ")
            .replace(/&(?:nbsp|bull|middot|diamond);/gi, " ")
            .replace(/[♦◆◇•·▪●]/g, " ")
            // v272 PRIVATE-USE PHONE-SEPARATOR FALLBACK:
            // Some Word/PDF resumes decode icon-font numeric entities such as
            // &#57473; / &#57474; / &#57480; into Unicode Private Use characters
            // (U+E000-U+F8FF).  When those characters occur between phone groups,
            // treat them only as separators.  This does NOT delete ordinary letters,
            // punctuation, or digits and does not broaden the phone-number rules.
            // Example: \uE081336\uE082 997\uE0883970 -> 336 997 3970.
            .replace(/[\uE000-\uF8FF]/g, " ")
            .replace(/[\u00A0\u2007\u202F]/g, " ");
    }

    // v213 HARD REFERENCE-PHONE EXCLUSION:
    // A phone belonging to a resume reference must NEVER be selected as the applicant's
    // contact phone. This is intentionally checked at every candidate match, including
    // Cell/Mobile labels, ordinary phone matches, and Area-code fallback.
    //
    // Inline examples rejected:
    //   "Reference: Eric Smith (coach) Phone: (408) 623-5058"
    //   "reference : Christina Orozco Phone number: (661) 800-7694"
    //
    // A REFERENCES section is also treated as reference-only until another clear resume
    // section heading begins. This prevents a later reference number from winning just
    // because the applicant's own header phone was missing or oddly formatted.
    function frt7IsReferencePhoneAt(sourceText, phoneIndex) {
        const source = String(sourceText || "");
        const index = Math.max(0, Number(phoneIndex) || 0);
        const before = source.slice(Math.max(0, index - 700), index);
        const compact = before.replace(/\s+/g, " ");

        // Strong inline reference marker close to this exact phone.
        if (/\b(?:professional\s+|personal\s+|employment\s+)?references?\b[^\n]{0,260}$/i.test(compact)) {
            return true;
        }
        if (/\bref(?:erence)?\s*[:#-][^\n]{0,260}$/i.test(compact)) {
            return true;
        }

        // Flattened resumes often have no newlines. Find the most recent REFERENCES
        // marker and make sure a later major section heading did not end that section.
        const upper = compact.toUpperCase();
        const refMatches = [...upper.matchAll(/\bREFERENCES?\b/g)];
        const lastRef = refMatches.length ? refMatches[refMatches.length - 1].index : -1;
        if (lastRef >= 0) {
            const afterRef = upper.slice(lastRef);
            const laterSection = /\b(?:EXPERIENCE|WORK EXPERIENCE|PROFESSIONAL EXPERIENCE|EMPLOYMENT HISTORY|EDUCATION|SKILLS|SUMMARY|OBJECTIVE|CERTIFICATIONS?|LICENSES?|PROJECTS?|VOLUNTEER|AWARDS?)\b/.exec(afterRef.slice(10));
            if (!laterSection) return true;
        }

        return false;
    }

    function frt7CollectReferencePhones(sourceText) {
        const source = normalizePhoneSource(sourceText || "");
        const found = new Set();
        const re = /(?:^|[^\d])(?:\+?1[\s().\/\-]*)?(\d{3})[\s().\/\-]*(\d{3})[\s.\/\-]*(\d{4})(?!\d)/g;
        let m;
        while ((m = re.exec(source))) {
            const matchStart = m.index + (m[0].length - m[0].replace(/^[^\d+]*/, "").length);
            if (frt7IsReferencePhoneAt(source, matchStart)) {
                found.add(`${m[1]}${m[2]}${m[3]}`);
            }
        }
        return found;
    }

    // v321: Medical/billing record identifiers are not applicant phone numbers.
    // Reject the candidate when its digits belong to an identifier token, even
    // when a loose "M" (mobile) label would otherwise match its prefix.
    function frt7IsAdministrativePhoneCandidate(source, start, end) {
        const before = String(source || "").slice(Math.max(0, start - 75), start);
        const after = String(source || "").slice(end, Math.min(String(source || "").length, end + 16));
        if (/(?:STAR[_\s-]*FIN|ENCOUNTER|PATIENT|DOCUMENT|ACCOUNT|CLAIM|VISIT|RECORD|MRN|FIN|CASE|MEMBER|POLICY|INVOICE|REFERENCE|REF|ID)\s*(?:NUMBER|NO\.?|#|ID)?\s*[:=#-]?\s*[A-Z]?\s*$/i.test(before)) return true;
        if (/[A-Za-z0-9_]$/.test(before) && !/(?:^|\s)(?:tel|phone|mobile|cell|fax)\s*[:=#-]?\s*$/i.test(before)) return true;
        if (/^\d/.test(after)) return true;
        return false;
    }

    function extractPhone(text) {
        if (!text) return null;

        const source = normalizePhoneSource(text);


        // v109 FLATTENED HEADER CONTACT RECOVERY:
        // Prefer a phone that is glued directly after a 5-digit ZIP in the
        // contact/header area, e.g. "AZ 85140602.781.1163amy...".
        // Without this, the ordinary phone regex cannot start at 602 because
        // the preceding ZIP digit makes it look like one long numeric run, and
        // a later reference phone can incorrectly win.
        // v214 HEADER-ONLY ZIP+PHONE RECOVERY:
        // The ZIP-glued recovery must only inspect the applicant's TRUE contact header.
        // Previously it scanned the first 1200 characters, which could include the first
        // Work Experience entry. In a resume like:
        //   Lincoln, NE 68510 | +1 619 288 7587 | ...
        //   Work Experience ... Chula Vista, CA 91910 866-351-7722 ...
        // the special ZIP+phone rule could incorrectly grab 8663517722 from the employer
        // location BEFORE the normal first-phone rule ever got a chance to return
        // the applicant's real header phone 6192887587.
        const headerStart = source.slice(0, 1200);
        const headerSectionStop = findTrueResumeSectionStop(headerStart);
        const header = (
            headerSectionStop >= 0
                ? headerStart.slice(0, headerSectionStop)
                : headerStart
        );
        const zipPhoneRe = /\b\d{5}\s*(?:\+?1[\s().\/\-]*)?(\d{3})[\s().\/\-]*(\d{3})[\s.\/\-]*(\d{4})(?!\d)/g;
        let zipPhoneMatch;
        while ((zipPhoneMatch = zipPhoneRe.exec(header))) {
            const digits = `${zipPhoneMatch[1]}${zipPhoneMatch[2]}${zipPhoneMatch[3]}`;
            if (frt7IsReferencePhoneAt(header, zipPhoneMatch.index)) continue;
            if (isUsableTenDigitPhone(digits)) {
                // v427: This extractor is called during frequent UI refreshes. Avoid duplicate log spam.
                return digits;
            }
        }

        // v212 SPACED-HEADER PHONE RECOVERY:
        // v210 was too broad here: it treated an ordinary later label such as
        // "Reference ... Phone: (408) 623-5058" as higher priority than the real
        // contact/header phone. That made BOTH Auto Phone and the manual Phone button
        // choose a reference number even though the header contained the correct number.
        //
        // This special recovery is ONLY for the weird OCR/rendered form where the word
        // PHONE itself is visibly spaced out ("P H O N E ..."), and only near the top
        // of the resume. Normal "Phone:" labels later in Experience are intentionally
        // left to the ordinary first-phone logic below.
        const spacedHeaderPhoneRe = /p\s+h\s+o\s+n\s+e\s*[:=#-]?\s*\(?([0-9\s().\/\-]{10,32})/ig;
        let spacedLabeled;
        while ((spacedLabeled = spacedHeaderPhoneRe.exec(source.slice(0, 700)))) {
            if (frt7IsReferencePhoneAt(source, spacedLabeled.index)) continue;
            let digits = String(spacedLabeled[1] || "").replace(/\D/g, "");
            if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
            if (isUsableTenDigitPhone(digits)) {
                console.info(`Toolbar PHONE v212: recovered spaced HEADER 10-digit phone ${digits}.`);
                return digits;
            }
        }

        // v73 CELL/MOBILE PRIORITY:
        // If the resume explicitly labels a number as C, Cell, Cellular, Mobile,
        // Mobile Phone, Mob, or M, that number ALWAYS wins over an unlabeled/Home
        // number. Example: "H: 252-204-1831 | C: 984-288-6291" -> 9842886291.
        // Both Auto Phone and the manual Phone button use this same extractor.
        const labeledMobileRe = /(?:^|[\s|,;])(?:cell\s*phone|mobile\s*phone|cellular|mobile|cell|mob|[cm]\s*[:=#-])(?:\s*(?:phone|number|no\.?|#))?\s*[:=#-]?\s*(?:\+?1[\s().\/\-]*)?(\d{3})[\s().\/\-]*(\d{3})[\s.\/\-]*(\d{4})(?!\d)/ig;
        let labeled;
        while ((labeled = labeledMobileRe.exec(source))) {
            const digits = `${labeled[1]}${labeled[2]}${labeled[3]}`;
            if (frt7IsAdministrativePhoneCandidate(source, labeled.index, labeled.index + labeled[0].length)) {
                console.info(`Toolbar PHONE v321: rejected administrative identifier near mobile label ${digits}.`);
                continue;
            }
            if (frt7IsReferencePhoneAt(source, labeled.index)) {
                console.info(`Toolbar PHONE v213: ignored reference Cell/Mobile number ${digits}.`);
                continue;
            }
            if (isUsableTenDigitPhone(digits)) {
                console.info(`Toolbar PHONE v73: preferred explicit Cell/Mobile number ${digits}.`);
                return digits;
            }
        }

        // Otherwise preserve the existing behavior: contact information is
        // overwhelmingly near the top, so search the header first and then the
        // whole resume for the first normal U.S./Canada 10-digit number.
        const regions = [source.slice(0, 1200), source];

        for (const region of regions) {
            // U.S./Canada 10-digit number, including contiguous digits and common
            // punctuation: 7708995462, 770-899-5462, (770) 899-5462, +1 770...
            const phoneRe = /(?:^|[^\d])(?:\+?1[\s().\/\-]*)?(\d{3})[\s().\/\-]*(\d{3})[\s.\/\-]*(\d{4})(?!\d)/g;
            let m;
            while ((m = phoneRe.exec(region))) {
                const digits = `${m[1]}${m[2]}${m[3]}`;
                if (!isUsableTenDigitPhone(digits)) continue;
                // v324: The regex may consume a leading separator before +1/phone.
                // Check the true number start so an email immediately before the
                // separator is not mistaken for a glued administrative ID.
                const phoneStart = m.index + (m[0].match(/^[^\d+]*/)?.[0].length || 0);
                if (frt7IsAdministrativePhoneCandidate(region, phoneStart, m.index + m[0].length)) continue;
                if (frt7IsReferencePhoneAt(region, m.index)) {
                    console.info(`Toolbar PHONE v213: ignored reference phone ${digits}.`);
                    continue;
                }

                // Keep exactly ten digits. This matches the site's raw-data style
                // and avoids formatting differences causing its "not found" check.
                return digits;
            }
        }

        // v210 STRICT PHONE RULE: never return a seven-digit local number.
        // A phone candidate is either a complete usable 10-digit U.S. number or null.
        return null;
    }

    function fillPhoneField() {
        const text = getResumeText();
        const phone = extractPhone(text);
        const referencePhones = frt7CollectReferencePhones(text);
        const phoneInput = document.querySelector("#txtPhoneDataEntry") ||
                           document.querySelector("#txtPhone");
        if (!phoneInput) {
            console.warn("Toolbar: phone field not found.");
            return false;
        }
        if (!phone) {
            // v287 VALID-PHONE NO-EMPTY GUARD:
            // extractPhone() can return null when every resume candidate was rejected
            // (for example because a number was classified as a reference phone).
            // That must NEVER turn an already-populated, valid 10-digit site phone into
            // a blank field. With no safe replacement, preserve the existing valid phone.
            let existingDigits = String(phoneInput.value || "").replace(/\D/g, "");
            if (existingDigits.length === 11 && existingDigits.startsWith("1")) {
                existingDigits = existingDigits.slice(1);
            }
            if (existingDigits.length === 10 && isUsableTenDigitPhone(existingDigits)) {
                window.__frt7_last_phone = existingDigits;
                console.info("Toolbar PHONE v287: no replacement found; preserved existing valid 10-digit phone.");
                return true;
            }

            // Keep the prior cleanup only for a genuinely incomplete/malformed value.
            // A valid 10-digit value is protected above even if reference detection
            // happens to classify it as a reference number.
            if (String(phoneInput.value || "").trim()) {
                window.__frt7_internal_phone_write_in_progress = true;
                try {
                    phoneInput.value = "";
                    triggerEvents(phoneInput);
                } finally {
                    window.__frt7_internal_phone_write_in_progress = false;
                }
                window.__frt7_last_phone = "";
                console.info("Toolbar PHONE v287: cleared incomplete/non-10-digit phone field.");
                return true;
            }
            console.warn("Toolbar: no complete 10-digit phone found.");
            return false;
        }

        // v321: A valid existing contact number explicitly printed in the
        // applicant's own contact header wins over later candidate numbers.
        // Unlabeled numbers in the header remain supported by extractPhone().
        let confirmedExisting = String(phoneInput.value || "").replace(/\D/g, "");
        if (confirmedExisting.length === 11 && confirmedExisting.startsWith("1")) confirmedExisting = confirmedExisting.slice(1);
        if (isUsableTenDigitPhone(confirmedExisting) && confirmedExisting !== phone) {
            const resumeSource = normalizePhoneSource(text);
            const top = resumeSource.slice(0, Math.max(0, findTrueResumeSectionStop(resumeSource.slice(0, 1200))) || 700);
            const matchingPhone = new RegExp(`(?:^|[^\\d])(?:\\+?1[\\s()./\\-]*)?${confirmedExisting.slice(0,3)}[\\s()./\\-]*${confirmedExisting.slice(3,6)}[\\s()./\\-]*${confirmedExisting.slice(6)}(?!\\d)`).test(top);
            if (matchingPhone) {
                console.info(`Toolbar PHONE v321: preserved existing ${confirmedExisting}, confirmed in resume contact header.`);
                window.__frt7_last_phone = confirmedExisting;
                return true;
            }
        }

        // v213: A reference number is categorically invalid for the applicant Phone
        // field. Do not let an accidental/site-generated lock preserve it.
        let currentDigitsForReferenceGuard = String(phoneInput.value || "").replace(/\D/g, "");
        if (currentDigitsForReferenceGuard.length === 11 && currentDigitsForReferenceGuard.startsWith("1")) {
            currentDigitsForReferenceGuard = currentDigitsForReferenceGuard.slice(1);
        }
        const currentPhoneIsReference = referencePhones.has(currentDigitsForReferenceGuard) && currentDigitsForReferenceGuard !== phone;

        // v47: ANY genuine user override on this applicant wins over Auto, except that
        // a known resume-reference number is never preserved as applicant contact data.
        if (isManualContactLocked("phone", phoneInput) && !window.__frt7_manual_phone_button_click_in_progress && !currentPhoneIsReference) {
            console.info("Toolbar PHONE v104: skipped because the user changed/cleared the phone field.");
            return false;
        }

        const currentDigits = String(phoneInput.value || "").replace(/\D/g, "");
        if (currentDigits === phone) {
            window.__frt7_last_phone = phone;
            return true;
        }

        window.__frt7_internal_phone_write_in_progress = true;
        try {
            phoneInput.value = phone;
            triggerEvents(phoneInput);
        } finally {
            window.__frt7_internal_phone_write_in_progress = false;
        }
        window.__frt7_last_phone = phone;
        return true;
    }


    // --- City/State extraction from resume header ---
    const STATE_MAP = {
        "ALABAMA":"AL","ALASKA":"AK","ARIZONA":"AZ","ARKANSAS":"AR",
        "CALIFORNIA":"CA","COLORADO":"CO","CONNECTICUT":"CT","DELAWARE":"DE",
        "FLORIDA":"FL","GEORGIA":"GA","HAWAII":"HI","IDAHO":"ID","ILLINOIS":"IL",
        "INDIANA":"IN","IOWA":"IA","KANSAS":"KS","KENTUCKY":"KY","LOUISIANA":"LA",
        "MAINE":"ME","MARYLAND":"MD","MASSACHUSETTS":"MA","MICHIGAN":"MI",
        "MINNESOTA":"MN","MISSISSIPPI":"MS","MISSOURI":"MO","MONTANA":"MT",
        "NEBRASKA":"NE","NEVADA":"NV","NEW HAMPSHIRE":"NH",
        "NEW JERSEY":"NJ","NEW MEXICO":"NM","NEW YORK":"NY",
        "NORTH CAROLINA":"NC","NORTH DAKOTA":"ND","OHIO":"OH","OKLAHOMA":"OK",
        "OREGON":"OR","PENNSYLVANIA":"PA","RHODE ISLAND":"RI",
        "SOUTH CAROLINA":"SC","SOUTH DAKOTA":"SD","TENNESSEE":"TN",
        "TEXAS":"TX","UTAH":"UT","VERMONT":"VT","VIRGINIA":"VA",
        "WASHINGTON":"WA","WEST VIRGINIA":"WV","WISCONSIN":"WI","WYOMING":"WY",
        "DISTRICT OF COLUMBIA":"DC","PUERTO RICO":"PR"
    };

function findConfirmedStateForExactCity(city, text) {
    const cleanCity = String(city || "").trim();
    if (!cleanCity || !text) return null;
    const escapeRegex = value => String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const stateEntries = [
        ...Object.entries(STATE_MAP).map(([full, abbr]) => ({ label: full, state: abbr })),
        ...Object.values(STATE_MAP).map(abbr => ({ label: abbr, state: abbr }))
    ].sort((a, b) => b.label.length - a.label.length);
    const statePattern = stateEntries.map(entry => escapeRegex(entry.label).replace(/\s+/g, "\\s+")).join("|");
    const re = new RegExp("(?:^|[\n\r|•·;])\\s*" + escapeRegex(cleanCity).replace(/\s+/g, "\\s+") + "\\s*,?\\s*(" + statePattern + ")\\b", "i");
    const match = String(text).slice(0, 1600).match(re);
    if (!match) return null;
    const raw = String(match[1] || "").trim().toUpperCase().replace(/\s+/g, " ");
    return STATE_MAP[raw] || (Object.values(STATE_MAP).includes(raw) ? raw : null);
}

function findConfirmedStateForCorrectedCity(city, text) {
    const exact = findConfirmedStateForExactCity(city, text);
    if (exact) return exact;

    const cleanCity = String(city || "").trim();
    if (!cleanCity || !text) return null;

    const escapeRegex = value =>
        String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const stateEntries = [
        ...Object.entries(STATE_MAP).map(([full, abbr]) => ({ label: full, state: abbr })),
        ...Object.values(STATE_MAP).map(abbr => ({ label: abbr, state: abbr }))
    ].sort((a, b) => b.label.length - a.label.length);

    const statePattern = stateEntries
        .map(entry => escapeRegex(entry.label).replace(/\s+/g, "\\s+"))
        .join("|");

    // Permit a short descriptive prefix before the corrected city, while still
    // requiring the city immediately before a valid state.
    const cityPattern = escapeRegex(cleanCity).replace(/\s+/g, "\\s+");
    const re = new RegExp(
        "(?:^|[\\n\\r|•·;])\\s*(?:[A-Za-z][A-Za-z'’.-]*\\s+){0,4}" +
        cityPattern + "\\s*,?\\s*(" + statePattern + ")\\b",
        "i"
    );

    const match = String(text).slice(0, 1800).match(re);
    if (!match) return null;

    const rawState = String(match[1] || "")
        .trim()
        .toUpperCase()
        .replace(/\s+/g, " ");

    return STATE_MAP[rawState] ||
        (Object.values(STATE_MAP).includes(rawState) ? rawState : null);
}

// v103 LAST-NAME/CITY HARD GUARD:
// A saved/trusted city must never be selected when that city text is also the
// applicant's Last Name. Check BOTH the live field and the original page value
// captured before Auto Name can change it. This prevents cases such as:
//   original Last Name = Perry + learned city Perry, FL -> incorrectly City Perry.
// In that situation city detection must keep looking/fall back to Area instead.
function learnedCityCollidesWithApplicantLastName(city) {
    const normalizedCity = normalizeLearnedCity(city);
    if (!normalizedCity) return false;

    const currentLast = normalizeLearnedCity(
        document.querySelector("#txtLastNameDataEntry")?.value ||
        document.querySelector("#txtLastName")?.value || ""
    );
    const originalLast = normalizeLearnedCity(window.__frt7_original?.last || "");
    const initiallyLoadedLast = normalizeLearnedCity(
        window.__frt7_initial_loaded_last_name || ""
    );

    // v151 COMPOUND LAST-NAME TOKEN GUARD:
    // The site can legitimately load a multiword Last Name field such as
    // "Gentile Everett". A saved city "Everett, WA" must still be vetoed because
    // Everett is one complete surname token inside that field.
    //
    // Match by complete normalized word/phrase boundaries, never substring text.
    const lastContainsCityPhrase = lastValue => {
        if (!lastValue) return false;
        if (lastValue === normalizedCity) return true;

        const lastWords = String(lastValue).split(/\s+/).filter(Boolean);
        const cityWords = String(normalizedCity).split(/\s+/).filter(Boolean);
        if (!cityWords.length || cityWords.length > lastWords.length) return false;

        for (let i = 0; i <= lastWords.length - cityWords.length; i++) {
            let same = true;
            for (let j = 0; j < cityWords.length; j++) {
                if (lastWords[i + j] !== cityWords[j]) {
                    same = false;
                    break;
                }
            }
            if (same) return true;
        }
        return false;
    };

    return Boolean(
        lastContainsCityPhrase(currentLast) ||
        lastContainsCityPhrase(originalLast) ||
        lastContainsCityPhrase(initiallyLoadedLast)
    );
}

function getLearnedCityAtEnd(segment, state) {
    if (!learnedCitiesLoaded) return "";
    const normalizedSegment = normalizeLearnedCity(segment);
    if (!normalizedSegment) return "";
    const candidates = Object.values(learnedCitiesCache)
        .filter(entry => entry && entry.deleted !== true && entry.state === state && entry.city)
        .sort((a, b) => b.city.length - a.city.length);
    for (const entry of candidates) {
        if (learnedCityCollidesWithApplicantLastName(entry.city)) {
            console.info(`Toolbar CITY v103: rejected learned city "${entry.city}" because it matches the applicant Last Name.`);
            continue;
        }
        const learned = normalizeLearnedCity(entry.city);
        // v70: Learned City is the authoritative tail immediately before its
        // matching state, even when resume text is flattened with NO separator:
        // "Service Operations LeaderPhiladelphia, PA" -> "Philadelphia".
        // Candidates are longest-first and already state-matched above.
        if (
            normalizedSegment === learned ||
            normalizedSegment.endsWith(" " + learned) ||
            normalizedSegment.endsWith(learned)
        ) {
            return entry.city;
        }
    }
    return "";
}


// v141 LIGHTWEIGHT MILITARY-INSTALLATION FALLBACK
// This is deliberately a small, static in-memory lookup: no network request, no timer,
// no polling, and no scan outside the TRUE contact/header area. It only runs when the
// existing normal/trusted city logic has not already produced a location.
//
// Aliases are intentionally installation-specific ("Joint Base Andrews", "Andrews AFB",
// "JBLM", etc.). Bare words such as "Andrews" are NOT accepted, preventing a base name
// from competing with ordinary U.S. city matching.
const FRT7_MILITARY_INSTALLATIONS = [
    { city:"Joint Base Andrews", state:"MD", zip:"20762", aliases:["JOINT BASE ANDREWS","JB ANDREWS","JBA","ANDREWS AFB","ANDREWS AIR FORCE BASE"] },
    { city:"Fort Meade", state:"MD", aliases:["FORT GEORGE G MEADE","FORT GEORGE G. MEADE","FORT MEADE"] },
    { city:"Fort Detrick", state:"MD", aliases:["FORT DETRICK"] },
    { city:"Naval Support Activity Bethesda", state:"MD", aliases:["NAVAL SUPPORT ACTIVITY BETHESDA","NSA BETHESDA","WALTER REED NATIONAL MILITARY MEDICAL CENTER","WRNMMC"] },
    { city:"Aberdeen Proving Ground", state:"MD", aliases:["ABERDEEN PROVING GROUND","APG"] },
    { city:"Fort Belvoir", state:"VA", aliases:["FORT BELVOIR"] },
    { city:"Quantico", state:"VA", aliases:["MARINE CORPS BASE QUANTICO","MCB QUANTICO"] },
    { city:"Norfolk", state:"VA", aliases:["NAVAL STATION NORFOLK","NS NORFOLK"] },
    { city:"Virginia Beach", state:"VA", aliases:["NAVAL AIR STATION OCEANA","NAS OCEANA"] },
    { city:"Hampton", state:"VA", aliases:["JOINT BASE LANGLEY EUSTIS","JOINT BASE LANGLEY-EUSTIS","JB LANGLEY EUSTIS","JBLE","LANGLEY AFB","LANGLEY AIR FORCE BASE"] },
    { city:"Fort Eustis", state:"VA", aliases:["FORT EUSTIS"] },
    { city:"Fort Gregg-Adams", state:"VA", aliases:["FORT GREGG ADAMS","FORT GREGG-ADAMS","FORT LEE VIRGINIA","FORT LEE VA"] },
    { city:"Fort Liberty", state:"NC", aliases:["FORT LIBERTY","FORT BRAGG"] },
    { city:"Camp Lejeune", state:"NC", aliases:["MARINE CORPS BASE CAMP LEJEUNE","MCB CAMP LEJEUNE","CAMP LEJEUNE"] },
    { city:"Cherry Point", state:"NC", aliases:["MARINE CORPS AIR STATION CHERRY POINT","MCAS CHERRY POINT"] },
    { city:"Seymour Johnson AFB", state:"NC", aliases:["SEYMOUR JOHNSON AFB","SEYMOUR JOHNSON AIR FORCE BASE"] },
    { city:"Fort Jackson", state:"SC", aliases:["FORT JACKSON"] },
    { city:"Shaw AFB", state:"SC", aliases:["SHAW AFB","SHAW AIR FORCE BASE"] },
    { city:"Beaufort", state:"SC", aliases:["MARINE CORPS AIR STATION BEAUFORT","MCAS BEAUFORT"] },
    { city:"Charleston", state:"SC", aliases:["JOINT BASE CHARLESTON","JB CHARLESTON","CHARLESTON AFB","NAVAL WEAPONS STATION CHARLESTON"] },
    { city:"Fort Moore", state:"GA", aliases:["FORT MOORE","FORT BENNING"] },
    { city:"Fort Stewart", state:"GA", aliases:["FORT STEWART"] },
    { city:"Hunter Army Airfield", state:"GA", aliases:["HUNTER ARMY AIRFIELD","HUNTER AAF"] },
    { city:"Robins AFB", state:"GA", aliases:["ROBINS AFB","ROBINS AIR FORCE BASE"] },
    { city:"Kings Bay", state:"GA", aliases:["NAVAL SUBMARINE BASE KINGS BAY","NSB KINGS BAY","KINGS BAY NAVAL SUBMARINE BASE"] },
    { city:"Fort Campbell", state:"KY", aliases:["FORT CAMPBELL"] },
    { city:"Fort Knox", state:"KY", aliases:["FORT KNOX"] },
    { city:"Fort Novosel", state:"AL", aliases:["FORT NOVOSEL","FORT RUCKER"] },
    { city:"Maxwell AFB", state:"AL", aliases:["MAXWELL AFB","MAXWELL AIR FORCE BASE","MAXWELL GUNTER AFB","MAXWELL-GUNTER AFB"] },
    { city:"Redstone Arsenal", state:"AL", aliases:["REDSTONE ARSENAL"] },
    { city:"Eglin AFB", state:"FL", aliases:["EGLIN AFB","EGLIN AIR FORCE BASE"] },
    { city:"Hurlburt Field", state:"FL", aliases:["HURLBURT FIELD"] },
    { city:"Tyndall AFB", state:"FL", aliases:["TYNDALL AFB","TYNDALL AIR FORCE BASE"] },
    { city:"MacDill AFB", state:"FL", aliases:["MACDILL AFB","MACDILL AIR FORCE BASE"] },
    { city:"Pensacola", state:"FL", aliases:["NAVAL AIR STATION PENSACOLA","NAS PENSACOLA"] },
    { city:"Jacksonville", state:"FL", aliases:["NAVAL AIR STATION JACKSONVILLE","NAS JACKSONVILLE"] },
    { city:"Mayport", state:"FL", aliases:["NAVAL STATION MAYPORT","NS MAYPORT"] },
    { city:"Key West", state:"FL", aliases:["NAVAL AIR STATION KEY WEST","NAS KEY WEST"] },
    { city:"Patrick SFB", state:"FL", aliases:["PATRICK SFB","PATRICK SPACE FORCE BASE","PATRICK AFB","PATRICK AIR FORCE BASE"] },
    { city:"Fort Johnson", state:"LA", aliases:["FORT JOHNSON","FORT POLK"] },
    { city:"Barksdale AFB", state:"LA", aliases:["BARKSDALE AFB","BARKSDALE AIR FORCE BASE"] },
    { city:"Keesler AFB", state:"MS", aliases:["KEESLER AFB","KEESLER AIR FORCE BASE"] },
    { city:"Columbus AFB", state:"MS", aliases:["COLUMBUS AFB","COLUMBUS AIR FORCE BASE"] },
    { city:"Naval Construction Battalion Center Gulfport", state:"MS", aliases:["NCBC GULFPORT","NAVAL CONSTRUCTION BATTALION CENTER GULFPORT"] },
    { city:"Millington", state:"TN", aliases:["NAVAL SUPPORT ACTIVITY MID SOUTH","NSA MID SOUTH","NSA MID-SOUTH"] },
    { city:"Fort Cavazos", state:"TX", aliases:["FORT CAVAZOS","FORT HOOD"] },
    { city:"Fort Bliss", state:"TX", aliases:["FORT BLISS"] },
    { city:"Joint Base San Antonio", state:"TX", aliases:["JOINT BASE SAN ANTONIO","JBSA","LACKLAND AFB","RANDOLPH AFB","FORT SAM HOUSTON"] },
    { city:"Dyess AFB", state:"TX", aliases:["DYESS AFB","DYESS AIR FORCE BASE"] },
    { city:"Goodfellow AFB", state:"TX", aliases:["GOODFELLOW AFB","GOODFELLOW AIR FORCE BASE"] },
    { city:"Sheppard AFB", state:"TX", aliases:["SHEPPARD AFB","SHEPPARD AIR FORCE BASE"] },
    { city:"Corpus Christi", state:"TX", aliases:["NAVAL AIR STATION CORPUS CHRISTI","NAS CORPUS CHRISTI"] },
    { city:"Kingsville", state:"TX", aliases:["NAVAL AIR STATION KINGSVILLE","NAS KINGSVILLE"] },
    { city:"Altus AFB", state:"OK", aliases:["ALTUS AFB","ALTUS AIR FORCE BASE"] },
    { city:"Fort Sill", state:"OK", aliases:["FORT SILL"] },
    { city:"Tinker AFB", state:"OK", aliases:["TINKER AFB","TINKER AIR FORCE BASE"] },
    { city:"Vance AFB", state:"OK", aliases:["VANCE AFB","VANCE AIR FORCE BASE"] },
    { city:"Fort Riley", state:"KS", aliases:["FORT RILEY"] },
    { city:"Fort Leavenworth", state:"KS", aliases:["FORT LEAVENWORTH"] },
    { city:"McConnell AFB", state:"KS", aliases:["MCCONNELL AFB","MCCONNELL AIR FORCE BASE"] },
    { city:"Fort Leonard Wood", state:"MO", aliases:["FORT LEONARD WOOD"] },
    { city:"Whiteman AFB", state:"MO", aliases:["WHITEMAN AFB","WHITEMAN AIR FORCE BASE"] },
    { city:"Scott AFB", state:"IL", aliases:["SCOTT AFB","SCOTT AIR FORCE BASE"] },
    { city:"Great Lakes", state:"IL", aliases:["NAVAL STATION GREAT LAKES","NS GREAT LAKES"] },
    { city:"Rock Island Arsenal", state:"IL", aliases:["ROCK ISLAND ARSENAL"] },
    { city:"Wright-Patterson AFB", state:"OH", aliases:["WRIGHT PATTERSON AFB","WRIGHT-PATTERSON AFB","WRIGHT PATTERSON AIR FORCE BASE"] },
    { city:"Youngstown ARS", state:"OH", aliases:["YOUNGSTOWN AIR RESERVE STATION","YOUNGSTOWN ARS"] },
    { city:"Selfridge ANGB", state:"MI", aliases:["SELFRIDGE ANGB","SELFRIDGE AIR NATIONAL GUARD BASE"] },
    { city:"Fort McCoy", state:"WI", aliases:["FORT MCCOY"] },
    { city:"Camp Ripley", state:"MN", aliases:["CAMP RIPLEY"] },
    { city:"Offutt AFB", state:"NE", aliases:["OFFUTT AFB","OFFUTT AIR FORCE BASE"] },
    { city:"Ellsworth AFB", state:"SD", aliases:["ELLSWORTH AFB","ELLSWORTH AIR FORCE BASE"] },
    { city:"Minot AFB", state:"ND", aliases:["MINOT AFB","MINOT AIR FORCE BASE"] },
    { city:"Grand Forks AFB", state:"ND", aliases:["GRAND FORKS AFB","GRAND FORKS AIR FORCE BASE"] },
    { city:"F.E. Warren AFB", state:"WY", aliases:["FE WARREN AFB","F E WARREN AFB","F.E. WARREN AFB","FRANCIS E WARREN AFB"] },
    { city:"Fort Carson", state:"CO", aliases:["FORT CARSON"] },
    { city:"Peterson SFB", state:"CO", aliases:["PETERSON SFB","PETERSON SPACE FORCE BASE","PETERSON AFB"] },
    { city:"Schriever SFB", state:"CO", aliases:["SCHRIEVER SFB","SCHRIEVER SPACE FORCE BASE","SCHRIEVER AFB"] },
    { city:"Buckley SFB", state:"CO", aliases:["BUCKLEY SFB","BUCKLEY SPACE FORCE BASE","BUCKLEY AFB"] },
    { city:"US Air Force Academy", state:"CO", aliases:["UNITED STATES AIR FORCE ACADEMY","US AIR FORCE ACADEMY","USAFA"] },
    { city:"Hill AFB", state:"UT", aliases:["HILL AFB","HILL AIR FORCE BASE"] },
    { city:"Dugway Proving Ground", state:"UT", aliases:["DUGWAY PROVING GROUND"] },
    { city:"Nellis AFB", state:"NV", aliases:["NELLIS AFB","NELLIS AIR FORCE BASE"] },
    { city:"Creech AFB", state:"NV", aliases:["CREECH AFB","CREECH AIR FORCE BASE"] },
    { city:"Fallon", state:"NV", aliases:["NAVAL AIR STATION FALLON","NAS FALLON"] },
    { city:"Luke AFB", state:"AZ", aliases:["LUKE AFB","LUKE AIR FORCE BASE"] },
    { city:"Davis-Monthan AFB", state:"AZ", aliases:["DAVIS MONTHAN AFB","DAVIS-MONTHAN AFB","DAVIS MONTHAN AIR FORCE BASE"] },
    { city:"Fort Huachuca", state:"AZ", aliases:["FORT HUACHUCA"] },
    { city:"Yuma", state:"AZ", aliases:["MARINE CORPS AIR STATION YUMA","MCAS YUMA","YUMA PROVING GROUND"] },
    { city:"Kirtland AFB", state:"NM", aliases:["KIRTLAND AFB","KIRTLAND AIR FORCE BASE"] },
    { city:"Holloman AFB", state:"NM", aliases:["HOLLOMAN AFB","HOLLOMAN AIR FORCE BASE"] },
    { city:"Cannon AFB", state:"NM", aliases:["CANNON AFB","CANNON AIR FORCE BASE"] },
    { city:"White Sands Missile Range", state:"NM", aliases:["WHITE SANDS MISSILE RANGE","WSMR"] },
    { city:"Joint Base Lewis-McChord", state:"WA", aliases:["JOINT BASE LEWIS MCCHORD","JOINT BASE LEWIS-MCCHORD","JBLM","FORT LEWIS","MCCHORD AFB"] },
    { city:"Fairchild AFB", state:"WA", aliases:["FAIRCHILD AFB","FAIRCHILD AIR FORCE BASE"] },
    { city:"Whidbey Island", state:"WA", aliases:["NAVAL AIR STATION WHIDBEY ISLAND","NAS WHIDBEY ISLAND"] },
    { city:"Bremerton", state:"WA", aliases:["NAVAL BASE KITSAP","NB KITSAP","NAVAL BASE KITSAP BREMERTON"] },
    { city:"Everett", state:"WA", aliases:["NAVAL STATION EVERETT","NS EVERETT"] },
    { city:"Camp Murray", state:"WA", aliases:["CAMP MURRAY"] },
    { city:"Mountain Home AFB", state:"ID", aliases:["MOUNTAIN HOME AFB","MOUNTAIN HOME AIR FORCE BASE"] },
    { city:"Malmstrom AFB", state:"MT", aliases:["MALMSTROM AFB","MALMSTROM AIR FORCE BASE"] },
    { city:"Joint Base Elmendorf-Richardson", state:"AK", aliases:["JOINT BASE ELMENDORF RICHARDSON","JOINT BASE ELMENDORF-RICHARDSON","JBER","ELMENDORF AFB","FORT RICHARDSON"] },
    { city:"Eielson AFB", state:"AK", aliases:["EIELSON AFB","EIELSON AIR FORCE BASE"] },
    { city:"Fort Wainwright", state:"AK", aliases:["FORT WAINWRIGHT"] },
    { city:"Fort Greely", state:"AK", aliases:["FORT GREELY"] },
    { city:"Joint Base Pearl Harbor-Hickam", state:"HI", aliases:["JOINT BASE PEARL HARBOR HICKAM","JOINT BASE PEARL HARBOR-HICKAM","JBPHH","PEARL HARBOR","HICKAM AFB"] },
    { city:"Schofield Barracks", state:"HI", aliases:["SCHOFIELD BARRACKS"] },
    { city:"Marine Corps Base Hawaii", state:"HI", aliases:["MARINE CORPS BASE HAWAII","MCB HAWAII","KANEOHE BAY MARINE CORPS BASE"] },
    { city:"Fort Shafter", state:"HI", aliases:["FORT SHAFTER"] },
    { city:"Camp Pendleton", state:"CA", aliases:["MARINE CORPS BASE CAMP PENDLETON","MCB CAMP PENDLETON","CAMP PENDLETON"] },
    { city:"Twentynine Palms", state:"CA", aliases:["MARINE CORPS AIR GROUND COMBAT CENTER TWENTYNINE PALMS","MCAGCC TWENTYNINE PALMS","29 PALMS MARINE BASE","TWENTYNINE PALMS MARINE BASE"] },
    { city:"Miramar", state:"CA", aliases:["MARINE CORPS AIR STATION MIRAMAR","MCAS MIRAMAR"] },
    { city:"San Diego", state:"CA", aliases:["NAVAL BASE SAN DIEGO","NB SAN DIEGO","NAVAL STATION SAN DIEGO"] },
    { city:"Coronado", state:"CA", aliases:["NAVAL BASE CORONADO","NB CORONADO","NAVAL AIR STATION NORTH ISLAND","NAS NORTH ISLAND"] },
    { city:"Lemoore", state:"CA", aliases:["NAVAL AIR STATION LEMOORE","NAS LEMOORE"] },
    { city:"Edwards AFB", state:"CA", aliases:["EDWARDS AFB","EDWARDS AIR FORCE BASE"] },
    { city:"Travis AFB", state:"CA", aliases:["TRAVIS AFB","TRAVIS AIR FORCE BASE"] },
    { city:"Beale AFB", state:"CA", aliases:["BEALE AFB","BEALE AIR FORCE BASE"] },
    { city:"Vandenberg SFB", state:"CA", aliases:["VANDENBERG SFB","VANDENBERG SPACE FORCE BASE","VANDENBERG AFB"] },
    { city:"Fort Irwin", state:"CA", aliases:["FORT IRWIN","NATIONAL TRAINING CENTER FORT IRWIN","NTC FORT IRWIN"] },
    { city:"Monterey", state:"CA", aliases:["PRESIDIO OF MONTEREY","NAVAL POSTGRADUATE SCHOOL"] },
    { city:"Hanscom AFB", state:"MA", aliases:["HANSCOM AFB","HANSCOM AIR FORCE BASE"] },
    { city:"Westover ARB", state:"MA", aliases:["WESTOVER ARB","WESTOVER AIR RESERVE BASE"] },
    { city:"Newport", state:"RI", aliases:["NAVAL STATION NEWPORT","NS NEWPORT"] },
    { city:"New London", state:"CT", aliases:["NAVAL SUBMARINE BASE NEW LONDON","SUBASE NEW LONDON","NSB NEW LONDON"] },
    { city:"West Point", state:"NY", aliases:["UNITED STATES MILITARY ACADEMY","US MILITARY ACADEMY","WEST POINT MILITARY ACADEMY"] },
    { city:"Fort Drum", state:"NY", aliases:["FORT DRUM"] },
    { city:"Rome", state:"NY", aliases:["GRIFFISS BUSINESS AND TECHNOLOGY PARK","GRIFFISS AFB","GRIFFISS AIR FORCE BASE"] },
    { city:"Dover AFB", state:"DE", aliases:["DOVER AFB","DOVER AIR FORCE BASE"] },
    { city:"Joint Base McGuire-Dix-Lakehurst", state:"NJ", aliases:["JOINT BASE MCGUIRE DIX LAKEHURST","JOINT BASE MCGUIRE-DIX-LAKEHURST","JBMDL","MCGUIRE AFB","FORT DIX","NAVAL AIR ENGINEERING STATION LAKEHURST"] },
    { city:"Carlisle Barracks", state:"PA", aliases:["CARLISLE BARRACKS"] },
    { city:"Tobyhanna Army Depot", state:"PA", aliases:["TOBYHANNA ARMY DEPOT"] }
];

const FRT7_MILITARY_ALIAS_INDEX = (() => {
    const rows = [];
    for (const installation of FRT7_MILITARY_INSTALLATIONS) {
        for (const alias of installation.aliases || []) {
            const normalizedAlias = String(alias || "").toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim().replace(/\s+/g, " ");
            if (normalizedAlias) rows.push({ alias: normalizedAlias, installation });
        }
    }
    // Longest/specific aliases first (e.g. "Joint Base Andrews" before "JBA").
    rows.sort((a, b) => b.alias.length - a.alias.length);
    return rows;
})();

function findMilitaryInstallationInHeader(text) {
    if (!text) return null;
    const rawStart = String(text).slice(0, 1800);
    const sectionStop = findTrueResumeSectionStop(rawStart);
    const head = (sectionStop >= 0 ? rawStart.slice(0, sectionStop) : rawStart.slice(0, 900)).slice(0, 900);
    if (!head.trim()) return null;

    const normalizedHead = head.toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim().replace(/\s+/g, " ");
    const paddedHead = ` ${normalizedHead} `;

    for (const row of FRT7_MILITARY_ALIAS_INDEX) {
        const needle = ` ${row.alias} `;
        const at = paddedHead.indexOf(needle);
        if (at < 0) continue;
        const installation = row.installation;
        console.info(`Toolbar CITY v141: military installation header fallback -> ${installation.city}, ${installation.state} (${row.alias}).`);
        return {
            city: installation.city,
            state: installation.state,
            zip: installation.zip || "",
            militaryInstallation: true,
            trusted: true,
            withState: true,
            index: Math.max(0, at - 1)
        };
    }
    return null;
}

// v153 TRUSTED CITY MATCHER — EXPLICIT PAIR FIRST, SAFE STANDALONE FALLBACK
// Search only the TRUE contact/header portion for cities the user has taught us.
// Auto no longer invents a saved state from a bare city word. A learned city is
// eligible only when the header itself contains that city beside its matching state.
//
// Accepted examples (comma optional; state may be abbreviated or written out):
//   Elon, NC
//   Elon NC
//   Elon, North Carolina
//   Elon North Carolina
//
// Existing street-suffix protection remains authoritative:
//   "Bloomfield Ct Hagerstown, MD" must NOT become Bloomfield, CT.
// v318: Very narrowly recognize OCR-spaced NORTH BRUNSWICK, NJ 08902
// in the true contact header. Never infer a location from job descriptions.
function frt7OcrNorthBrunswickHeader(text) {
    const raw = String(text || '').slice(0, 1800);
    const stop = findTrueResumeSectionStop(raw);
    const head = (stop >= 0 ? raw.slice(0, stop) : raw.slice(0, 450)).slice(0, 450);
    // Accept N . BR UN S WI C K, N J 0 8 90 2 and normal North Brunswick.
    const re = /(?:\bN\s*\.\s*BR\s*UN\s*S\s*WI\s*C\s*K|\bNORTH\s+BRUNSWICK)\s*,\s*N\s*J\s*0\s*8\s*9\s*0\s*2\b/i;
    const m = re.exec(head);
    if (!m) return null;
    return {city:'North Brunswick', state:'NJ', zip:'08902', index:m.index, trusted:true, withState:true, ocrHeader:true};
}

function findTrustedLearnedCityInHeader(text) {
    const coverLetterApplicant = frt7CoverLetterExistingLocationCandidate();
    if (coverLetterApplicant) {
        frt7SetAuthoritativeHeaderLocation(coverLetterApplicant, "v361 cover-letter applicant location");
        return coverLetterApplicant;
    }
    const verifiedContact = frt7VerifiedExistingContactLocation();
    if (verifiedContact) return verifiedContact;

    const ocrAddress = frt7OcrNorthBrunswickHeader(text);
    if (ocrAddress) return ocrAddress;
    if (!learnedCitiesLoaded || !text) return null;

    // v135 REMOTE/HYBRID STATUS PRIORITY:
    // If the true header explicitly has a location after a Remote/Hybrid work-status
    // label (for example "Remote/Hybrid Employee Olin,IA"), that explicit City, ST
    // pair must win BEFORE any standalone learned-city token such as "Remote".
    // This is narrow and does not affect ordinary headers or street-suffix guards.
    const explicitRemoteHybridLocation = findExplicitRemoteHybridHeaderCity(text);
    if (explicitRemoteHybridLocation) return explicitRemoteHybridLocation;

    // v50 HEADER-ONLY TRUSTED CITY:
    // The old trusted matcher searched the first 1400 raw characters. On a short
    // resume that can already include the first job, so a learned job city such as
    // "Albuquerque, NM" could beat the applicant's real header city "Edgewood, NM".
    //
    // Build a TRUE contact-header region: start at the resume beginning and stop at
    // the first major resume section. We also hard-cap it at 900 characters.
    const rawStart = String(text).slice(0, 1800);

    const sectionStop = findTrueResumeSectionStop(rawStart);

    let head = sectionStop >= 0 ? rawStart.slice(0, sectionStop) : rawStart.slice(0, 900);
    head = frt7MaskStateListsInHeader(head.slice(0, 900));

    if (!head.trim()) return null;

    const entries = Object.values(learnedCitiesCache)
        .filter(entry => entry && entry.deleted !== true && entry.city && entry.trustedManualCity !== false)
        // v138: Ignore any old placeholder entries that may already exist in storage.
        // This makes the fix safe even before the user manually deletes a bad Remote entry.
        .filter(entry => !/^(?:remote|hybrid|remote\s*\/\s*hybrid|hybrid\s*\/\s*remote|no\s+location)$/i.test(String(entry.city || "").trim()));

    if (!entries.length) return findMilitaryInstallationInHeader(text);

    // v123 PERFORMANCE FIX:
    // v122 checked ambiguity by filtering the ENTIRE learned-city list again inside
    // every city iteration (O(n²)). Build the active city-name counts once here,
    // then every city can do an O(1) lookup. This preserves all v122 behavior.
    const activeCityNameCounts = new Map();
    for (const entry of entries) {
        const cityKey = normalizeLearnedCity(entry.city);
        if (!cityKey) continue;
        activeCityNameCounts.set(cityKey, (activeCityNameCounts.get(cityKey) || 0) + 1);
    }

    const escapeRegex = value =>
        String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const normalizeStateValue = raw => {
        const upper = String(raw || "").trim().toUpperCase().replace(/\s+/g, " ");
        if (STATE_MAP[upper]) return STATE_MAP[upper];
        return Object.values(STATE_MAP).includes(upper) ? upper : "";
    };

    const stateChoices = [...Object.keys(STATE_MAP), ...Object.values(STATE_MAP)]
        .sort((a, b) => b.length - a.length)
        .map(value => escapeRegex(value).replace(/\s+/g, "\\s+"))
        .join("|");

    const candidates = [];

    // v52: Never let a learned city that is also the applicant's name win from a
    // standalone header occurrence. Example: applicant "Melissa Galmez" plus a
    // learned city "Melissa, TX" must NOT turn First Name MELISSA into City Melissa.
    // We still allow an explicit "Melissa, TX" location because the adjacent state
    // makes that a real location signal rather than a name collision.
    let applicantFirst = "";
    let applicantLast = "";
    try {
        applicantFirst = normalizeLearnedCity(
            document.querySelector("#txtFirstNameDataEntry")?.value ||
            document.querySelector("#txtFirstName")?.value || ""
        );
        applicantLast = normalizeLearnedCity(
            document.querySelector("#txtLastNameDataEntry")?.value ||
            document.querySelector("#txtLastName")?.value || ""
        );
        if (!applicantFirst || !applicantLast) {
            const detected = hybridExtractName?.();
            applicantFirst = applicantFirst || normalizeLearnedCity(detected?.first || "");
            applicantLast = applicantLast || normalizeLearnedCity(detected?.last || "");
        }
    } catch (_) {}

    // v239 PERFORMANCE-ONLY PREFILTER:
    // The trusted learned-city matcher used to build several regular expressions for
    // EVERY saved city on every applicant. With a large learned-city list, that could
    // block the browser main thread for ~2 seconds even though only one or two city
    // names actually occur in the true resume header.
    //
    // This is only a necessary-condition filter: the existing v52-v215 guards below
    // still make the decision. If the normalized city text is not present anywhere in
    // the normalized true header, none of those exact-city regexes could match anyway.
    // Therefore this skips impossible candidates without changing which city can win.
    const v239HeaderSearchText = String(head || "").toLocaleLowerCase().replace(/\bst\.(?=\s)/g, "st").replace(/\s+/g, " ");
    // v240: companion compact form used only as a cheap prefilter for known
    // multi-word cities whose internal spaces were lost by PDF extraction.
    const v240CompactHeaderSearchText = String(head || "").toLocaleLowerCase().replace(/[^a-z0-9]+/g, "");

    for (const entry of entries) {
        const city = normalizeContactDisplayCase(entry.city);
        const v239CityNeedle = String(city || "").toLocaleLowerCase().replace(/\bst\.(?=\s)/g, "st").replace(/\s+/g, " ").trim();
        const v240CompactCityNeedle = v239CityNeedle.replace(/[^a-z0-9]+/g, "");
        if (!v239CityNeedle || (
            !v239HeaderSearchText.includes(v239CityNeedle) &&
            !v240CompactHeaderSearchText.includes(v240CompactCityNeedle)
        )) continue;

        // v103: Last Name is an absolute veto for learned-city matching, even if
        // the resume also happens to contain "City, ST" text. The original Last
        // Name is included so an earlier Auto Name mistake cannot erase this guard.
        if (learnedCityCollidesWithApplicantLastName(city)) {
            console.info(`Toolbar CITY v103: ignored trusted learned city "${city}" because it matches the applicant Last Name.`);
            continue;
        }

        const normalizedCityForNameGuard = normalizeLearnedCity(city);
        const collidesWithApplicantName = Boolean(
            normalizedCityForNameGuard &&
            (normalizedCityForNameGuard === applicantFirst || normalizedCityForNameGuard === applicantLast)
        );
        const cityPattern = escapeRegex(city.replace(/^St\.?(?=\s)/i, "St")).replace(/^St(?=\\s\+)/i, "St\\.?").replace(/\s+/g, "\\s+");

        // Strong match: trusted city directly beside a valid state.
        // v70 adds a second form for flattened text with no separator before the
        // city, e.g. "LeaderPhiladelphia, PA". The city itself and matching state
        // remain exact; only the LEFT boundary is relaxed.
        const withState = new RegExp(
            "(^|[^A-Za-zÀ-ÖØ-öø-ÿ])(" + cityPattern + ")\\s*,?\\s*(" + stateChoices + ")\\b",
            "i"
        );
        let strong = withState.exec(head);
        let strongState = strong ? strong[3] : "";
        let strongIndex = strong ? strong.index : -1;

        if (!strong) {
            const gluedWithState = new RegExp(
                "(" + cityPattern + ")\\s*,?\\s*(" + stateChoices + ")\\b",
                "i"
            );
            const glued = gluedWithState.exec(head);
            if (glued) {
                strong = glued;
                strongState = glued[2];
                strongIndex = glued.index;
            }
        }

        // v240 SQUISHED LEARNED CITY+STATE:
        // If a trusted multi-word city is printed without its internal spaces, accept
        // it only when its exact saved state is immediately beside it. This restores
        // canonical spacing (BullheadCity,AZ -> Bullhead City, AZ) without guessing.
        if (!strong && /\s/.test(city)) {
            const compactCityPattern = escapeRegex(city.replace(/\s+/g, ""));
            const compactSavedState = String(entry.state || "").trim().toUpperCase();
            if (compactSavedState) {
                const compactWithState = new RegExp(
                    "(" + compactCityPattern + ")\\s*,?\\s*(" + escapeRegex(compactSavedState) + ")\\b",
                    "i"
                );
                const compact = compactWithState.exec(head);
                if (compact) {
                    strong = compact;
                    strongState = compact[2];
                    strongIndex = compact.index;
                }
            }
        }

        if (strong) {
            // v131 STREET-SUFFIX GUARD:
            // Do not interpret a mixed-case 2-letter street suffix as a state when
            // there is no comma between the saved city text and that token.
            // Example: "19901 Bloomfield Ct Hagerstown, MD" must NOT match
            // saved "Bloomfield, CT". "Ct" is Court here.
            const rawStrongStateToken = String(strongState || "");
            const strongMatchedText = String(strong[0] || "");
            const strongHasComma = strongMatchedText.includes(",");

            if (
                !strongHasComma &&
                /^[A-Za-z]{2}$/.test(rawStrongStateToken) &&
                rawStrongStateToken !== rawStrongStateToken.toUpperCase()
            ) {
                console.info(
                    `Toolbar CITY v131: ignored "${city} ${rawStrongStateToken}" because ` +
                    `"${rawStrongStateToken}" is mixed-case with no comma and looks like a street suffix.`
                );

                // Do not fall through to standalone-city logic for this same occurrence;
                // that would immediately re-create the false Bloomfield, CT match.
                continue;
            }

            // v121 SAVED CITY/STATE PAIR STRICTNESS:
            // A learned city is trusted as the exact saved PAIR, not as the city
            // name beside any arbitrary state. Example: saved "Sunrise, FL" must
            // NOT match the street fragment "Desert Sunrise CT Reno, NV" as
            // "Sunrise, CT". Reject that mismatched-state occurrence and keep
            // scanning so a real saved pair such as "Reno, NV" can win.
            const matchedState = normalizeStateValue(strongState);
            const savedState = String(entry.state || "").trim().toUpperCase();
            if (savedState && matchedState && matchedState !== savedState) {
                console.info(
                    `Toolbar CITY v126: ignored saved pair "${city}, ${savedState}" because the resume explicitly says ${city}, ${matchedState}.`
                );

                // v126 EXPLICIT CITY+STATE PRIORITY FIX:
                // Do NOT fall through to the standalone-city rule for this saved entry.
                // Example: saved Midlothian, TX + resume header Midlothian, VA. v125
                // rejected the TX strong match, then immediately matched the bare word
                // "Midlothian" and incorrectly restored TX. An explicit different state
                // beside the city is authoritative evidence that THIS saved pair is not
                // the header location, so skip this entry completely.
                continue;
            } else {
                candidates.push({
                    city,
                    state: matchedState || savedState,
                    learned: true,
                    trusted: true,
                    withState: true,
                    index: strongIndex
                });
                continue;
            }
        }

        // v153 SAFE STANDALONE FALLBACK: a saved city by itself may be used ONLY inside the true header,
        // only when unambiguous and after all name/state/street guards pass. Explicit City+State still wins.
        // of rescanning the full learned-city list for every entry.
        const sameCityCount = activeCityNameCounts.get(normalizedCityForNameGuard) || 0;
        const standaloneIsUnambiguous = sameCityCount === 1;

        if (!collidesWithApplicantName && standaloneIsUnambiguous) {
            // v147 STATE-NAME TOKEN GUARD:
            // A saved one-word city must not win merely because that word is part of
            // a U.S. state name in the header. Example: saved "North, FL" must NOT
            // match "North Carolina, United States". In that case there is no trusted
            // header city, so the existing Area-code fallback remains free to run.
            //
            // Scan every standalone occurrence so a state-name occurrence can be
            // skipped without hiding a later genuine standalone occurrence.
            const fullStateNamePatterns = Object.keys(STATE_MAP)
                .filter(value => String(value || "").trim().length > 2)
                .sort((a, b) => b.length - a.length)
                .map(value => escapeRegex(value).replace(/\s+/g, "\\s+"));

            const stateNameSpanRe = fullStateNamePatterns.length
                ? new RegExp(
                    "(^|[^A-Za-zÀ-ÖØ-öø-ÿ])(" + fullStateNamePatterns.join("|") + ")(?=$|[^A-Za-zÀ-ÖØ-öø-ÿ])",
                    "ig"
                )
                : null;

            const cityOccurrenceIsInsideStateName = solo => {
                if (!stateNameSpanRe || !solo) return "";
                const matchedCity = String(solo[2] || "");
                const cityOffsetInMatch = String(solo[0] || "").lastIndexOf(matchedCity);
                const cityStart = solo.index + Math.max(0, cityOffsetInMatch);
                const cityEnd = cityStart + matchedCity.length;

                stateNameSpanRe.lastIndex = 0;
                let stateMatch;
                while ((stateMatch = stateNameSpanRe.exec(head))) {
                    const stateText = String(stateMatch[2] || "");
                    const stateOffsetInMatch = String(stateMatch[0] || "").lastIndexOf(stateText);
                    const stateStart = stateMatch.index + Math.max(0, stateOffsetInMatch);
                    const stateEnd = stateStart + stateText.length;

                    if (cityStart >= stateStart && cityEnd <= stateEnd) {
                        return stateText;
                    }
                    if (stateNameSpanRe.lastIndex === stateMatch.index) stateNameSpanRe.lastIndex++;
                }
                return "";
            };

            const standalone = new RegExp(
                "(^|[^A-Za-zÀ-ÖØ-öø-ÿ])(" + cityPattern + ")(?=$|[^A-Za-zÀ-ÖØ-öø-ÿ])",
                "ig"
            );

            let solo;
            while ((solo = standalone.exec(head))) {
                const containingStateName = cityOccurrenceIsInsideStateName(solo);
                if (containingStateName) {
                    console.info(
                        `Toolbar CITY v147: ignored standalone saved city "${city}" because ` +
                        `that occurrence is part of U.S. state name "${containingStateName}".`
                    );
                    if (standalone.lastIndex === solo.index) standalone.lastIndex++;
                    continue;
                }

                // v164 CANADA COUNTRY-SUFFIX GUARD:
                // A saved U.S. city must not be inferred from a bare city token when
                // that exact occurrence is immediately identified as being in Canada.
                // Example: "New Brunswick, Canada" must NOT become saved
                // "New Brunswick, NJ". With no trusted U.S. City+State header pair,
                // Auto Area is then free to use the resume phone area code instead.
                const matchedCityText = String(solo[2] || "");
                const cityOffsetInStandalone = String(solo[0] || "").lastIndexOf(matchedCityText);
                const cityEndInHead =
                    solo.index + Math.max(0, cityOffsetInStandalone) + matchedCityText.length;
                const tailAfterStandaloneCity = head.slice(cityEndInHead);
                if (/^\s*,?\s*Canada\b/i.test(tailAfterStandaloneCity)) {
                    console.info(
                        `Toolbar CITY v164: ignored standalone saved city "${city}" because ` +
                        `the header explicitly identifies it as Canadian.`
                    );
                    if (standalone.lastIndex === solo.index) standalone.lastIndex++;
                    continue;
                }

                // v348: A standalone learned city is NOT evidence of a location.
                // Do not attach the stored state to a bare word (e.g. "social media"
                // must never become Media, PA). Only an explicit matching city+state
                // occurrence may enter the trusted-header candidate pool.
                break;
            }
        } else if (!collidesWithApplicantName && !standaloneIsUnambiguous) {
            console.info(
                `Toolbar CITY v122: did not guess a state for standalone "${city}" because ` +
                `${sameCityCount} saved city/state pairs share that city name.`
            );
        } else {
            console.info(`Toolbar CITY v52: ignored standalone learned city "${city}" because it matches the applicant name.`);
        }
    }

    // v126: Always consider the built-in U.S. database's explicit City, ST result
    // alongside learned-city candidates. This matters when a standalone learned city
    // has one state but the resume explicitly names another real state, e.g. a saved
    // Midlothian, TX versus an explicit header "Midlothian, VA". The explicit pair
    // must outrank any standalone learned-city guess.
    const usDbHeaderCandidate = findUsCityDatabaseInHeader(text);
    if (usDbHeaderCandidate) candidates.push(usDbHeaderCandidate);

    // v142 MILITARY HEADER PRIORITY FIX:
    // A distinctive installation alias in the TRUE header must beat a bare learned-city
    // fragment taken from inside that installation name. Example: "Joint Base Andrews"
    // must not lose to a saved standalone "Andrews, TX". Explicit City+State pairs
    // still keep their existing higher priority. This is one in-memory header scan only.
    const militaryHeaderCandidate = findMilitaryInstallationInHeader(text);
    const hasExplicitHeaderPair = candidates.some(candidate => candidate.withState);
    if (militaryHeaderCandidate && !hasExplicitHeaderPair) {
        console.info(`Toolbar CITY v142: military installation beats standalone learned city -> ${militaryHeaderCandidate.city}, ${militaryHeaderCandidate.state}.`);
        return militaryHeaderCandidate;
    }

    if (!candidates.length) return militaryHeaderCandidate;

    // v139 EXPLICIT HEADER PAIR PRIORITY:
    // A saved city that is explicitly followed by its matching state in the TRUE
    // header must beat a bare standalone saved-city word. This prevents street names
    // from winning just because they appear earlier, e.g.:
    //   "110 Windsor road, Crossville TN 38558"
    // with saved Windsor, NC and Crossville, TN must select Crossville, TN.
    //
    // Among candidates of the SAME strength, keep v129 behavior: the first one in
    // resume order wins. No alphabetical sorting. A comma is NOT required; an
    // uppercase state abbreviation such as "Crossville TN" is an explicit pair.
    // v325: A shorter learned city must not eat the end of an explicitly written
    // longer city already present in contact info. Example: "East Syracuse, NY"
    // must not become "Syracuse, NY" merely because Syracuse is learned.
    // Only protect an existing city when the COMPLETE city and matching state
    // are visibly present together in the true resume header.
    const existingHeaderCity = normalizeContactDisplayCase(
        document.getElementById("txtCityDataEntry")?.value || ""
    );
    const existingHeaderState = String(
        document.getElementById("txtStateDataEntry")?.value || ""
    ).trim().toUpperCase();
    if (existingHeaderCity && existingHeaderState &&
        candidates.some(c => c.withState &&
            c.state === existingHeaderState &&
            existingHeaderCity.toLowerCase().endsWith(" " + c.city.toLowerCase()))) {
        const fullCityPattern = escapeRegex(existingHeaderCity).replace(/\s+/g, "\\s+");
        const fullCityState = new RegExp(
            "(^|[^A-Za-zÀ-ÖØ-öø-ÿ])(" + fullCityPattern + ")\\s*,?\\s*(" +
            escapeRegex(existingHeaderState) + ")\\b", "i"
        );
        const fullMatch = fullCityState.exec(head);
        if (fullMatch) {
            const fullIndex = fullMatch.index + fullMatch[1].length;
            // Add the full explicit pair at its real header position. This
            // naturally wins over the shorter suffix without changing the
            // existing candidate ranking for unrelated cities.
            candidates.push({ city: existingHeaderCity, state: existingHeaderState,
                learned: false, trusted: true, withState: true, index: fullIndex });
            console.info(`Toolbar CITY v325: protected complete explicit header city "${existingHeaderCity}, ${existingHeaderState}" from shorter suffix match.`);
        }
    }
    // v335: Protect the full existing city when the header spells out the state
    // name (Royal Palm Beach, Florida), not only its abbreviation (FL).
    // The v325 guard above checked FL literally and missed this case.
    if (existingHeaderCity && existingHeaderState &&
        candidates.some(c => c.withState && c.state === existingHeaderState &&
            existingHeaderCity.toLowerCase().endsWith(" " + c.city.toLowerCase()))) {
        const stateFullName = Object.entries(STATE_MAP).find(([name, code]) =>
            name.length > 2 && String(code).toUpperCase() === existingHeaderState)?.[0];
        if (stateFullName) {
            const fullCityPattern = escapeRegex(existingHeaderCity).replace(/\s+/g, "\\s+");
            const fullPattern = new RegExp("(^|[^A-Za-zÀ-ÖØ-öø-ÿ])(" + fullCityPattern +
                ")\\s*,?\\s*(" + escapeRegex(stateFullName) + ")\\b", "i");
            const match = fullPattern.exec(head);
            if (match) {
                const index = match.index + match[1].length;
                candidates.push({ city: existingHeaderCity, state: existingHeaderState,
                    learned: false, trusted: true, withState: true, index });
                console.info(`Toolbar CITY v335: protected full header city "${existingHeaderCity}, ${existingHeaderState}" with spelled-out state.`);
            }
        }
    }
    // v326: Resolve East Syracuse explicitly from the TRUE resume header even
    // when a previous run already shortened the contact City to Syracuse.
    // v325 relied on the existing contact field, so it could not repair that case.
    // Require the entire city + NY token; never infer from a bare "East" word.
    const eastSyracuseHeader = /(^|[^A-Za-zÀ-ÖØ-öø-ÿ])(East\s+Syracuse)\s*,?\s*(NY)\b/i.exec(head);
    if (eastSyracuseHeader) {
        const fullIndex = eastSyracuseHeader.index + eastSyracuseHeader[1].length;
        // Remove only the false shorter suffix at this same header occurrence.
        // Leave every other candidate and ranking rule untouched.
        const shorterAtSameLocation = candidates.some(c =>
            c.withState && c.city.toLowerCase() === "syracuse" && c.state === "NY" &&
            c.index >= fullIndex && c.index <= fullIndex + "East ".length + 1
        );
        if (shorterAtSameLocation) {
            candidates.push({ city: "East Syracuse", state: "NY", learned: false,
                trusted: true, withState: true, index: fullIndex });
            console.info('Toolbar CITY v326: full explicit header East Syracuse, NY outranks suffix Syracuse, NY.');
        }
    }
    // v336: Apostrophe-tolerant full-city protection for Lee's Summit and peers.
    // Word/curly apostrophe variants must not let a learned suffix replace the
    // original complete city and trigger an unrelated ZIP lookup.
    if (existingHeaderCity && existingHeaderState) {
        const flexibleCity = escapeRegex(existingHeaderCity)
            .replace(/[\'’]/g, "['’]").replace(/\s+/g, "\\s+");
        const fullState = Object.entries(STATE_MAP).find(([name, code]) =>
            name.length > 2 && String(code).toUpperCase() === existingHeaderState)?.[0];
        const stateToken = [existingHeaderState, fullState].filter(Boolean).map(escapeRegex).join("|");
        const fullPair = new RegExp("(^|[^A-Za-zÀ-ÖØ-öø-ÿ])(" + flexibleCity +
            ")\\s*,?\\s*(?:" + stateToken + ")\\b", "i").exec(head);
        if (fullPair && candidates.some(c => c.withState && c.state === existingHeaderState &&
            existingHeaderCity.toLowerCase().endsWith(" " + c.city.toLowerCase()))) {
            const fullIndex = fullPair.index + fullPair[1].length;
            candidates.push({ city: existingHeaderCity, state: existingHeaderState,
                learned: false, trusted: true, withState: true, index: fullIndex });
            console.info(`Toolbar CITY v336: retained complete header city "${existingHeaderCity}, ${existingHeaderState}" over learned suffix.`);
        }
    }
    // v337: Protect an already populated complete city + ZIP against a learned
    // suffix of that same city. This works even when the resume header extractor
    // loses the prefix (e.g. Lee's) while still finding Summit, MO.
    // No protection for blank ZIPs, different states, or unrelated city names.
    const existingZipForSuffixGuard = String(document.getElementById("txtZipDataEntry")?.value || "").trim();
    if (existingHeaderCity && existingHeaderState && /^\d{5}(?:-\d{4})?$/.test(existingZipForSuffixGuard)) {
        const full = existingHeaderCity.toLocaleLowerCase().replace(/[’‘]/g, "'");
        const suffixCandidates = candidates.filter(c => c.withState &&
            String(c.state || "").toUpperCase() === existingHeaderState &&
            full.endsWith(" " + String(c.city || "").toLocaleLowerCase().replace(/[’‘]/g, "'")));
        if (suffixCandidates.length) {
            // Remove ONLY matching shorter suffix candidates; leave other explicit
            // locations to compete under the existing header-ranking rules.
            for (const short of suffixCandidates) {
                const at = candidates.indexOf(short);
                if (at >= 0) candidates.splice(at, 1);
            }
            const earliest = Math.min(...suffixCandidates.map(c => c.index));
            candidates.push({ city: existingHeaderCity, state: existingHeaderState,
                learned: false, trusted: true, withState: true, index: earliest });
            console.info(`Toolbar CITY v337: kept existing complete city "${existingHeaderCity}, ${existingHeaderState}" and ZIP ${existingZipForSuffixGuard}; rejected learned shorter suffix.`);
        }
    }
    // v347: Purge malformed learned/header candidates before they can win,
    // erase a good ZIP, or suppress the Area fallback.
    for (let i = candidates.length - 1; i >= 0; i--) {
        if (!frt7ValidHeaderCity(candidates[i])) {
            console.info(`Toolbar CITY v347: rejected invalid header candidate "${candidates[i].city}, ${candidates[i].state}".`);
            candidates.splice(i, 1);
        }
    }
    if (!candidates.length) return null;

    // v348: Final fail-closed guard for every candidate source. Never promote a
    // standalone learned word to a trusted location, even if another path adds it.
    const winnerPool = candidates.filter(candidate => candidate.withState === true);
    if (!winnerPool.length) return null;
    winnerPool.sort((a, b) =>
        a.index - b.index ||
        b.city.length - a.city.length
    );

    // v332: Prefer the complete explicit city when a shorter suffix matches the
    // SAME header occurrence (e.g. Lee's Summit vs Summit). A candidate that
    // starts earlier and ends at the same position is the longer city.
    const overlappingSuffix = (shorter, longer) =>
        shorter !== longer && shorter.withState && longer.withState &&
        shorter.state === longer.state &&
        longer.city.toLocaleLowerCase().endsWith(" " + shorter.city.toLocaleLowerCase()) &&
        longer.index <= shorter.index &&
        longer.index + longer.city.length === shorter.index + shorter.city.length;
    const filteredPool = winnerPool.filter(shorter =>
        !winnerPool.some(longer => overlappingSuffix(shorter, longer))
    );
    filteredPool.sort((a,b) => a.index - b.index || b.city.length - a.city.length);
    const winner = filteredPool[0];
    // v447: Punctuation between City and State belongs to the separator,
    // never to the City. Keep the candidate and its offset otherwise intact.
    winner.city = String(winner.city || "").trim().replace(/[,;]+\s*$/, "").trim();
    console.info(
        `Toolbar CITY v153: trusted header city "${winner.city}"` +
        `${winner.state ? ", " + winner.state : ""} selected at header index ${winner.index}.`
    );

    return winner;
}

// v175 TRUE-HEADER REGIONAL ALIAS FALLBACK:
// Some resumes use a well-known metro/region label instead of a literal city.
// Keep this deliberately conservative. A real explicit U.S. City+State pair is
// checked before this fallback, so a literal header location always wins.
//
// Approved unambiguous mappings:
//   Bay Area / Bay Area, CA                    -> San Francisco, CA
//   DFW / Dallas-Fort Worth                    -> Dallas, TX
//   Twin Cities                                -> Minneapolis, MN
//   Research Triangle / RTP                    -> Raleigh, NC
//   Silicon Valley                             -> San Jose, CA
//   Greater Boston                             -> Boston, MA
//   Greater Chicago / Chicagoland              -> Chicago, IL
//   Greater Atlanta / Atlanta Metro            -> Atlanta, GA
//   Greater Houston / Houston Metro            -> Houston, TX
//
// Deliberately NOT included: Tri-State Area, South Bay, Capital Region, Metro Area,
// or other labels whose meaning changes by region.
//
// The matcher is restricted to the TRUE contact/header portion, so later Experience,
// Education, employer, or job-description references cannot become the applicant's
// contact location.
function findRegionalAliasInHeader(text) {
    if (!text) return null;

    const rawStart = String(text).slice(0, 1800);
    const sectionStop = findTrueResumeSectionStop(rawStart);
    const head = (sectionStop >= 0 ? rawStart.slice(0, sectionStop) : rawStart.slice(0, 900)).slice(0, 900);
    if (!head.trim()) return null;

    const aliases = [
        {
            label: "Bay Area",
            city: "San Francisco",
            state: "CA",
            phrase: /(?:San\s+Francisco\s+)?Bay\s+Area/i,
            regex: /(^|[^A-Za-z])(?:San\s+Francisco\s+)?Bay\s+Area(?:\s*,?\s*CA\b)?(?=$|[^A-Za-z])/i
        },
        {
            label: "DFW",
            city: "Dallas",
            state: "TX",
            phrase: /(?:DFW|Dallas\s*(?:[-–—\/]|\s)\s*Fort\s+Worth)/i,
            regex: /(^|[^A-Za-z])(?:DFW|Dallas\s*(?:[-–—\/]|\s)\s*Fort\s+Worth)(?:\s*,?\s*TX\b)?(?=$|[^A-Za-z])/i
        },
        {
            label: "Twin Cities",
            city: "Minneapolis",
            state: "MN",
            phrase: /Twin\s+Cities/i,
            regex: /(^|[^A-Za-z])Twin\s+Cities(?:\s*(?:Metro(?:politan)?(?:\s+Area)?|Area))?(?:\s*,?\s*MN\b)?(?=$|[^A-Za-z])/i
        },
        {
            label: "Research Triangle",
            city: "Raleigh",
            state: "NC",
            phrase: /(?:Research\s+Triangle|RTP)/i,
            regex: /(^|[^A-Za-z])(?:Research\s+Triangle(?:\s+Park)?|RTP)(?:\s*,?\s*NC\b)?(?=$|[^A-Za-z])/i
        },
        {
            label: "Silicon Valley",
            city: "San Jose",
            state: "CA",
            phrase: /Silicon\s+Valley/i,
            regex: /(^|[^A-Za-z])Silicon\s+Valley(?:\s*,?\s*CA\b)?(?=$|[^A-Za-z])/i
        },
        {
            label: "Greater Boston",
            city: "Boston",
            state: "MA",
            phrase: /Greater\s+Boston/i,
            regex: /(^|[^A-Za-z])Greater\s+Boston(?:\s+Area)?(?:\s*,?\s*MA\b)?(?=$|[^A-Za-z])/i
        },
        {
            label: "Greater Chicago / Chicagoland",
            city: "Chicago",
            state: "IL",
            phrase: /(?:Greater\s+Chicago|Chicagoland)/i,
            regex: /(^|[^A-Za-z])(?:Greater\s+Chicago(?:\s+Area)?|Chicagoland)(?:\s*,?\s*IL\b)?(?=$|[^A-Za-z])/i
        },
        {
            label: "Greater Atlanta / Atlanta Metro",
            city: "Atlanta",
            state: "GA",
            phrase: /(?:Greater\s+Atlanta|Atlanta\s+Metro(?:politan)?)/i,
            regex: /(^|[^A-Za-z])(?:Greater\s+Atlanta(?:\s+Area)?|Atlanta\s+Metro(?:politan)?(?:\s+Area)?)(?:\s*,?\s*GA\b)?(?=$|[^A-Za-z])/i
        },
        {
            label: "Greater St. Louis Area",
            city: "St. Louis",
            state: "MO",
            phrase: /Greater\s+St\.\s+Louis/i,
            regex: /(^|[^A-Za-z])Greater\s+St\.\s+Louis(?:\s+Area)?(?:\s*,?\s*MO\b)?(?=$|[^A-Za-z])/i
        },
        {
            label: "Greater Houston / Houston Metro",
            city: "Houston",
            state: "TX",
            phrase: /(?:Greater\s+Houston|Houston\s+Metro(?:politan)?)/i,
            regex: /(^|[^A-Za-z])(?:Greater\s+Houston(?:\s+Area)?|Houston\s+Metro(?:politan)?(?:\s+Area)?)(?:\s*,?\s*TX\b)?(?=$|[^A-Za-z])/i
        }
    ];

    let winner = null;

    for (const alias of aliases) {
        const match = alias.regex.exec(head);
        if (!match) continue;

        const matchedText = String(match[0] || "");
        const phraseOffset = matchedText.search(alias.phrase);
        const index = match.index + Math.max(0, phraseOffset);

        // If more than one approved regional label somehow appears in the header,
        // preserve the same "first header location wins" behavior used elsewhere.
        if (!winner || index < winner.index) {
            winner = { ...alias, index };
        }
    }

    if (!winner) return null;

    console.info(
        `Toolbar CITY v175: TRUE header regional alias "${winner.label}" -> ` +
        `${winner.city}, ${winner.state}.`
    );

    return {
        city: winner.city,
        state: winner.state,
        regionalAlias: winner.label,
        trusted: true,
        withState: true,
        index: winner.index
    };
}

function extractCityStateFromHeader(text) {
    if (!text) return null;

    // v142: If the TRUE contact header contains a distinctive military-installation
    // alias but no explicit normal U.S. City+State pair, use the installation now.
    // This prevents later generic parsing (or education/job locations) from obscuring
    // a base-only mailing header such as "Joint Base Andrews, 20762".
    const militaryHeaderCandidate = findMilitaryInstallationInHeader(text);
    const explicitUsHeaderCandidate = findUsCityDatabaseInHeader(text);
    const regionalAliasHeaderCandidate = !explicitUsHeaderCandidate
        ? findRegionalAliasInHeader(text)
        : null;
    if (regionalAliasHeaderCandidate) {
        return regionalAliasHeaderCandidate;
    }
    if (militaryHeaderCandidate && !explicitUsHeaderCandidate) {
        return militaryHeaderCandidate;
    }

    // v144 TRUE HEADER SECTION STOP:
    // Generic City/State extraction must obey the same true-header boundary as the
    // trusted-city and U.S.-city matchers. In particular, EDUCATION is never part of
    // the contact header. This prevents a school location such as
    // "Rider University ... Lawrenceville, NJ" from becoming the applicant location
    // when the actual header has no City/State. With no header location, the existing
    // Area fallback remains free to use the phone area code instead.
    const rawHeaderStart = String(text).slice(0, 1800);
    const headerSectionStop = findTrueResumeSectionStop(rawHeaderStart);
    const head = frt7MaskStateListsInHeader((headerSectionStop >= 0
        ? rawHeaderStart.slice(0, headerSectionStop)
        : rawHeaderStart.slice(0, 1200)
    ).slice(0, 1200));

    const abbrevs = Object.values(STATE_MAP);
    const fullNames = Object.keys(STATE_MAP);
    // Longest names first so "New York" is matched before any shorter token.
    const stateChoices = [...fullNames, ...abbrevs]
        .sort((a, b) => b.length - a.length)
        .map(value => value.replace(/\s+/g, "\\s+"));
    const statePattern = stateChoices.join("|");
    const cityWord = "[A-Za-z][A-Za-z'’.-]*";

    const currentFirstName = String(
        document.querySelector("#txtFirstNameDataEntry")?.value ||
        document.querySelector("#txtFirstName")?.value || ""
    ).trim();
    const currentLastName = String(
        document.querySelector("#txtLastNameDataEntry")?.value ||
        document.querySelector("#txtLastName")?.value || ""
    ).trim();

    let foundName = null;
    let firstName = currentFirstName;
    let lastName = currentLastName;
    try {
        foundName = hybridExtractName();
        firstName = firstName || String(foundName?.first || "").trim();
        lastName = lastName || String(foundName?.last || "").trim();
    } catch (error) {
        console.warn("Toolbar CITY: Could not read the detected applicant name.", error);
    }

    const normalizeWords = value => String(value || "")
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");
    const normalizedFirstName = normalizeWords(firstName);
    const normalizedLastName = normalizeWords(lastName);

    const escapeRegex = value => String(value || "")
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    function normalizeState(raw) {
        const stateRaw = String(raw || "").trim().toUpperCase().replace(/\s+/g, " ");
        if (STATE_MAP[stateRaw]) return STATE_MAP[stateRaw];
        if (abbrevs.includes(stateRaw)) return stateRaw;
        return null;
    }

    function stripApplicantPrefix(value) {
        let city = String(value || "").trim();
        if (!city) return "";

        const middleToken = "[A-Za-z][A-Za-z'’.-]*";
        if (firstName && lastName) {
            const firstEscaped = escapeRegex(firstName);
            const lastEscaped = escapeRegex(lastName);
            city = city.replace(new RegExp(
                "^" + firstEscaped + "(?:\\s+" + middleToken + "){0,4}\\s+" + lastEscaped +
                "(?:\\s+|[,;:|\\-]+\\s*)", "i"
            ), "").trim();
            city = city.replace(new RegExp(
                "^(?:" + middleToken + "\\s+){0,4}" + lastEscaped +
                "(?:\\s+|[,;:|\\-]+\\s*)(?=[A-Za-z])", "i"
            ), "").trim();
            city = city.replace(new RegExp(
                "^" + lastEscaped + "(?:\\s+|[,;:|\\-]+\\s*)(?=[A-Za-z])", "i"
            ), "").trim();
        }

        // Remove suffixes/credentials left between a name and location.
        city = city.replace(
            /^(?:(?:JR|SR|II|III|IV|V|ESQ|CPA|RN|MBA|PHD|ED\.?D|M\.?A|M\.?S|B\.?A|B\.?S)\.?[,]?\s+)+/i,
            ""
        ).trim();
        return city;
    }

    function isSafeCandidate(candidate) {
        const city = String(candidate || "").trim();
        if (!city || /\d/.test(city)) return false;
        if (/[;:!?@]/.test(city)) return false;
        if (/\b(?:COM|NET|ORG|EDU|GOV)\b/i.test(city)) return false;
        if (/\b(?:STREET|ROAD|AVENUE|BOULEVARD|DRIVE|LANE|COURT|TERRACE|TRAIL|HIGHWAY|PARKWAY|CIRCLE|PLACE|AVE|BLVD|LN|TER|TRL|HWY|PKWY|CIR)\.?\b/i.test(city)) return false;

        const words = city.split(/\s+/).filter(Boolean);
        if (words.length < 1 || words.length > 4) return false;

        const normalized = normalizeWords(city);
        const tokens = new Set(normalized.split(" ").filter(Boolean));
        if ((normalizedFirstName && tokens.has(normalizedFirstName)) ||
            (normalizedLastName && tokens.has(normalizedLastName))) return false;
        return true;
    }

    function cleanSegment(raw) {
        let segment = String(raw || "")
            .replace(/^[\s,|;:\-]+|[\s,|;:\-]+$/g, "")
            .trim();
        if (!segment) return "";

        // If a full street address is present, only text after its final street
        // suffix can be the city. This handles "8716 N. Robinhood Ave, Kansas City".
        const streetSuffix = /\b(?:STREET|ST|ROAD|RD|AVENUE|AVE|BOULEVARD|BLVD|DRIVE|DR|LANE|LN|COURT|CT|TERRACE|TER|TRAIL|TRL|WAY|HIGHWAY|HWY|PARKWAY|PKWY|CIRCLE|CIR|PLACE|PL)\.?\b/ig;
        let suffixMatch;
        let lastSuffixEnd = -1;
        while ((suffixMatch = streetSuffix.exec(segment)) !== null) lastSuffixEnd = streetSuffix.lastIndex;
        if (lastSuffixEnd >= 0 && /\d/.test(segment.slice(0, lastSuffixEnd))) {
            segment = segment.slice(lastSuffixEnd).replace(/^[\s,|;:\-]+/, "").trim();
        }

        segment = stripApplicantPrefix(segment);

        // v133 REMOTE/HYBRID STATUS PREFIX CLEANUP:
        // Flattened resumes can place work-mode/status text immediately before the
        // real header city, e.g. "Rachel Petersen Remote/Hybrid Employee Olin,IA".
        // Remove ONLY a leading Remote/Hybrid status phrase after the applicant name
        // has already been stripped. This keeps the actual city nearest the state
        // while leaving employer/job-line protections unchanged.
        segment = segment.replace(
            /^(?:(?:REMOTE\s*\/\s*HYBRID|HYBRID\s*\/\s*REMOTE|REMOTE|HYBRID)(?:\s+EMPLOYEE)?\s+)+/i,
            ""
        ).trim();

        // Keep the tail nearest the state. Earlier header text is usually a name,
        // label, phone, or email that was flattened onto the same line.
        const tokens = segment.split(/\s+/).filter(Boolean);
        if (tokens.length > 4) segment = tokens.slice(-4).join(" ");
        segment = stripApplicantPrefix(segment);

        return isSafeCandidate(segment) ? segment : "";
    }

    // Remove contact elements before location parsing. Replacing them with a hard
    // delimiter prevents strings such as "gmail.com Miami" from becoming a city.
    const prepared = head
        .replace(/https?:\/\/\S+|www\.\S+/gi, " | ")
        .replace(/[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}/gi, " | ")
        .replace(/(?:\+?1[\s.\-]?)?(?:\(?\d{3}\)?[\s.\-]?)\d{3}[\s.\-]?\d{4}/g, " | ")
        .replace(/[•·●]+/g, " | ");

    const lines = prepared.split(/[\n\r]+/).map(line => line.trim()).filter(Boolean);
    const stateRegex = new RegExp("\\b(" + statePattern + ")\\b(?:\\s*,?\\s*\\d{5}(?:-\\d{4})?)?", "ig");

    for (const line of lines) {
        stateRegex.lastIndex = 0;
        let match;
        while ((match = stateRegex.exec(line)) !== null) {
            const state = normalizeState(match[1]);
            if (!state) continue;

            // Only inspect the contact segment immediately before the state.
            // Email/phone/URL replacements and visual separators create "|".
            const beforeState = line.slice(0, match.index);
            const segment = beforeState.split(/[|;]/).pop() || "";

            // A learned city has priority over the broad parser. This lets a
            // confirmed correction such as "Round Rock" win over flattened
            // title text like "Strategic Business Development Round Rock".
            const learnedCity = getLearnedCityAtEnd(segment, state);
            if (learnedCity) return { city: learnedCity, state, learned: true };

            const city = cleanSegment(segment);
            if (city) return { city, state };
        }
    }

    // v141: Only after normal City/State parsing fails, try a distinctive military
    // installation alias from the true header. This keeps ordinary location priority
    // unchanged while supporting headers that contain only a base name.
    return findMilitaryInstallationInHeader(text);
}

function isSafeAutoCity(loc) {
    if (!loc || !loc.city || !loc.state) return false;

    const city = String(loc.city).trim();
    if (!city) return false;

    // Auto mode must not treat an employer/job line as the applicant's city.
    // Examples rejected: "Frontline Insurance at Niceville", "Manager at Orlando".
    if (/\b(at|for|with|remote|hybrid)\b/i.test(city)) return false;
    if (/\b(insurance|company|corporation|corp|inc|llc|hospital|university|college|school|bank|services?|solutions?|group|department|manager|director|associate|specialist|underwriter|sales|customer|employment|history|experience)\b/i.test(city)) return false;

    // v406: A street address is never a city, even after the house number
    // has been stripped by the existing City cleaner.
    if (/\b(?:street|st\.?|avenue|ave\.?|road|rd\.?|drive|dr\.?|lane|ln\.?|boulevard|blvd\.?|court|ct\.?|circle|cir\.?|place|pl\.?|parkway|pkwy|highway|hwy|terrace|trail)\s*$/i.test(city) || /^\d{1,6}\s+/.test(city)) return false;

    // Real US city names are normally short. A long phrase is much more likely
    // to be a company, title, or sentence fragment captured before the state.
    const words = city.split(/\s+/).filter(Boolean);
    if (words.length > 4) return false;

    // Reject sentence-like punctuation while allowing normal city punctuation.
    if (/[;:!?]/.test(city)) return false;

    return true;
}

// v134 REMOTE/HYBRID EXPLICIT HEADER LOCATION:
// Some flattened resumes put a work-mode label directly before the real location:
//   "Remote/Hybrid Employee Olin,IA"
// This matcher is intentionally NARROW. It requires the Remote/Hybrid status phrase,
// then an explicit comma before a 2-letter state. It therefore cannot reinterpret a
// street suffix such as "Bloomfield Ct" as Connecticut.
function findExplicitRemoteHybridHeaderCity(text) {
    if (!text) return null;

    const rawStart = String(text).slice(0, 1800);
    const sectionStop = findTrueResumeSectionStop(rawStart);
    const head = (sectionStop >= 0 ? rawStart.slice(0, sectionStop) : rawStart.slice(0, 900)).slice(0, 900);

    // v140: Remote/Hybrid headers also accept written-out state names, not only
    // abbreviations. Example: "Remote Employee Westfield, Indiana" -> Westfield, IN.
    const escapeStateRegex = value => String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const stateChoices = [...Object.keys(STATE_MAP), ...Object.values(STATE_MAP)]
        .sort((a, b) => b.length - a.length)
        .map(value => escapeStateRegex(value).replace(/\s+/g, "\\s+"))
        .join("|");
    const re = new RegExp(
        "\\b(?:REMOTE\\s*\\/\\s*HYBRID|HYBRID\\s*\\/\\s*REMOTE|REMOTE|HYBRID)" +
        "(?:\\s+EMPLOYEE)?\\s+([A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ.'’\\-]*" +
        "(?:\\s+[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ.'’\\-]*){0,3})\\s*,\\s*(" +
        stateChoices + ")\\b",
        "i"
    );
    const m = re.exec(head);
    if (!m) return null;

    const city = normalizeContactDisplayCase(String(m[1] || '').trim());
    const rawState = String(m[2] || '').trim().toUpperCase().replace(/\s+/g, " ");
    const state = STATE_MAP[rawState] || (Object.values(STATE_MAP).includes(rawState) ? rawState : "");
    if (!city || !/^[A-Z]{2}$/.test(state)) return null;
    if (learnedCityCollidesWithApplicantLastName(city)) return null;

    // v331: Remote/Hybrid text is NOT proof that preceding words form a city.
    // Trust only an exact saved/learned city-state pair or verified US city pair.
    // Recover a genuine city suffix (e.g. Springfield) without absorbing a job title.
    const candidates = [city];
    const words = city.split(/\s+/);
    for (let i = 1; i < words.length; i++) candidates.push(words.slice(i).join(" "));
    const learned = learnedCitiesLoaded ? Object.values(learnedCitiesCache || {}).filter(e =>
        e && e.deleted !== true && e.trustedManualCity !== false && e.city &&
        String(e.state).toUpperCase() === state) : [];
    const verified = candidates.find(candidate => isSafeAutoCity({city:candidate,state}) &&
        (learned.some(e => learnedCityStateKey(e.city,state) === learnedCityStateKey(candidate,state)) ||
         isUsCityDatabasePair(candidate,state)));
    if (!verified || learnedCityCollidesWithApplicantLastName(verified)) {
        console.info(`Toolbar CITY v331: rejected unverified Remote/Hybrid location -> ${city}, ${state}.`);
        return null;
    }
    console.info(`Toolbar CITY v331: verified Remote/Hybrid city -> ${verified}, ${state}.`);
    return { city: verified, state, trusted: true, explicitHeaderPair: true, remoteHybridHeader: true, index: m.index };
}


// v187 LOCATION-ONLY RAW CONTACT PRIORITY:
// Some WallStJobs resumes expose only the CONTACT column in txtResumeRaw while the
// rendered iframe contains the whole resume. getResumeText() intentionally replaces a
// very short raw value with iframe text for other autofill features, but that is unsafe
// for location: a later Education city can then outrank the actual contact city.
//
// For CITY/STATE ONLY, inspect the literal txtResumeRaw first. If it contains an
// explicit "City, ST" pair, trust that contact snippet before any iframe-derived text.
// This does NOT change getResumeText(), Name, Email, Phone, or the general iframe fallback.
function findExplicitLocationInLiteralRawContact() {
    const raw = String(document.getElementById("txtResumeRaw")?.value || "").trim();
    if (!raw) return null;

    // v436: Preserve an already-correct contact City/State/ZIP when the exact
    // same complete address appears in the actual resume contact header.
    // This handles "Atlanta Ga. 30349" without weakening the street-suffix
    // guard for ambiguous "Bloomfield Ct" addresses. Require the ZIP too,
    // so employer cities later in Experience cannot override the contact.
    const currentCity = String(document.getElementById("txtCityDataEntry")?.value || "").trim();
    const currentState = String(document.getElementById("txtStateDataEntry")?.value || "").trim().toUpperCase();
    const currentZip = String(document.getElementById("txtZipDataEntry")?.value || "").trim();
    const trueHeaderEnd = findTrueResumeSectionStop(raw);
    const trueContactHeader = raw.slice(0, Math.min(900, trueHeaderEnd >= 0 ? trueHeaderEnd : 900));
    if (currentCity && /^[A-Z]{2}$/.test(currentState) && /^\d{5}(?:-\d{4})?$/.test(currentZip)) {
        const cityPattern = currentCity.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
        const statePattern = currentState.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const zipPattern = currentZip.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const exactAddress = new RegExp("(^|[^A-Za-z])(" + cityPattern + ")\\s*,?\\s*(" + statePattern + ")\\.?\\s+(" + zipPattern + ")(?!\\d)", "i");
        if (exactAddress.test(trueContactHeader) && !learnedCityCollidesWithApplicantLastName(currentCity)) {
            console.info(`Toolbar CITY v436: preserved exact contact header City/State/ZIP -> ${currentCity}, ${currentState} ${currentZip}.`);
            return { city: normalizeContactDisplayCase(currentCity), state: currentState, zip: currentZip, trusted: true, withState: true, literalRawContact: true, explicitHeaderPair: true };
        }
    }

    // v421: Recover an exact learned City, ST from the TRUE contact header
    // BEFORE the broad parser can reject glued phone/city/state/email text.
    // Keep the match before section headings to avoid work/education locations.
    const sectionEnd = findTrueResumeSectionStop(raw);
    const contactHeader = raw.slice(0, Math.min(900, sectionEnd >= 0 ? sectionEnd : 900));
    // v422: The resume converter can glue the state abbreviation directly to
    // the verified contact email, e.g. Arlington, TXgilkey.kelvin20@gmail.com.
    // The old \b after TX rejects this because g is also a word character.
    // Only permit this boundary when the complete current contact email follows.
    const contactEmail = String(document.getElementById("txtEmail")?.value || "").trim();
    const escapedContactEmail = contactEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const stateEndBoundary = contactEmail.includes("@")
        ? "(?:\\b|(?=" + escapedContactEmail + "))"
        : "\\b";
    if (learnedCitiesLoaded) {
        const matches = Object.values(learnedCitiesCache || {})
            .filter(e => e && e.deleted !== true && e.trustedManualCity !== false && e.city && e.state)
            .sort((a, b) => b.city.length - a.city.length);
        for (const e of matches) {
            const pattern = String(e.city).replace(/^St\.?(?=\s)/i, "St").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                .replace(/^St(?=\s)/i, "St\\.?").replace(/\s+/g, "\\s+");
            const re = new RegExp("(" + pattern + ")\\s*,\\s*" + String(e.state).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + stateEndBoundary, "i");
            if (re.test(contactHeader) && !learnedCityCollidesWithApplicantLastName(e.city)) {
                console.info(`Toolbar CITY v421: recovered exact learned header suffix -> ${e.city}, ${e.state}.`);
                return { city: normalizeContactDisplayCase(e.city), state: e.state, trusted: true, withState: true, literalRawContact: true };
            }
        }

    }
    const parsed = extractCityStateFromHeader(raw);
    if (!parsed?.city || !parsed?.state || !isSafeAutoCity(parsed)) return null;

    // v298 TRUST GATE FOR LITERAL RAW CONTACT:
    // v187 intentionally preferred literal txtResumeRaw contact text, but it called
    // the broad City/State parser and then unconditionally stamped that result as
    // trusted. That let resume prose such as "Credit Income Analysis FHA, VA"
    // masquerade as a contact location and block the Area fallback.
    //
    // Literal raw contact priority is preserved, but the parsed pair must now be an
    // EXACT active Learned City+State pair OR an exact U.S. City Database pair before
    // this path is allowed to call it trusted. If the database is still loading, this
    // path simply waits; the existing database-ready retry will run Auto City again.
    // v330: Flattened header may prepend unrelated words to a real learned city.
    // Only recover a saved city when its full name is immediately followed by
    // an explicit comma + matching state in the first 900 header characters.
    const headerPrefix = raw.slice(0, 900);
    if (learnedCitiesLoaded) {
        const matches = Object.values(learnedCitiesCache || {})
            .filter(e => e && e.deleted !== true && e.trustedManualCity !== false && e.city && e.state)
            .sort((a,b) => b.city.length - a.city.length);
        for (const e of matches) {
            const pattern = String(e.city).replace(/^St\.?(?=\s)/i, "St").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                .replace(/^St(?=\s)/i, "St\\.?").replace(/\s+/g, "\\s+");
            const re = new RegExp("(" + pattern + ")\\s*,\\s*" + String(e.state).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + stateEndBoundary, "i");
            if (re.test(headerPrefix) && !learnedCityCollidesWithApplicantLastName(e.city)) {
                console.info(`Toolbar CITY v330: recovered exact learned header suffix -> ${e.city}, ${e.state}.`);
                return { city: normalizeContactDisplayCase(e.city), state: e.state, trusted: true, withState: true, literalRawContact: true };
            }
        }
    }
    const parsedCity = normalizeContactDisplayCase(parsed.city);
    const parsedState = String(parsed.state || "").trim().toUpperCase();
    const parsedPairKey = learnedCityStateKey(parsedCity, parsedState);
    const learnedPairEntry = learnedCitiesLoaded
        ? Object.values(learnedCitiesCache || {}).find(entry =>
            entry &&
            entry.deleted !== true &&
            entry.trustedManualCity !== false &&
            learnedCityStateKey(entry.city, entry.state) === parsedPairKey
        )
        : null;
    const exactTrustedPair = Boolean(learnedPairEntry) || isUsCityDatabasePair(parsedCity, parsedState);
    if (!exactTrustedPair) {
        console.info(
            `Toolbar CITY v298: rejected literal txtResumeRaw City/State because it is not an exact trusted pair -> ${parsedCity}, ${parsedState}.`
        );
        return null;
    }

    parsed.city = parsedCity;
    parsed.state = parsedState;

    const cityEsc = String(parsed.city)
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .replace(/\s+/g, "\\s+");
    const stateEsc = String(parsed.state)
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Require an explicit comma so a tiny raw fragment cannot manufacture a city
    // from ordinary prose. Example supported: "Studio City, CA".
    const explicitPair = new RegExp(
        "(^|[^A-Za-zÀ-ÖØ-öø-ÿ])" + cityEsc + "\\s*,\\s*" + stateEsc + "\\b",
        "i"
    );
    if (!explicitPair.test(raw.slice(0, 900))) return null;

    const loc = {
        ...parsed,
        city: normalizeContactDisplayCase(parsed.city),
        state: String(parsed.state).trim().toUpperCase(),
        trusted: true,
        withState: true,
        literalRawContact: true
    };
    console.info(
        `Toolbar CITY v187: literal txtResumeRaw contact location wins -> ${loc.city}, ${loc.state}.`
    );
    return loc;
}


// v202 CURRENT/FIRST EXPERIENCE CITY+STATE FALLBACK
// IMPORTANT: This helper deliberately lives in the SAME scope as
// fillCityOnlyFromResume(), so Auto City, City, and City/ST can all use it.
//
// Priority is unchanged:
//   1) true-header / saved / trusted location
//   2) first valid City+State in the current/first Experience block
//   3) existing Area-code fallback
//
// It never scans Education. It takes the FIRST valid pair encountered in Experience.
// A comma is optional because flattened resumes often say "Washington DC".
function frt7FindCurrentExperienceCityStateV202(resumeText) {
    const raw = String(resumeText || "");
    if (!raw.trim()) return null;

    const startText = raw.slice(0, 10000);

    const experienceHeading =
        /\b(?:PROFESSIONAL\s+EXPERIENCE|WORK\s+EXPERIENCE|EMPLOYMENT\s+HISTORY|RELEVANT\s+EXPERIENCE|EXPERIENCE)\b/i.exec(startText);
    if (!experienceHeading) return null;

    const experienceStart = experienceHeading.index + experienceHeading[0].length;
    let experience = startText.slice(experienceStart, experienceStart + 1800);

    // Hard stop before Education or other later sections.
    const stop = experience.search(
        /\b(?:EDUCATION|ACADEMIC|SKILLS|CERTIFICATIONS?|LICENSES?|PROJECTS?|AWARDS?|REFERENCES?|LANGUAGES?)\b/i
    );
    if (stop >= 0) experience = experience.slice(0, stop);

    const states =
        "AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY";

    // Capture up to six words immediately before a state abbreviation.
    // We then peel off employer/title words until the suffix itself is a real city.
    const re = new RegExp(
        "([A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ.'’\\\\-]*(?:\\\\s+[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ.'’\\\\-]*){0,5})\\\\s*,?\\\\s+(" +
        states +
        ")\\\\b",
        "gi"
    );

    let m;
    while ((m = re.exec(experience))) {
        const state = String(m[2] || "").trim().toUpperCase();
        const words = String(m[1] || "")
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .filter(Boolean);

        // Try the longest suffix first. Example:
        // "International Rescue Committee Washington DC"
        //   International Rescue Committee Washington -> no
        //   Rescue Committee Washington               -> no
        //   Committee Washington                      -> no
        //   Washington                                -> YES
        for (let i = 0; i < words.length; i++) {
            const city = normalizeContactDisplayCase(words.slice(i).join(" "));
            if (!city) continue;

            let valid = false;

            // Washington, DC is unambiguous and can be accepted even during the tiny
            // window before the downloaded city database is ready.
            if (state === "DC" && /^Washington$/i.test(city)) {
                valid = true;
            }

            // User-saved/trusted city pair can also be used immediately.
            if (!valid) {
                try {
                    const key = learnedCityStateKey(city, state);
                    const saved = learnedCitiesCache?.[key];
                    valid = Boolean(
                        saved &&
                        saved.deleted !== true &&
                        saved.city &&
                        saved.trustedManualCity !== false &&
                        String(saved.state || "").trim().toUpperCase() === state
                    );
                } catch (_) {}
            }

            // Normal/general case: validate against the existing U.S. City Database.
            if (!valid && usCityDbLoaded) {
                valid = isUsCityDatabasePair(city, state);
            }

            if (!valid) continue;

            console.info(
                `Toolbar CITY v202: no header/saved location; using first current-Experience pair -> ${city}, ${state}.`
            );

            return {
                city,
                state,
                trusted: true,
                currentExperienceFallback: true
            };
        }
    }

    return null;
}

// v312: Only when raw-header detection fails, inspect the formatted Word iframe's
// actual contact header. Never inspect work history or change the general resume getter.
function frt7FormattedIframeContactCityV312() {
    try {
        const frame = document.querySelector('iframe[src*="displayresumetext"]') ||
            document.querySelector('#divResumeContainer iframe');
        const doc = frame?.contentDocument || frame?.contentWindow?.document;
        const root = doc?.querySelector('.Section1') || doc?.body;
        if (!root) return null;
        const lines = [];
        for (const node of root.querySelectorAll('p')) {
            if (lines.length >= 7) break;
            const value = String(node.innerText || node.textContent || '').replace(/\s+/g, ' ').trim();
            if (!value) continue;
            if (/^(?:professional experience|employment history|work experience|education|core skills|summary|objective|profile)\b/i.test(value)) break;
            lines.push(value);
        }
        // The first few contact paragraphs must include an email; this prevents
        // mistaking a job's City, State for the applicant's address.
        if (!lines.some(line => /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(line))) return null;
        for (const line of lines.slice(0, 4)) {
            const match = line.match(/^([A-Za-z][A-Za-z .'-]{1,55}?)\s*,\s*([A-Z]{2})(?=\s|$)/i);
            if (!match) continue;
            const city = normalizeContactDisplayCase(match[1]);
            const state = match[2].toUpperCase();
            if (!isUsCityDatabasePair(city, state)) continue;
            console.info(`Toolbar AUTO CITY v312: validated formatted iframe CONTACT header -> ${city}, ${state}.`);
            return { city, state, trusted: true, explicitHeaderPair: true };
        }
    } catch (_) {}
    return null;
}

function fillCityOnlyFromResume(options = {}) {
    if (options?.trustedOnly && !options?.manualButton) {
        const coverLetterApplicant = frt7CoverLetterExistingLocationCandidate();
        if (coverLetterApplicant) {
            frt7SetAuthoritativeHeaderLocation(coverLetterApplicant, "v361 early cover-letter guard");
            return true;
        }
    }
    if (options?.trustedOnly && !options?.manualButton) {
        const verified = frt7VerifiedExistingContactLocation();
        if (verified) {
            frt7SetAuthoritativeHeaderLocation(verified, "verified resume contact address v359");
            console.info(`Toolbar CITY v359: protected verified applicant contact ${verified.city}, ${verified.state} ${verified.zip}; ignored employment cities.`);
            return true;
        }
    }

    // v297 PRE-CITY HARD SOURCE LOCK:
    // This function is an EARLIER Auto City path than fillAutoCityStateFromResume().
    // v295 protected the later path, but this earlier call could already replace the
    // source-provided City (for example Anaheim -> Southern) before v295 ever ran.
    // For Career Builder / Resume Library Auto runs, if BOTH City and State arrived
    // populated, they are authoritative. Do not run ANY resume/header/learned-city
    // resolver here. The later Auto City/State pass owns ZIP mismatch repair using
    // this untouched source City+State pair. Manual City-button behavior is unchanged.
    if (options?.trustedOnly && (!options?.manualButton || options?.autoInvocation) &&
        frt7SourceProtectionAllowed()) {
        const sourceName = frt7IsCareerBuilderSource() ? "Career Builder" : "Resume Library";
        const sourceCityInput = document.getElementById("txtCityDataEntry");
        const sourceStateInput = document.getElementById("txtStateDataEntry");
        const sourceCity = normalizeContactDisplayCase(String(sourceCityInput?.value || "").trim());
        const sourceState = String(sourceStateInput?.value || "").trim().toUpperCase();
        if (sourceCity && /^[A-Z]{2}$/.test(sourceState)) {
            console.info(`Toolbar AUTO CITY v297: ${sourceName} pre-city hard lock; kept existing ${sourceCity}, ${sourceState} and skipped resume/header city detection.`);
            return true;
        }
    }

    // v198 MANUAL CITY ISOLATION:
    // Auto keeps its existing location ownership/manual-lock behavior. A real toolbar
    // City/City-ST request may explicitly reuse the trusted resolver without being
    // blocked by an earlier human location touch on this applicant.
    if (options?.trustedOnly && !options?.manualButton && frt7HumanTouchedLocation()) return false;
    const text = getResumeText();

    // v133 EXPLICIT HEADER CITY FALLBACK:
    // Keep the existing trusted/saved-city priority exactly as-is. If that matcher
    // finds nothing, allow one very narrow fallback: a safe City, ST pair that is
    // written with an explicit comma in the TRUE resume header. This fixes flattened
    // headers such as "Remote/Hybrid Employee Olin,IA" without weakening the v131
    // street-suffix guard ("Bloomfield Ct Hagerstown, MD" cannot become Bloomfield, CT
    // because there is no comma between Bloomfield and Ct).
    // v215: Saved/trusted City+State explicitly found in the TRUE header outranks
    // generic literal/header parsing. This prevents credentials such as "BS, MS" plus
    // a following street number from stealing the contact location before a saved pair
    // such as "Horizon City TX" is considered.
    const v215SavedHeaderCity = options.trustedOnly ? findTrustedLearnedCityInHeader(text) : null;
    let loc = options.trustedOnly
        ? (
            findExplicitRemoteHybridHeaderCity(text) ||
            v215SavedHeaderCity ||
            findExplicitLocationInLiteralRawContact() ||
            findUsCityDatabaseInHeader(text) ||
            findUsCityZipInHeaderV171(text) ||
            findRegionalAliasInHeader(text)
        )
        : (findExplicitLocationInLiteralRawContact() || extractCityStateFromHeader(text));

    if (options.trustedOnly && (!loc || !loc.city)) {
        const parsed = extractCityStateFromHeader(text);
        if (parsed?.city && parsed?.state && isSafeAutoCity(parsed)) {
            const rawStart = String(text || "").slice(0, 1800);
            const sectionStop = findTrueResumeSectionStop(rawStart);
            const head = (sectionStop >= 0 ? rawStart.slice(0, sectionStop) : rawStart.slice(0, 900)).slice(0, 900);
            const cityEscaped = String(parsed.city).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
            const stateEscaped = String(parsed.state).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const explicitPair = new RegExp("(^|[^A-Za-zÀ-ÖØ-öø-ÿ])" + cityEscaped + "\\s*,\\s*" + stateEscaped + "\\b", "i");

            if (explicitPair.test(head)) {
                // v299 TRUST GATE FOR v133 EXPLICIT HEADER FALLBACK:
                // An explicit comma only proves that the text LOOKS like City, ST; it does
                // not prove the city is real. v133 previously stamped any safe-looking
                // explicit pair as trusted, allowing resume prose such as
                // "Credit Income Analysis FHA, VA" to bypass the normal trusted-city
                // requirement after v298 correctly rejected it in the literal-raw path.
                // Require the exact City+State pair to exist in active Learned Cities or
                // the U.S. City Database before this fallback may become trusted.
                const parsedCity = normalizeContactDisplayCase(parsed.city);
                const parsedState = String(parsed.state || "").trim().toUpperCase();
                const parsedPairKey = learnedCityStateKey(parsedCity, parsedState);
                const learnedPairEntry = learnedCitiesLoaded
                    ? Object.values(learnedCitiesCache || {}).find(entry =>
                        entry &&
                        entry.deleted !== true &&
                        entry.trustedManualCity !== false &&
                        learnedCityStateKey(entry.city, entry.state) === parsedPairKey
                    )
                    : null;
                const exactTrustedPair = Boolean(learnedPairEntry) || isUsCityDatabasePair(parsedCity, parsedState);

                if (exactTrustedPair) {
                    loc = { ...parsed, city: parsedCity, state: parsedState, trusted: true, explicitHeaderPair: true };
                    console.info(`Toolbar AUTO CITY v299: trusted explicit HEADER pair fallback -> ${parsedCity}, ${parsedState}.`);
                } else {
                    console.info(`Toolbar AUTO CITY v299: rejected explicit HEADER pair because it is not an exact trusted pair -> ${parsedCity}, ${parsedState}.`);
                }
            }
        }
    }

    // v312: Raw resume can be complete but lack the location shown in the Word
    // preview. Only fill the missing trusted result from a validated contact header.
    if (options.trustedOnly && (!loc || !loc.city)) {
        loc = frt7FormattedIframeContactCityV312() || loc;
    }

    // v204 NARROW CURRENT-JOB PRESERVATION FIX:
    // Do NOT manufacture a new contact City/State from the first/current Experience block.
    // Experience is corroboration only: the existing v182 Area guard may preserve an
    // ALREADY-LOADED valid City+State when that exact pair matches the current job.
    // If there is no real header/saved/trusted contact location, leave this unresolved so
    // the normal Area fallback can use the phone area code.
    if (!loc || !loc.city) {
        console.warn(
            options.trustedOnly
                ? "Toolbar AUTO CITY v204: no trusted header/saved contact City+State found; allowing Area fallback."
                : "Toolbar CITY-ONLY v204: no header contact city found; allowing Area fallback."
        );
        return false;
    }

    if (!options.trustedOnly && options.requireConfirmation && !isSafeAutoCity(loc)) {
        console.warn("Toolbar AUTO CITY: Rejected unconfirmed city candidate:", loc.city);
        return false;
    }

    // v243: Auto may recognize a learned city word by itself, but that bare word
    // must never overwrite a complete valid left-side location. Explicit learned
    // City+State pairs continue through the original authoritative path unchanged.
    if (options.trustedOnly && !options.cityOnlyStrict && loc?.learned && loc.withState === false) {
        const standaloneGuard = frt7HandleStandaloneLearnedCityAutoGuard(loc, "Auto City");
        if (standaloneGuard.handled) return true;
    }

    const cityInput = document.getElementById("txtCityDataEntry");
    const stateInput = document.getElementById("txtStateDataEntry");
    const zipInput = document.getElementById("txtZipDataEntry");
    const lookupInput = document.getElementById("txtZipLookupEntry");

    if (!cityInput) {
        console.warn("Toolbar CITY-ONLY: City field not found.");
        return false;
    }

    const normalized = normalizeContactDisplayCase(String(loc.city || "").replace(/[,;]+\s*$/, ""));
    const originalCity = normalizeContactDisplayCase(String(cityInput.value || "").replace(/[,;]+\s*$/, ""));
    const cityActuallyChanged = originalCity !== normalized;
    let changed = false;

    // Synchronize City first.
    if (originalCity === normalized) {
        if (String(cityInput.value || "").trim() !== normalized) {
            cityInput.value = normalized;
            triggerEvents(cityInput);
            changed = true;
        }
    } else {
        cityInput.value = normalized;
        triggerEvents(cityInput);
        changed = true;
        console.info(
            options.trustedOnly
                ? `Toolbar AUTO CITY v54: trusted learned city -> ${normalized}`
                : `Toolbar CITY-ONLY: ${normalized}`
        );
    }

    // v198 STRICT MANUAL CITY BUTTON:
    // The City button is allowed to reuse the EXACT trusted/saved-city resolver above,
    // but it must stop after City. It must NEVER touch State, ZIP, ZIP Lookup, or the
    // authoritative location lock. Auto does not pass cityOnlyStrict, so Auto behavior
    // below remains completely unchanged.
    if (options.cityOnlyStrict) {
        return changed || originalCity === normalized;
    }

    // v54 TRUSTED LOCATION SYNC:
    // A trusted city result that carries a valid state is one location pair.
    // This applies BOTH to:
    //   - a standalone learned city whose saved state supplies the state, and
    //   - an explicit trusted City, ST / City, State match in the resume header.
    //
    // If either City or State changes, any existing ZIP may belong to the old
    // location. Clear it and ask WallStJobs' own ZIP lookup for the trusted pair.
    const trustedState = String(loc.state || "").trim().toUpperCase();

    // v154: Any trusted resolved City+State pair becomes authoritative immediately.
    // This includes explicit DB/header pairs and safe standalone saved-city results.
    // All later Area recovery paths consult this lock before they may use the phone.
    if (
        options.trustedOnly &&
        loc?.city &&
        /^[A-Z]{2}$/.test(trustedState)
    ) {
        try {
            frt7SetAuthoritativeHeaderLocation(
                { ...loc, city: normalizeContactDisplayCase(loc.city), state: trustedState },
                "fillCityOnlyFromResume"
            );
            frt7QueueAuthoritativeLocationSettleGuard("trusted City/State fill");
        } catch (_) {}
    }

    if (
        options.trustedOnly &&
        /^[A-Z]{2}$/.test(trustedState) &&
        stateInput
    ) {
        const stateLocked = isManualContactLocked("state", stateInput);
        const zipLocked = zipInput ? isManualContactLocked("zip", zipInput) : false;
        const currentState = String(stateInput.value || "").trim().toUpperCase();
        const stateActuallyChanged = currentState !== trustedState;

        if (!stateLocked && stateActuallyChanged) {
            stateInput.value = trustedState;
            triggerEvents(stateInput);
            changed = true;
            console.info(
                `Toolbar CITY v54: trusted location synchronized State ${currentState || "(blank)"} -> ${trustedState}.`
            );
        }

        // Only repair the ZIP when Auto is allowed to own the State and ZIP.
        // If the user manually edited State, do not use a conflicting inferred pair.
        const canUseTrustedPair = !stateLocked &&
            String(stateInput.value || "").trim().toUpperCase() === trustedState;

        if (canUseTrustedPair && zipInput && lookupInput && !zipLocked) {
            const zipIsBlank = !String(zipInput.value || "").trim();

            // v172 AUTHORITATIVE TRUE-HEADER City, ZIP:
            // v171 can now prove a location from an exact true-header pattern such as
            // "Owasso, 74055" by resolving the ZIP's state and verifying Owasso, OK
            // against the active U.S. City Database. Once that proof exists, the ZIP
            // itself is part of the same authoritative contact location. Do not leave a
            // stale WallStJobs ZIP (often a 5-digit street number) in place just because
            // it is nonblank. Use the same direct/native ZIP writer as the existing raw-
            // header ZIP safety path, and briefly reassert only during the normal <=2s
            // load window in case WallStJobs finishes an older async validation afterward.
            const explicitCityZip = loc.explicitHeaderCityZip && /^\d{5}$/.test(String(loc.zip || ""))
                ? String(loc.zip)
                : "";

            if (explicitCityZip) {
                writeHeaderZipDirect({ zip: explicitCityZip }, "v173 verified header City, ZIP");
                commitVerifiedHeaderZipV173(explicitCityZip);
                changed = true;
                queueVerifiedHeaderCityZipEnforcerV172(loc, "trusted City/State sync");
            } else if (cityActuallyChanged || stateActuallyChanged) {
                // v447: A punctuation-only city correction is NOT a move.
                // If the existing ZIP is consistent with the trusted state,
                // retain it rather than launching a lookup that can return
                // an unrelated ZIP. Genuine city/state moves still use v309.
                const priorCity = normalizeContactDisplayCase(String(cityInput.value || "").replace(/[,;]+\s*$/, ""));
                const currentZip = String(zipInput.value || "").trim();
                const zipState = /^\d{5}$/.test(currentZip) ? frt7StateFromZipV171(currentZip) : "";
                if (!cityActuallyChanged && !stateActuallyChanged && currentZip && (!zipState || zipState === trustedState)) {
                    console.info(`Toolbar CITY v447: retained existing ZIP ${currentZip} for unchanged ${normalized}, ${trustedState}.`);
                    return changed;
                }
                // v309: A ZIP matching only the STATE is not sufficient when the
                // trusted header changes the CITY. Without an explicit header ZIP,
                // discard the old city's ZIP and use the existing city/state lookup.
                const existingZip = String(zipInput.value || "").trim();
                if (existingZip) {
                    zipInput.value = "";
                    triggerEvents(zipInput);
                    console.info(`Toolbar CITY v309: cleared prior ZIP ${existingZip}; trusted header ${normalized}, ${trustedState} has no ZIP.`);
                }
                changed = true;

                const militaryZip = (loc.militaryInstallation || loc.explicitHeaderCityZip) && /^\d{5}$/.test(String(loc.zip || ""))
                    ? String(loc.zip)
                    : "";
                if (militaryZip) {
                    zipInput.value = militaryZip;
                    triggerEvents(zipInput);
                    changed = true;
                    console.info(`Toolbar CITY v141: City/State changed; set military installation ZIP -> ${militaryZip}.`);
                } else if (frt7ApplyQueensZipV319(normalized, trustedState, "trusted city change")) {
                    changed = true;
                } else {
                    lookupInput.value = `${normalized}, ${trustedState}`;
                    fireZipLookupEnter(lookupInput);
                    console.info(
                        `Toolbar CITY v54: City/State changed; refreshed ZIP -> ${lookupInput.value}.`
                    );
                }
            } else if (zipIsBlank) {
                // v141: If the static military record carries an exact installation ZIP,
                // use it directly (no request). Otherwise keep the existing ZIP lookup.
                const militaryZip = (loc.militaryInstallation || loc.explicitHeaderCityZip) && /^\d{5}$/.test(String(loc.zip || ""))
                    ? String(loc.zip)
                    : "";
                if (militaryZip) {
                    zipInput.value = militaryZip;
                    triggerEvents(zipInput);
                    changed = true;
                    console.info(`Toolbar CITY v141: filled military installation ZIP -> ${militaryZip}.`);
                } else if (normalized.trim().toLowerCase() === "queens" && trustedState === "NY") {
                    // v311: This is already the confirmed trusted-header city path.
                    // Queens is not supported by the site's city ZIP lookup.
                    changed = frt7ApplyQueensZipV319(normalized, trustedState, "trusted blank ZIP") || changed;
                } else {
                    lookupInput.value = `${normalized}, ${trustedState}`;
                    fireZipLookupEnter(lookupInput);
                    console.info(
                        `Toolbar CITY v54: filled blank ZIP -> ${lookupInput.value}.`
                    );
                }
            }
        }
    }

    return changed || originalCity === normalized;
}

function fireZipLookupEnter(input) {
    if (!input) return;

    // v308: The Bay Area is a regional label, not a ZIP-lookup city.
    // Use the same San Francisco metro mapping already recognized by the
    // header alias detector, regardless of which Auto ZIP path called us.
    // Leave other locations and the existing ZIP lookup mechanism unchanged.
    if (/^San\s+Francisco\s+Bay\s+Area\s*,\s*CA$/i.test(String(input.value || "").trim())) {
        input.value = "San Francisco, CA";
        console.info("Toolbar ZIP v308: San Francisco Bay Area, CA -> San Francisco, CA for ZIP lookup.");
    }

    // The site performs its City/State ZIP lookup from the lookup field's
    // keyboard handler. Fire the complete Enter sequence so it behaves like
    // the user typed the value and pressed Enter.
    for (const type of ["input", "change"]) {
        input.dispatchEvent(new Event(type, { bubbles: true }));
    }
    for (const type of ["keydown", "keypress", "keyup"]) {
        input.dispatchEvent(new KeyboardEvent(type, {
            bubbles: true,
            cancelable: true,
            key: "Enter",
            code: "Enter",
            which: 13,
            keyCode: 13
        }));
    }
}

// v243 STANDALONE LEARNED-CITY AUTO GUARD:
// A learned city word by itself in the TRUE header (for example "Brandon") is
// weaker evidence than an explicit learned City+State pair. Auto must not use the
// saved state from that bare city to replace a complete, error-free WallStJobs
// location. If WallStJobs reports anything other than its explicit green
// "State and zip match" result, phone Area is the fallback. With no usable phone,
// leave City/State/ZIP completely alone for manual review. Explicit City+State
// header matches are intentionally NOT affected by this helper.
function frt7HandleStandaloneLearnedCityAutoGuard(loc, reason = "auto") {
    if (!loc?.learned || loc.withState !== false) return { handled: false };

    const cityInput = document.getElementById("txtCityDataEntry");
    const stateInput = document.getElementById("txtStateDataEntry");
    const zipInput = document.getElementById("txtZipDataEntry");
    const currentCity = String(cityInput?.value || "").trim();
    const currentState = String(stateInput?.value || "").trim().toUpperCase();
    const currentZip = String(zipInput?.value || "").trim();

    const phoneDigits = String(getAreaSourcePhone?.() || "")
        .replace(/\D/g, "")
        .replace(/^1(?=\d{10}$)/, "");
    const hasPhone = phoneDigits.length >= 10;

    // No phone means no automatic location inference from the bare learned city.
    // Preserve whatever WallStJobs loaded so the user can resolve it from resume clues.
    if (!hasPhone) {
        console.info(`Toolbar CITY v243: standalone learned city "${loc.city}" ignored (${reason}); no phone available, leaving location untouched for manual review.`);
        return { handled: true, action: "leave" };
    }

    const pageText = String(document.body?.innerText || "").replace(/\s+/g, " ");
    const explicitMatch = /State\s+and\s+zip\s+match/i.test(pageText);
    const completeLocation = Boolean(
        currentCity && /^[A-Z]{2}$/.test(currentState) && /^\d{5}(?:-\d{4})?$/.test(currentZip)
    );

    // The ONLY validation state that preserves the existing complete location is
    // WallStJobs' explicit "State and zip match" success message.
    if (completeLocation && explicitMatch) {
        console.info(`Toolbar CITY v243: standalone learned city "${loc.city}" ignored (${reason}); existing ${currentCity}, ${currentState} ${currentZip} has State and zip match.`);
        return { handled: true, action: "preserve" };
    }

    // Any other validation state/error uses the exact existing Area button path.
    const areaBtn = document.getElementById("frt7-location-btn");
    if (areaBtn) {
        console.info(`Toolbar CITY v243: standalone learned city "${loc.city}" ignored (${reason}); location is not explicitly State-and-ZIP-match, clicking Area.`);
        areaBtn.click();
        return { handled: true, action: "area" };
    }

    return { handled: true, action: "leave" };
}


// v293 CAREER BUILDER + RESUME LIBRARY VALID-LOCATION PRESERVE:
// These sources commonly supply a usable City/State/ZIP on the review page.
// If all three are already populated and WallStJobs shows NO location/ZIP error,
// Auto must leave that location exactly as loaded.
function frt7IsCareerBuilderSource() {
    try {
        const pageText = String(document.body?.innerText || "").replace(/\s+/g, " ");
        return /\bSource\s*:?\s*Career\s+Builder\b/i.test(pageText);
    } catch (_) {
        return false;
    }
}

function frt7IsResumeLibrarySource() {
    try {
        const pageText = String(document.body?.innerText || "").replace(/\s+/g, " ");
        return /\bSource\s*:?\s*Resume\s+Library\b/i.test(pageText);
    } catch (_) {
        return false;
    }
}

// v305 SOURCE-PROTECTION HEADER EXCEPTION:
// Career Builder / Resume Library protection is only allowed when the TRUE resume
// header does NOT contain a trusted/learned City+State pair. If a trusted learned
// city or trusted U.S.-city database pair is present in the header, normal header
// location logic must win exactly as it does for other sources.
function frt7TrustedHeaderPairBypassesSourceProtection() {
    try {
        const text = String(getResumeText() || "");
        if (!text.trim()) return null;
        const loc =
            findTrustedLearnedCityInHeader(text) ||
            findUsCityDatabaseInHeader(text) ||
            findUsCityZipInHeaderV171(text);
        const city = normalizeContactDisplayCase(String(loc?.city || "").trim());
        const state = String(loc?.state || "").trim().toUpperCase();
        return city && /^[A-Z]{2}$/.test(state) ? { ...loc, city, state } : null;
    } catch (_) {
        return null;
    }
}

function frt7SourceProtectionAllowed() {
    if (!(frt7IsCareerBuilderSource() || frt7IsResumeLibrarySource())) return false;
    const trustedHeader = frt7TrustedHeaderPairBypassesSourceProtection();
    if (trustedHeader) {
        // v332: An incomplete suffix of the source-provided city is NOT a
        // different trusted header location. Keep the source city and ZIP.
        const sourceCity = String(document.getElementById("txtCityDataEntry")?.value || "").trim();
        const sourceState = String(document.getElementById("txtStateDataEntry")?.value || "").trim().toUpperCase();
        const norm = value => String(value || "").normalize("NFC").replace(/[’‘]/g, "'").toLocaleLowerCase().replace(/\s+/g, " ").trim();
        if (sourceState === trustedHeader.state && norm(sourceCity).endsWith(" " + norm(trustedHeader.city))) {
            console.info(`Toolbar AUTO CITY v332: preserved full source city "${sourceCity}, ${sourceState}"; rejected shorter header suffix "${trustedHeader.city}".`);
            return true;
        }
        const sourceName = frt7IsCareerBuilderSource() ? "Career Builder" : "Resume Library";
        console.info(`Toolbar AUTO CITY v305: ${sourceName} protection bypassed because trusted/learned header pair exists -> ${trustedHeader.city}, ${trustedHeader.state}.`);
        return false;
    }
    return true;
}

function frt7CareerBuilderValidLocationMustStay(reason = "auto location") {
    const sourceName = frt7IsCareerBuilderSource() ? "Career Builder" : (frt7IsResumeLibrarySource() ? "Resume Library" : "");
    if (!sourceName || !frt7SourceProtectionAllowed()) return false;

    const city = String(document.getElementById("txtCityDataEntry")?.value || "").trim();
    const state = String(document.getElementById("txtStateDataEntry")?.value || "").trim().toUpperCase();
    const zip = String(document.getElementById("txtZipDataEntry")?.value || "").trim();

    if (!city || !/^[A-Z]{2}$/.test(state) || !/^\d{5}(?:-\d{4})?$/.test(zip)) return false;

    const pageText = String(document.body?.innerText || "").replace(/\s+/g, " ");
    const hasLocationError =
        /State\s+and\s+zip\s+do\s+not\s+match/i.test(pageText) ||
        /Zip\s+state\s+is\s*:/i.test(pageText) ||
        /Could\s+not\s+find\s+State\s+for\s+that\s+zip/i.test(pageText) ||
        /No\s+zip(?:\s+code)?\s+(?:was\s+)?provided/i.test(pageText) ||
        /No\s+zip\s+provided/i.test(pageText);

    if (hasLocationError) return false;

    console.info(
        `Toolbar LOCATION v293: ${sourceName} has complete error-free location; ` +
        `preserving ${city}, ${state} ${zip} (${reason}).`
    );
    return true;
}

// v294 CAREER BUILDER / RESUME LIBRARY CITY+STATE AUTHORITY:
// For these two sources, if WallStJobs already loaded a City and 2-letter State,
// keep that pair even when the ZIP is wrong/missing. Repair ONLY the ZIP by using
// the existing City, State in Lookup Zip. Do not replace the pair from resume
// header parsing or phone Area fallback.
function frt7SourceCityStateZipRepair(reason = "auto ZIP repair") {
    const sourceName = frt7IsCareerBuilderSource() ? "Career Builder" : (frt7IsResumeLibrarySource() ? "Resume Library" : "");
    if (!sourceName || !frt7SourceProtectionAllowed()) return false;

    const cityInput = document.getElementById("txtCityDataEntry");
    const stateInput = document.getElementById("txtStateDataEntry");
    const zipInput = document.getElementById("txtZipDataEntry");
    const lookupInput = document.getElementById("txtZipLookupEntry");
    if (!cityInput || !stateInput || !zipInput || !lookupInput) return false;

    const city = normalizeContactDisplayCase(String(cityInput.value || "").trim());
    const state = String(stateInput.value || "").trim().toUpperCase();
    if (!city || !/^[A-Z]{2}$/.test(state)) return false;

    const status = getWebsiteZipStatus();
    if (status !== "mismatch" && status !== "unresolvedzip" && status !== "blank") return false;

    // Manual ZIP edits remain authoritative, just like the rest of the toolbar.
    if (isManualContactLocked("zip", zipInput)) return false;

    // Preserve City/State exactly in meaning (only harmless display casing/state case).
    if (String(cityInput.value || "").trim() !== city) {
        cityInput.value = city;
        triggerEvents(cityInput);
    }
    if (String(stateInput.value || "").trim() !== state) {
        stateInput.value = state;
        triggerEvents(stateInput);
    }

    if (String(zipInput.value || "").trim()) {
        zipInput.value = "";
        triggerEvents(zipInput);
    }
    lookupInput.value = `${city}, ${state}`;
    fireZipLookupEnter(lookupInput);
    console.info(`Toolbar AUTO ZIP v294: ${sourceName} ${status}; preserved existing City/State and looked up ZIP for ${city}, ${state} (${reason}).`);
    return true;
}

function getWebsiteZipStatus() {
    const zipInput = document.getElementById("txtZipDataEntry");
    const stateInput = document.getElementById("txtStateDataEntry");
    const zip = String(zipInput?.value || "").trim();
    const state = String(stateInput?.value || "").trim().toUpperCase();
    const zipState = /^\d{5}$/.test(zip) ? frt7StateFromZipV171(zip) : "";

    // v197 ORIGINAL-LOCATION / STALE-VALIDATION FIX:
    // WallStJobs' red/green validation text can lag behind the fields during an
    // applicant repaint. When the visible 5-digit ZIP independently maps to the
    // visible State, stale red text must NOT cause us to clear a correct ZIP and
    // cascade into Area. Conversely, stale green text cannot bless a ZIP whose
    // state is known to disagree with the visible State.
    const pageText = String(document.body?.innerText || "").replace(/\s+/g, " ");
    const pageSaysMismatch =
        /State\s+and\s+zip\s+do\s+not\s+match/i.test(pageText) ||
        /Zip\s+state\s+is\s*:/i.test(pageText);

    if (zipState && /^[A-Z]{2}$/.test(state)) {
        if (zipState === state) {
            if (pageSaysMismatch) {
                console.info(`Toolbar AUTO ZIP v197: ignored stale mismatch text because ${zip} maps to ${state}.`);
            }
            return "match";
        }
        return "mismatch";
    }

    // v117 BLANK-ZIP MISMATCH DETECTION:
    // WallStJobs can clear the visible ZIP field while still showing its red
    // "State and zip do not match! (Zip state is: XX)" validation message.
    if (pageSaysMismatch) return "mismatch";

    // v322: 00000 is a missing ZIP, not a valid populated ZIP.
    // Route it through the existing trusted City/State lookup workflow.
    if (/^0{5}$/.test(zip)) return "blank";

    if (!zip) return "blank";

    // v110: WallStJobs can also leave a populated but unusable ZIP and show
    // "Could not find State for that zip." Treat this as its own status.
    if (/Could\s+not\s+find\s+State\s+for\s+that\s+zip/i.test(pageText)) return "unresolvedzip";
    if (/State\s+and\s+zip\s+match/i.test(pageText)) return "match";
    return "unknown";
}

// v197 PRE-AUTO LOADED LOCATION SNAPSHOT:
// Capture the complete City/State/ZIP that WallStJobs supplied BEFORE any Auto
// City/ZIP/Area code can alter it. This is per-applicant and is used only as a
// veto against PHONE-AREA fallback; an explicit trusted resume-header location
// is still allowed to override the site's initial location through the normal
// higher-priority header pipeline.
function frt7CapturePreAutoLocationSnapshot(reason = "auto") {
    const city = normalizeContactDisplayCase(String(
        document.getElementById("txtCityDataEntry")?.value || ""
    ).trim());
    const state = String(
        document.getElementById("txtStateDataEntry")?.value || ""
    ).trim().toUpperCase();
    const zip = String(
        document.getElementById("txtZipDataEntry")?.value || ""
    ).trim();
    const key = getApplicantLifecycleKey();

    window.__frt7_pre_auto_location = {
        key,
        city,
        state,
        zip,
        capturedAt: Date.now(),
        reason
    };
    return window.__frt7_pre_auto_location;
}

function frt7GetValidPreAutoLocationSnapshot() {
    const snap = window.__frt7_pre_auto_location;
    if (!snap) return null;

    const currentKey = getApplicantLifecycleKey();
    if (snap.key && currentKey && snap.key !== currentKey) return null;

    const city = normalizeContactDisplayCase(String(snap.city || "").trim());
    const state = String(snap.state || "").trim().toUpperCase();
    const zip = String(snap.zip || "").trim();
    if (!city || !/^[A-Z]{2}$/.test(state) || !/^\d{5}$/.test(zip)) return null;

    const zipState = frt7StateFromZipV171(zip);
    if (!zipState || zipState !== state) return null;

    // Once the city DB is available, also require the original City+State itself
    // to be a real active U.S. city pair. This prevents junk initial values from
    // gaining protection merely because their ZIP happens to be in the same state.
    if (usCityDbLoaded && !isUsCityDatabasePair(city, state)) return null;

    if (/^(?:no\s+location|remote|hybrid|remote\s*\/\s*hybrid|hybrid\s*\/\s*remote)$/i.test(city)) {
        return null;
    }

    return { ...snap, city, state, zip };
}

function frt7PreAutoLocationBlocksPhoneArea(reason = "Area") {
    const snap = frt7GetValidPreAutoLocationSnapshot();
    if (!snap) return false;

    console.info(
        `Toolbar AREA v197: ${reason} blocked; WallStJobs originally loaded ` +
        `${snap.city}, ${snap.state} ${snap.zip}, and that ZIP independently maps to ${snap.state}.`
    );
    return true;
}

function normalizeLocationText(value) {
    return frt7ExpandLatinLigatures(value)
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");
}

// v107 DEFINITIVE NO-ZIP DETECTION:
// WallStJobs uses more than one red status message for a failed/absent ZIP.
// In particular, "No zips found in resume..." was not covered by the older
// "No zip code provided" test, so Auto could leave a bad City/State stranded.
function pageShowsDefinitiveNoZipResult() {
    const pageText = String(document.body?.innerText || "").replace(/\s+/g, " ");
    return /No\s+zip\s+code\s+provided/i.test(pageText) ||
           /No\s+zips?\s+found\s+in\s+(?:the\s+)?resume/i.test(pageText) ||
           /No\s+zip\s+codes?\s+found\s+in\s+(?:the\s+)?resume/i.test(pageText);
}

// v108 DIRECT CUSTOM-AREA RECOVERY:
// Do not depend on the toolbar Area button being "clicked" successfully.
// Once the normal City/State -> ZIP path has had time to work and ZIP is still
// blank, a user-saved custom area code can apply its City/State directly and
// then invoke the exact same ZIP lookup helper used elsewhere.
//
// Safety rules:
//   1) Auto must be ON and City + ZIP Lookup enabled.
//   2) No manual City/State/ZIP edit on this applicant.
//   3) A trusted/saved City+State in the actual resume header still wins.
//   4) The phone must start with a USER-SAVED custom area code.
//   5) ZIP must still be blank.
//   6) We recover only after a definitive no-ZIP message OR after the normal
//      lookup has been allowed enough time to settle.
async function applyDirectCustomAreaRecovery(reason = "custom area fallback", allowSettledBlank = false) {
    if (frt7HumanTouchedLocation()) return false;
    // v197: custom phone-area mappings are also last-resort fallbacks and therefore
    // may not replace a valid complete location that was already on the page pre-Auto.
    if (frt7PreAutoLocationBlocksPhoneArea(`custom Area recovery (${reason})`)) return false;
    const stored = await browser.storage.local.get([AUTO_KEY, AUTO_FIELDS_KEY]);
    const fields = { ...DEFAULT_AUTO_FIELDS, ...(stored[AUTO_FIELDS_KEY] || {}) };
    if (!stored[AUTO_KEY] || !fields.city || !fields.zipLookup) return false;

    const cityInput = document.getElementById("txtCityDataEntry");
    const stateInput = document.getElementById("txtStateDataEntry");
    const zipInput = document.getElementById("txtZipDataEntry");
    const lookupInput = document.getElementById("txtZipLookupEntry");
    if (!cityInput || !stateInput || !zipInput || !lookupInput) return false;

    if (
        isManualContactLocked("city", cityInput) ||
        isManualContactLocked("state", stateInput) ||
        isManualContactLocked("zip", zipInput)
    ) {
        return false;
    }

    if (String(zipInput.value || "").trim()) return false;

    // v155: Custom Area is also forbidden whenever ANY authoritative header
    // location exists. This closes the custom-area side door around the normal guard.
    const trustedHeaderLoc = getAuthoritativeHeaderLocationForAuto(getResumeText());
    const trustedHeaderState = String(trustedHeaderLoc?.state || "").trim().toUpperCase();
    if (trustedHeaderLoc?.city && /^[A-Z]{2}$/.test(trustedHeaderState)) {
        return false;
    }

    let digits = String(getAreaSourcePhone() || "").replace(/\D/g, "");
    if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
    if (digits.length < 10) return false;

    const area = digits.slice(0, 3);
    loadCustomAreaCodes();
    const info = customAreaCodesCache[area];
    if (!info?.city || !/^[A-Z]{2}$/.test(String(info.state || "").trim().toUpperCase())) {
        return false;
    }

    // Either WallStJobs has explicitly told us there is no ZIP, or this call is
    // one of the delayed "settled blank" checks after normal Auto has finished.
    if (!pageShowsDefinitiveNoZipResult() && !allowSettledBlank) return false;

    const mappedCity = normalizeContactDisplayCase(info.city);
    const mappedState = String(info.state || "").trim().toUpperCase();
    const currentCity = normalizeContactDisplayCase(String(cityInput.value || "").trim());
    const currentState = String(stateInput.value || "").trim().toUpperCase();

    // Already on the custom-area location: just ensure its ZIP lookup is running.
    if (currentCity !== mappedCity) {
        cityInput.value = mappedCity;
        triggerEvents(cityInput);
    }
    if (currentState !== mappedState) {
        stateInput.value = mappedState;
        triggerEvents(stateInput);
    }

    zipInput.value = "";
    triggerEvents(zipInput);
    lookupInput.value = `${mappedCity}, ${mappedState}`;
    triggerEvents(lookupInput);

    // Use the shared reliable ZIP helper, then repeat Enter briefly because
    // WallStJobs sometimes ignores the first lookup during a staged repaint.
    runConfirmedZipLookup(
        { city: mappedCity, state: mappedState },
        { zipStatus: "blank" }
    );

    [180, 500, 1000, 1800].forEach(delay => {
        setTimeout(() => {
            const freshCity = document.getElementById("txtCityDataEntry");
            const freshState = document.getElementById("txtStateDataEntry");
            const freshZip = document.getElementById("txtZipDataEntry");
            const freshLookup = document.getElementById("txtZipLookupEntry");
            if (!freshLookup || String(freshZip?.value || "").trim()) return;
            if (normalizeContactDisplayCase(String(freshCity?.value || "").trim()) !== mappedCity) return;
            if (String(freshState?.value || "").trim().toUpperCase() !== mappedState) return;

            freshLookup.value = `${mappedCity}, ${mappedState}`;
            fireZipLookupEnter(freshLookup);
        }, delay);
    });

    console.info(
        `Toolbar AUTO AREA v108: DIRECT custom area ${area} recovery (${reason}) -> ` +
        `${mappedCity}, ${mappedState}; ZIP lookup requested.`
    );
    return true;
}


// v160 RAW HEADER ZIP ENFORCER:
// Read the actual hidden txtResumeRaw source directly. If the TRUE contact header
// contains a U.S. state followed immediately by a standalone 5-digit ZIP, that ZIP
// is authoritative. This does NOT use the City parser and does NOT use ZIP Lookup.
let frt7HeaderZipEnforcerToken = 0;

// v163 PERFORMANCE-ONLY CACHE:
// txtResumeRaw is immutable for a settled applicant. The old safety loops called this
// helper many times in ~2 seconds, rebuilding every state regex and rescanning the same
// header each time. Cache ONLY the derived answer for the exact raw-resume string +
// expected state. A new/changed resume automatically invalidates the cache.
let frt7RawHeaderZipCacheRaw = null;
let frt7RawHeaderZipCacheByState = new Map();
let frt7RawHeaderZipStateTokens = null;

function getObviousRawHeaderZip(expectedState = "") {
    const ta = document.getElementById("txtResumeRaw");
    const raw = String(ta?.value || "");
    if (!raw.trim()) return null;
    const ocrAddress = frt7OcrNorthBrunswickHeader(raw);
    if (ocrAddress && (!expectedState || String(expectedState).toUpperCase() === 'NJ')) {
        return {state:'NJ', zip:'08902', index:ocrAddress.index};
    }

    const expected = String(expectedState || "").trim().toUpperCase();

    if (raw !== frt7RawHeaderZipCacheRaw) {
        frt7RawHeaderZipCacheRaw = raw;
        frt7RawHeaderZipCacheByState = new Map();
    }

    const cacheKey = expected || "*";
    if (frt7RawHeaderZipCacheByState.has(cacheKey)) {
        return frt7RawHeaderZipCacheByState.get(cacheKey);
    }

    // Only inspect the contact/header portion. Use the existing true-heading detector
    // when available, with a conservative character cap as the fallback.
    const rawStart = raw.slice(0, 1800);
    const sectionStop = findTrueResumeSectionStop(rawStart);
    const header = (
        sectionStop >= 0 ? rawStart.slice(0, sectionStop) : rawStart.slice(0, 1200)
    ).slice(0, 1200);

    const esc = value => String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // STATE_MAP does not change during an applicant load, so build/sort these tokens
    // only once instead of on every ZIP safety heartbeat.
    if (!frt7RawHeaderZipStateTokens) {
        frt7RawHeaderZipStateTokens = [];
        for (const [fullName, abbr] of Object.entries(STATE_MAP || {})) {
            const state = String(abbr || "").trim().toUpperCase();
            if (!/^[A-Z]{2}$/.test(state)) continue;
            frt7RawHeaderZipStateTokens.push({ token: fullName, state });
            frt7RawHeaderZipStateTokens.push({ token: state, state });
        }
        frt7RawHeaderZipStateTokens.sort((a, b) => String(b.token).length - String(a.token).length);
    }

    let best = null;
    for (const item of frt7RawHeaderZipStateTokens) {
        if (expected && item.state !== expected) continue;

        const tokenRe = esc(item.token).replace(/\s+/g, "\\s+");
        // Require a real state token, then ordinary separator whitespace/comma,
        // then exactly five ZIP digits. Reject ZIP+4 and any longer digit run.
        const re = new RegExp(
            `\\b${tokenRe}\\b\\s*,?\\s+(\\d{5})(?![\\d-])`,
            "ig"
        );

        let m;
        while ((m = re.exec(header))) {
            if (!best || m.index < best.index) {
                best = { state: item.state, zip: m[1], index: m.index };
            }
        }
    }

    frt7RawHeaderZipCacheByState.set(cacheKey, best);
    return best;
}

function writeHeaderZipDirect(found, reason = "auto") {
    if (!found?.zip) return false;

    const zipInput = document.getElementById("txtZipDataEntry");
    if (!zipInput) return false;

    // Preserve a genuine human ZIP edit on this applicant.
    if (isManualContactLocked("zip", zipInput)) return true;

    const current = String(zipInput.value || "").trim();
    if (current === found.zip) return true;

    // Use the native HTMLInputElement setter so this works even if the page has
    // wrapped/redefined the element's value property.
    try {
        const setter = Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype, "value"
        )?.set;
        if (setter) setter.call(zipInput, found.zip);
        else zipInput.value = found.zip;
    } catch (_) {
        zipInput.value = found.zip;
    }

    // input is enough to notify page listeners without deliberately invoking the
    // site's onchange ZIP-lookup/check pipeline ourselves.
    zipInput.dispatchEvent(new Event("input", { bubbles: true }));

    console.info(
        `Toolbar AUTO ZIP v160: raw-header ZIP enforced -> ${found.zip} (${reason}).`
    );
    return true;
}

// v173 VERIFIED HEADER ZIP COMMIT:
// v172 correctly writes a verified City, ZIP value, but WallStJobs can leave its
// old red State/ZIP validation text on screen until the ZIP field receives the
// same interaction sequence as a real user edit. Keep this deliberately narrow:
// only callers that already proved an explicit true-header City, ZIP use it.
function commitVerifiedHeaderZipV173(expectedZip = "") {
    const zipInput = document.getElementById("txtZipDataEntry");
    if (!zipInput) return false;
    if (isManualContactLocked("zip", zipInput)) return false;

    const zip = String(expectedZip || "").trim();
    if (!/^\d{5}$/.test(zip)) return false;
    if (String(zipInput.value || "").trim() !== zip) return false;

    // Re-fire the normal field lifecycle, then press Enter on the ZIP field.
    // This does NOT perform a City/State ZIP lookup and does not alter the value;
    // it only asks WallStJobs to revalidate the ZIP that is already present.
    zipInput.dispatchEvent(new Event("input", { bubbles: true }));
    zipInput.dispatchEvent(new Event("change", { bubbles: true }));
    for (const type of ["keydown", "keypress", "keyup"]) {
        zipInput.dispatchEvent(new KeyboardEvent(type, {
            bubbles: true,
            cancelable: true,
            key: "Enter",
            code: "Enter",
            keyCode: 13,
            which: 13
        }));
    }
    zipInput.dispatchEvent(new Event("blur", { bubbles: true }));
    console.info(`Toolbar AUTO ZIP v173: committed verified header ZIP -> ${zip}.`);
    return true;
}

function applyObviousHeaderZipFromResume(expectedState = "", reason = "auto") {
    const found = getObviousRawHeaderZip(expectedState);
    if (!found?.zip) return "";

    writeHeaderZipDirect(found, reason);
    return found.zip;
}

function queueRawHeaderZipEnforcer(reason = "resume load") {
    const token = ++frt7HeaderZipEnforcerToken;
    const startedAt = Date.now();

    // v228 PERFORMANCE: parse the resume/header ONCE. The old repaint enforcer
    // repeated getObviousRawHeaderZip() every 250ms for ~2 seconds, which could
    // repeatedly scan the full resume after Auto already said Done. Preserve the
    // same late-repaint protection, but make later checks simple DOM comparisons.
    const initialState = String(
        document.getElementById("txtStateDataEntry")?.value || ""
    ).trim().toUpperCase();
    const cachedFound = getObviousRawHeaderZip(
        /^[A-Z]{2}$/.test(initialState) ? initialState : ""
    );
    if (!cachedFound?.zip) return;

    const attempt = () => {
        if (token !== frt7HeaderZipEnforcerToken) return;

        const zipInput = document.getElementById("txtZipDataEntry");
        const currentZip = String(zipInput?.value || "").trim();
        if (currentZip !== String(cachedFound.zip)) {
            writeHeaderZipDirect(cachedFound, reason);
        }

        // Same ~2 second repaint window; no repeated resume parsing.
        if (Date.now() - startedAt >= 1900) return;
        setTimeout(attempt, 250);
    };

    attempt();
}

// v172 VERIFIED City, ZIP SHORT LOAD-WINDOW ENFORCER:
// A verified true-header City, ZIP is stronger than a stale site ZIP. This is NOT a
// sticky reconciler: it runs only inside the existing ~2 second load window and aborts
// immediately if the user touches City/State/ZIP or any of those fields is manually locked.
let frt7VerifiedCityZipEnforcerTokenV172 = 0;
function queueVerifiedHeaderCityZipEnforcerV172(loc, reason = "verified City, ZIP") {
    const city = normalizeContactDisplayCase(String(loc?.city || "").trim());
    const state = String(loc?.state || "").trim().toUpperCase();
    const zip = String(loc?.zip || "").trim();
    if (!loc?.explicitHeaderCityZip || !city || !/^[A-Z]{2}$/.test(state) || !/^\d{5}$/.test(zip)) return;

    const token = ++frt7VerifiedCityZipEnforcerTokenV172;
    const startedAt = Date.now();

    const attempt = () => {
        if (token !== frt7VerifiedCityZipEnforcerTokenV172) return;
        if (frt7HumanTouchedLocation()) return;

        const cityInput = document.getElementById("txtCityDataEntry");
        const stateInput = document.getElementById("txtStateDataEntry");
        const zipInput = document.getElementById("txtZipDataEntry");
        if (!cityInput || !stateInput || !zipInput) return;
        if (isManualContactLocked("city", cityInput) ||
            isManualContactLocked("state", stateInput) ||
            isManualContactLocked("zip", zipInput)) return;

        // Reassert only while the visible City+State still equal the location that was
        // proven from the true header. Never use this to drag other location fields back.
        const currentCity = normalizeContactDisplayCase(String(cityInput.value || "").trim());
        const currentState = String(stateInput.value || "").trim().toUpperCase();
        if (currentCity !== city || currentState !== state) return;

        writeHeaderZipDirect({ zip }, `v173 ${reason}`);
        // WallStJobs may finish painting an older validation result after our first
        // write. Re-commit during this same short load window so the visible status
        // catches up with the already-correct ZIP. Manual location edits still abort above.
        commitVerifiedHeaderZipV173(zip);

        if (Date.now() - startedAt >= 1900) return;
        setTimeout(attempt, 250);
    };

    attempt();
}

// v319: Trusted Queens, NY has a deliberate default ZIP. The site's ordinary
// city lookup does not support Queens and can repaint a stale ZIP after Auto.
// Keep this limited to the normal short load window and never override human edits.
let frt7QueensZipTokenV319 = 0;
function frt7ApplyQueensZipV319(city, state, reason = "trusted Queens") {
    if (normalizeLocationText(city) !== normalizeLocationText("Queens") ||
        String(state || "").trim().toUpperCase() !== "NY") return false;
    const cityInput = document.getElementById("txtCityDataEntry");
    const stateInput = document.getElementById("txtStateDataEntry");
    const zipInput = document.getElementById("txtZipDataEntry");
    if (!cityInput || !stateInput || !zipInput ||
        isManualContactLocked("city", cityInput) ||
        isManualContactLocked("state", stateInput) ||
        isManualContactLocked("zip", zipInput)) return false;
    const token = ++frt7QueensZipTokenV319;
    const startedAt = Date.now();
    let lastCommittedZip = "";
    const attempt = () => {
        if (token !== frt7QueensZipTokenV319 || frt7HumanTouchedLocation()) return;
        const c = document.getElementById("txtCityDataEntry");
        const st = document.getElementById("txtStateDataEntry");
        const z = document.getElementById("txtZipDataEntry");
        if (!c || !st || !z ||
            normalizeLocationText(c.value) !== normalizeLocationText("Queens") ||
            String(st.value || "").trim().toUpperCase() !== "NY" ||
            isManualContactLocked("city", c) ||
            isManualContactLocked("state", st) ||
            isManualContactLocked("zip", z)) return;
        if (String(z.value || "").trim() !== "11364") {
            writeHeaderZipDirect({zip:"11364"}, `v319 ${reason}`);
            lastCommittedZip = ""; // Revalidate if the website repainted the old ZIP.
            console.info("Toolbar AUTO ZIP v319: Queens, NY -> 11364 (repaint-safe).");
        }
        // v320: The input-only write does not necessarily rerun WallStJobs'
        // ZIP/state validation. Use the existing verified-ZIP commit sequence
        // exactly once per correction, not on every 250ms retry.
        if (String(z.value || "").trim() === "11364" && lastCommittedZip !== "11364") {
            if (commitVerifiedHeaderZipV173("11364")) {
                lastCommittedZip = "11364";
                console.info("Toolbar AUTO ZIP v320: requested website ZIP revalidation for Queens, NY 11364.");
            }
        }
        if (Date.now() - startedAt < 1900) setTimeout(attempt, 250);
    };
    attempt();
    return true;
}

function runConfirmedZipLookup(loc, options = {}) {
    if (!loc || !loc.city || !/^[A-Z]{2}$/.test(loc.state || "")) return false;

    loc = { ...loc, city: normalizeContactDisplayCase(loc.city) };
    if (frt7ApplyQueensZipV319(loc.city, loc.state, "confirmed ZIP repair")) return true;

    // v158: Never use City/State ZIP lookup when the true header already provides
    // an obvious ZIP immediately after this state.
    if (applyObviousHeaderZipFromResume(loc.state, "confirmed lookup guard")) return true;

    const zipInput = document.getElementById("txtZipDataEntry");
    const lookupInput = document.getElementById("txtZipLookupEntry");
    const cityInput = document.getElementById("txtCityDataEntry");
    const stateInput = document.getElementById("txtStateDataEntry");
    if (!zipInput || !lookupInput) return false;

    // A ZIP lookup can cause the site to repaint location fields, so do not run
    // it after the user has manually corrected ANY part of City/State/ZIP.
    if (isManualContactLocked("city", cityInput) ||
        isManualContactLocked("state", stateInput) ||
        isManualContactLocked("zip", zipInput)) {
        console.info("Toolbar AUTO ZIP: skipped because location was manually edited.");
        return false;
    }

    // v311: confirmed city/state passed by the Auto ZIP caller.
    if (normalizeLocationText(loc.city) === normalizeLocationText("Queens") &&
        String(loc.state).trim().toUpperCase() === "NY" &&
        !String(zipInput.value || "").trim()) {
        zipInput.value = "11364";
        triggerEvents(zipInput);
        console.info("Toolbar AUTO ZIP v311: Queens, NY blank ZIP -> 11364.");
        return true;
    }

    const zipStatus = options.zipStatus || getWebsiteZipStatus();
    const allowMismatchCorrection = Boolean(options.allowMismatchCorrection);

    // Never disturb a ZIP that the website says already matches its state.
    if (zipStatus === "match") return false;

    // A populated ZIP is cleared only for the narrow, confirmed mismatch case
    // approved by fillAutoCityStateFromResume(). Unknown populated ZIPs are left
    // completely alone.
    if (zipStatus !== "blank" && !allowMismatchCorrection) return false;

    if (allowMismatchCorrection) {
        zipInput.value = "";
        triggerEvents(zipInput);
    }

    // v142: Military records with an exact installation ZIP do not need a website
    // lookup at all. Set the known ZIP locally; this is faster and avoids a repaint
    // changing the freshly corrected base location.
    const militaryZip = loc.militaryInstallation && /^\d{5}$/.test(String(loc.zip || ""))
        ? String(loc.zip)
        : "";
    if (militaryZip) {
        zipInput.value = militaryZip;
        triggerEvents(zipInput);
        console.info(`Toolbar AUTO ZIP v142: military installation ZIP set locally -> ${militaryZip}.`);
        return true;
    }

    lookupInput.value = `${normalizeContactDisplayCase(loc.city)}, ${loc.state}`;
    fireZipLookupEnter(lookupInput);
    console.log("Toolbar AUTO ZIP LOOKUP:", lookupInput.value,
        allowMismatchCorrection ? "(confirmed website mismatch)" : "(blank ZIP)");
    return true;
}

function isCurrentCityStateSavedLearnedPair(city, state) {
    if (!learnedCitiesLoaded) return false;
    const cityKey = normalizeLearnedCity(city);
    const stateKey = String(state || "").trim().toUpperCase();
    if (!cityKey || !/^[A-Z]{2}$/.test(stateKey)) return false;

    return isUsCityDatabasePair(city, state) || Object.values(learnedCitiesCache || {}).some(entry =>
        entry &&
        entry.deleted !== true &&
        normalizeLearnedCity(entry.city) === cityKey &&
        String(entry.state || "").trim().toUpperCase() === stateKey
    );
}

// v110 SAVED CITY + RED ZIP ERROR REPAIR:
// If WallStJobs says "Could not find State for that zip" but the City/State
// currently shown are an exact pair from Learned Cities, trust that saved pair,
// clear only the bad ZIP, and submit the normal City/State ZIP lookup.
// v193 EXPLICIT TRUE-HEADER PAIR PROOF:
// Prove that the City/State CURRENTLY in the form is literally written in the
// contact/header portion of txtResumeRaw as "City, ST" or "City, Full State".
// This does not depend on the Census DB being loaded and never scans Experience/Education.
function frt7CurrentPairIsExplicitInTrueHeaderV193(cityValue, stateValue) {
    const city = normalizeContactDisplayCase(String(cityValue || "").trim());
    const state = String(stateValue || "").trim().toUpperCase();
    if (!city || !/^[A-Z]{2}$/.test(state)) return false;

    const raw = String(document.getElementById("txtResumeRaw")?.value || "");
    if (!raw.trim()) return false;

    const rawStart = raw.slice(0, 1800);
    const sectionStop = findTrueResumeSectionStop(rawStart);
    const header = (
        sectionStop >= 0 ? rawStart.slice(0, sectionStop) : rawStart.slice(0, 900)
    ).slice(0, 900);

    const esc = value =>
        String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const fullStateNames = Object.entries(STATE_MAP || {})
        .filter(([, abbr]) => String(abbr || "").trim().toUpperCase() === state)
        .map(([name]) => name);

    const stateTokens = [state, ...fullStateNames]
        .filter(Boolean)
        .sort((a, b) => b.length - a.length)
        .map(value => esc(value).replace(/\s+/g, "\\s+"))
        .join("|");

    if (!stateTokens) return false;

    const cityRe = esc(city).replace(/\s+/g, "\\s+");
    const pairRe = new RegExp(
        "(^|[^A-Za-zÀ-ÖØ-öø-ÿ])" + cityRe +
        "\\s*,\\s*(?:" + stateTokens + ")\\b",
        "i"
    );

    return pairRe.test(header);
}

function runSavedCityZipLookupOnUnresolvedZip() {
    const cityInput = document.getElementById("txtCityDataEntry");
    const stateInput = document.getElementById("txtStateDataEntry");
    const zipInput = document.getElementById("txtZipDataEntry");
    const lookupInput = document.getElementById("txtZipLookupEntry");

    if (!cityInput || !stateInput || !zipInput || !lookupInput) return false;
    if (getWebsiteZipStatus() !== "unresolvedzip") return false;
    if (isManualContactLocked("zip", zipInput)) return false;

    const city = String(cityInput.value || "").trim();
    const state = String(stateInput.value || "").trim().toUpperCase();

    const pairIsTrustedForUnresolvedZip =
        isCurrentCityStateSavedLearnedPair(city, state) ||
        frt7CurrentPairIsExplicitInTrueHeaderV193(city, state);

    if (!pairIsTrustedForUnresolvedZip) return false;

    zipInput.value = "";
    triggerEvents(zipInput);
    lookupInput.value = `${city}, ${state}`;
    fireZipLookupEnter(lookupInput);
    console.info(`Toolbar AUTO ZIP v110: saved City/State + red ZIP error -> looked up ${city}, ${state}.`);
    return true;
}

function runAutoZipLookupFromExistingCityStateOnMismatch() {
    const cityInput = document.getElementById("txtCityDataEntry");
    const stateInput = document.getElementById("txtStateDataEntry");
    const zipInput = document.getElementById("txtZipDataEntry");
    const lookupInput = document.getElementById("txtZipLookupEntry");

    if (!cityInput || !stateInput || !zipInput || !lookupInput) return false;
    if (frt7CareerBuilderValidLocationMustStay("mismatch helper")) return false;
    if (getWebsiteZipStatus() !== "mismatch") return false;

    const city = String(cityInput.value || "").trim();
    const state = String(stateInput.value || "").trim().toUpperCase();
    if (!city || !/^[A-Z]{2}$/.test(state)) return false;

    // v294: Career Builder / Resume Library already supplied the authoritative
    // City+State. On a bad ZIP, repair only ZIP from that exact pair.
    if (frt7SourceCityStateZipRepair("mismatch helper")) return true;

    // A manually edited ZIP is always authoritative.
    if (isManualContactLocked("zip", zipInput)) {
        console.info("Toolbar AUTO ZIP v116: mismatch repair skipped because ZIP was manually edited.");
        return false;
    }

    // v116 MISMATCH -> TRUSTED HEADER, OTHERWISE AREA:
    // A populated City/State is NOT enough evidence when WallStJobs itself says
    // the ZIP belongs to another state. Resume education/employment text can leak
    // into City (for example "College Station"). In a mismatch:
    //   1) A saved/trusted City+State in the true resume header wins.
    //   2) A human-edited City/State is preserved and gets a normal ZIP lookup.
    //   3) Otherwise, if a usable phone exists, clear the bad ZIP and route through
    //      the SAME guarded Area recovery used everywhere else.
    //   4) If Area cannot run because there is no usable phone, retain the old
    //      conservative City/State ZIP-lookup behavior as a fallback.
    const trustedHeaderLoc = findTrustedLearnedCityInHeader(getResumeText());
    const trustedHeaderState = String(trustedHeaderLoc?.state || "").trim().toUpperCase();
    const hasTrustedHeader = Boolean(
        trustedHeaderLoc?.city &&
        /^[A-Z]{2}$/.test(trustedHeaderState)
    );

    const cityLocked = isManualContactLocked("city", cityInput);
    const stateLocked = isManualContactLocked("state", stateInput);

    if (hasTrustedHeader && !cityLocked && !stateLocked) {
        const trustedCity = normalizeContactDisplayCase(trustedHeaderLoc.city);

        if (normalizeContactDisplayCase(city) !== trustedCity) {
            cityInput.value = trustedCity;
            triggerEvents(cityInput);
        }
        if (state !== trustedHeaderState) {
            stateInput.value = trustedHeaderState;
            triggerEvents(stateInput);
        }

        zipInput.value = "";
        triggerEvents(zipInput);
        lookupInput.value = `${trustedCity}, ${trustedHeaderState}`;
        fireZipLookupEnter(lookupInput);
        console.info(`Toolbar AUTO ZIP v116: mismatch -> trusted HEADER location wins -> ${trustedCity}, ${trustedHeaderState}.`);
        return true;
    }

    // v182: A valid current page City+State that is corroborated by the FIRST/current
    // Experience block is stronger evidence than a phone area code. Keep the pair,
    // clear the bad ZIP, and run WallStJobs' normal ZIP lookup for that pair.
    const experienceCorroboratesCurrentPair =
        !hasTrustedHeader &&
        currentLocationIsCorroboratedByCurrentExperience(getResumeText(), city, state);

    if (experienceCorroboratesCurrentPair && !cityLocked && !stateLocked) {
        zipInput.value = "";
        triggerEvents(zipInput);
        lookupInput.value = `${normalizeContactDisplayCase(city)}, ${state}`;
        fireZipLookupEnter(lookupInput);
        console.info(
            `Toolbar AUTO ZIP v182: mismatch -> current Experience corroborates ` +
            `"${city}, ${state}"; kept location and repaired ZIP instead of using Area.`
        );
        return true;
    }

    // Never let Area overwrite a location the user manually edited.
    if (!cityLocked && !stateLocked && !hasTrustedHeader && !experienceCorroboratesCurrentPair) {
        let areaDigits = String(getAreaSourcePhone() || "").replace(/\D/g, "");
        if (areaDigits.length === 11 && areaDigits.startsWith("1")) areaDigits = areaDigits.slice(1);

        if (areaDigits.length >= 10) {
            zipInput.value = "";
            triggerEvents(zipInput);
            console.info(`Toolbar AUTO ZIP v116: red State/ZIP mismatch with no trusted header location; switching to Area instead of trusting "${city}, ${state}".`);
            queueAreaRecoveryAfterZipFailure(`red State/ZIP mismatch; untrusted current location: ${city}, ${state}`);
            return true;
        }
    }

    // Manual City/State edits, or cases with no usable phone, retain the prior
    // behavior: use the currently visible safe City/State for a fresh ZIP lookup.
    if (!isSafeAutoCity({ city, state })) return false;

    zipInput.value = "";
    triggerEvents(zipInput);
    lookupInput.value = `${city}, ${state}`;
    fireZipLookupEnter(lookupInput);
    console.log("Toolbar AUTO ZIP v116: mismatch fallback used existing City/State:", lookupInput.value);
    return true;
}


// v30 RELIABLE AUTO ZIP LOOKUP:
// WallStJobs can paint the City/State/ZIP fields first and add its red
// "State and zip do not match" validation message a moment later. A one-shot
// Auto pass can therefore see status "unknown" and miss the mismatch.
// This AUTO-only retry loop waits for the page to settle and keeps checking.
// It never invokes or changes the manual City/ST button.
let frt7AutoZipRetryTimer = null;
let frt7AutoZipRetryKey = "";
let frt7AutoZipRetryStartedAt = 0;
let frt7AutoZipLastLookupSignature = "";
let frt7AutoZipLastLookupAt = 0;

function queueReliableAutoZipLookup(reason = "resume load") {
    if (frt7AutoZipRetryTimer) {
        clearTimeout(frt7AutoZipRetryTimer);
        frt7AutoZipRetryTimer = null;
    }

    const key = getApplicantLifecycleKey();
    frt7AutoZipRetryKey = key;
    frt7AutoZipRetryStartedAt = Date.now();
    frt7AutoZipLastLookupSignature = "";
    frt7AutoZipLastLookupAt = 0;

    const attempt = async () => {
        frt7AutoZipRetryTimer = null;

        const currentKey = getApplicantLifecycleKey();
        if (!currentKey || (frt7AutoZipRetryKey && currentKey !== frt7AutoZipRetryKey)) return;

        const stored = await browser.storage.local.get([AUTO_KEY, AUTO_FIELDS_KEY]);
        const masterEnabled = Boolean(stored[AUTO_KEY]);
        const fields = { ...DEFAULT_AUTO_FIELDS, ...(stored[AUTO_FIELDS_KEY] || {}) };

        if (!masterEnabled || !fields.zipLookup) return;

        const cityInput = document.getElementById("txtCityDataEntry");
        const stateInput = document.getElementById("txtStateDataEntry");
        const zipInput = document.getElementById("txtZipDataEntry");

        if (!cityInput || !stateInput || !zipInput) {
            if (Date.now() - frt7AutoZipRetryStartedAt < 2000) {
                frt7AutoZipRetryTimer = setTimeout(attempt, 400);
            }
            return;
        }

        // v280: do not let the delayed ZIP watcher disturb an error-free
        // Career Builder location that was already complete when loaded.
        if (frt7CareerBuilderValidLocationMustStay("reliable ZIP watcher")) return;

        // v294: For Career Builder / Resume Library, an already-filled City+State
        // outranks resume-header and Area logic when ZIP is bad/missing.
        if (frt7SourceCityStateZipRepair("reliable ZIP watcher")) return;

        // v158: An explicit 5-digit ZIP immediately after the header state wins
        // before every mismatch/blank ZIP-lookup path. If ZIP was manually edited,
        // the helper suppresses lookup but does not overwrite the manual value.
        const headerLocForZip = extractCityStateFromHeader(getResumeText());
        const expectedHeaderState = String(
            headerLocForZip?.state || stateInput.value || ""
        ).trim().toUpperCase();
        if (applyObviousHeaderZipFromResume(expectedHeaderState, "reliable ZIP guard")) return;

        if (isManualContactLocked("zip", zipInput)) return;

        // v193 IMMEDIATE WRONG-STATE ZIP REPAIR:
        // If the current City/State is explicitly written in the TRUE contact header
        // and the existing conservative ZIP-prefix table proves the populated ZIP
        // belongs to another state, do not wait for WallStJobs' red error text.
        // This runs inside the existing watcher pass: no new timer/polling/window.
        const v193City = normalizeContactDisplayCase(String(cityInput.value || "").trim());
        const v193State = String(stateInput.value || "").trim().toUpperCase();
        const v193Zip = String(zipInput.value || "").trim();
        const v193ZipState = /^\d{5}$/.test(v193Zip)
            ? frt7StateFromZipV171(v193Zip)
            : "";

        if (
            v193ZipState &&
            /^[A-Z]{2}$/.test(v193State) &&
            v193ZipState !== v193State &&
            frt7CurrentPairIsExplicitInTrueHeaderV193(v193City, v193State)
        ) {
            zipInput.value = "";
            triggerEvents(zipInput);

            if (runConfirmedZipLookup(
                { city: v193City, state: v193State },
                { zipStatus: "blank" }
            )) {
                frt7AutoZipLastLookupSignature =
                    `${normalizeLocationText(v193City)}|${v193State}`;
                frt7AutoZipLastLookupAt = Date.now();
                console.info(
                    `Toolbar AUTO ZIP v193: explicit header ${v193City}, ${v193State} ` +
                    `rejected wrong-state ZIP ${v193Zip} (${v193ZipState}); ZIP lookup requested.`
                );
                return;
            }
        }

        if (/^0{5}$/.test(String(zipInput.value || "").trim())) {
            zipInput.value = "";
            triggerEvents(zipInput);
            console.info("Toolbar AUTO ZIP v322: 00000 treated as missing ZIP; requesting normal City/State lookup.");
        }

        const status = getWebsiteZipStatus();

        // v110: A saved City+State with WallStJobs' red "Could not find State
        // for that zip" error should use the normal ZIP lookup automatically.
        if (status === "unresolvedzip") {
            const unresolvedCity = normalizeContactDisplayCase(String(cityInput.value || "").trim());
            const unresolvedState = String(stateInput.value || "").trim().toUpperCase();

            // v182: "Could not find State for that zip" can mean the ZIP itself is junk.
            // If current Experience corroborates the visible City+State, keep that pair
            // and look up a fresh ZIP instead of falling through to Area.
            if (
                currentLocationIsCorroboratedByCurrentExperience(
                    getResumeText(),
                    unresolvedCity,
                    unresolvedState
                )
            ) {
                const lookupInput = document.getElementById("txtZipLookupEntry");
                zipInput.value = "";
                triggerEvents(zipInput);
                if (lookupInput) lookupInput.value = `${unresolvedCity}, ${unresolvedState}`;
                runConfirmedZipLookup(
                    { city: unresolvedCity, state: unresolvedState },
                    { zipStatus: "blank" }
                );
                console.info(
                    `Toolbar AUTO ZIP v182: unresolved ZIP -> kept Experience-corroborated ` +
                    `${unresolvedCity}, ${unresolvedState} and requested a fresh ZIP.`
                );
                return;
            }

            if (runSavedCityZipLookupOnUnresolvedZip()) {
                console.info(`Toolbar AUTO ZIP v110: saved-city red-error repair ran (${reason}).`);
                return;
            }
        }

        // v241 FAST ZIP-MISMATCH -> AREA FALLBACK:
        // If WallStJobs has settled on an explicit State/ZIP mismatch and the earlier
        // trusted-header Auto pass did NOT establish a learned/U.S.-DB header location,
        // use the exact same phone/Area writer as the manual Area button.
        //
        // PERFORMANCE: this deliberately reuses the already-computed authoritative
        // header-location metadata. It does NOT rescan Learned Cities or the U.S. City
        // Database, and it adds no new timer/polling loop. It runs only inside this
        // existing <=2s reliable ZIP watcher after a real mismatch is known.
        if (status === "mismatch") {
            let trustedHeaderAlreadyResolved = null;
            try { trustedHeaderAlreadyResolved = frt7GetAuthoritativeHeaderLocation(); } catch (_) {}

            // v276 AUTO ZIP -> AREA HEADER GUARD:
            // v241 had a side door around the normal Area protections: on a transient
            // State/ZIP mismatch it called fillLocationFromPhone() DIRECTLY and only
            // checked whether an authoritative header lock had already been created.
            // If Auto had not created that lock yet, a correct resume-header location
            // (for example Port Saint Lucie, FL) could be replaced by the phone area
            // code (754 -> Fort Lauderdale). Re-resolve the actual header here before
            // Area is even considered, and establish the same authoritative lock used
            // by the rest of the location pipeline.
            if (!trustedHeaderAlreadyResolved?.city) {
                try {
                    const resolvedNow = getAuthoritativeHeaderLocationForAuto(getResumeText());
                    const resolvedState = String(resolvedNow?.state || "").trim().toUpperCase();
                    if (resolvedNow?.city && /^[A-Z]{2}$/.test(resolvedState)) {
                        trustedHeaderAlreadyResolved = {
                            ...resolvedNow,
                            city: normalizeContactDisplayCase(resolvedNow.city),
                            state: resolvedState
                        };
                        try {
                            frt7SetAuthoritativeHeaderLocation(
                                trustedHeaderAlreadyResolved,
                                "v276 ZIP-mismatch Area hard stop"
                            );
                        } catch (_) {}
                        console.info(
                            `Toolbar AUTO ZIP v276: mismatch Area BLOCKED by freshly resolved HEADER -> ` +
                            `${trustedHeaderAlreadyResolved.city}, ${trustedHeaderAlreadyResolved.state}.`
                        );
                    }
                } catch (_) {}
            }

            const trustedState = String(trustedHeaderAlreadyResolved?.state || "").trim().toUpperCase();
            const hasTrustedHeaderPair = Boolean(
                trustedHeaderAlreadyResolved?.city && /^[A-Z]{2}$/.test(trustedState)
            );

            const cityLocked = isManualContactLocked("city", cityInput);
            const stateLocked = isManualContactLocked("state", stateInput);

            if (!hasTrustedHeaderPair && !cityLocked && !stateLocked) {
                const phoneDigits = String(getAreaSourcePhone() || "")
                    .replace(/\D/g, "")
                    .replace(/^1(?=\d{10}$)/, "");

                if (phoneDigits.length >= 10) {
                    console.info(
                        `Toolbar AUTO ZIP v241: State/ZIP mismatch + no trusted header City/ST; ` +
                        `using Area fallback (${reason}).`
                    );
                    // v303 ZIP-MISMATCH AREA STICK-FIRST:
                    // The v302 diagnostic proved the correct Area mapping was found,
                    // but WallStJobs repainted the old City/State immediately after our
                    // first write. Do NOT touch ZIP or start ZIP lookup until the mapped
                    // City/State have survived a delayed verification pass.
                    const areaV303 = phoneDigits.slice(0, 3);
                    let customV303 = {};
                    try {
                        const rawV303 = GM_getValue(CUSTOM_AREA_CODES_KEY, "{}");
                        const parsedV303 = typeof rawV303 === "string"
                            ? JSON.parse(rawV303 || "{}")
                            : rawV303;
                        if (parsedV303 && typeof parsedV303 === "object") customV303 = parsedV303;
                    } catch (_) {}
                    const infoV303 = customV303[areaV303] || __FRT_AREA_CODE_LOOKUP[areaV303];

                    if (infoV303?.city && infoV303?.state) {
                        const mappedCityV303 = normalizeContactDisplayCase(infoV303.city);
                        const mappedStateV303 = String(infoV303.state).trim().toUpperCase();
                        const lookupTextV303 = `${mappedCityV303}, ${mappedStateV303}`;

                        const writeMappedPairV303 = () => {
                            const c = document.getElementById("txtCityDataEntry");
                            const st = document.getElementById("txtStateDataEntry");
                            if (!c || !st) return false;

                            if (normalizeContactDisplayCase(String(c.value || "").trim()) !== mappedCityV303) {
                                c.value = mappedCityV303;
                                try { triggerEvents(c); } catch (_) {}
                            }
                            if (String(st.value || "").trim().toUpperCase() !== mappedStateV303) {
                                st.value = mappedStateV303;
                                try { triggerEvents(st); } catch (_) {}
                            }
                            return true;
                        };

                        // First write now, then re-assert after WallStJobs' own repaint.
                        writeMappedPairV303();
                        console.info(
                            `Toolbar AUTO ZIP v303: Area ${areaV303} -> ${mappedCityV303}, ` +
                            `${mappedStateV303}; waiting for City/State to stick BEFORE touching ZIP.`
                        );

                        const settleDelaysV303 = [80, 180, 350, 600, 950, 1400];
                        settleDelaysV303.forEach((delayV303, idxV303) => {
                            setTimeout(() => {
                                writeMappedPairV303();

                                // Only the later passes may proceed to ZIP, and only if
                                // City/State are visibly the Area-derived pair right now.
                                if (idxV303 < 2) return;

                                const c = document.getElementById("txtCityDataEntry");
                                const st = document.getElementById("txtStateDataEntry");
                                const z = document.getElementById("txtZipDataEntry");
                                const l = document.getElementById("txtZipLookupEntry");
                                if (!c || !st || !z || !l) return;

                                const cityNowV303 = normalizeContactDisplayCase(String(c.value || "").trim());
                                const stateNowV303 = String(st.value || "").trim().toUpperCase();
                                if (cityNowV303 !== mappedCityV303 || stateNowV303 !== mappedStateV303) {
                                    console.info(
                                        `Toolbar AUTO ZIP v303: WallStJobs repaint still fighting Area ` +
                                        `(${cityNowV303}, ${stateNowV303}); reasserted and waiting.`
                                    );
                                    return;
                                }

                                const zipNowV303 = String(z.value || "").trim();
                                if (zipNowV303) {
                                    const zipStateV303 = /^\d{5}$/.test(zipNowV303)
                                        ? frt7StateFromZipV171(zipNowV303)
                                        : "";
                                    if (zipStateV303 === mappedStateV303) return;

                                    // IMPORTANT: clear the stale/wrong ZIP only AFTER
                                    // Lexington/KY (or the mapped pair) has stuck.
                                    z.value = "";
                                    try { triggerEvents(z); } catch (_) {}
                                    console.info(
                                        `Toolbar AUTO ZIP v303: City/State confirmed ${lookupTextV303}; ` +
                                        `cleared stale ZIP ${zipNowV303}.`
                                    );
                                }

                                // Re-check once more after clearing ZIP because that event
                                // can itself make WallStJobs repaint dependent fields.
                                writeMappedPairV303();

                                l.value = lookupTextV303;
                                try { triggerEvents(l); } catch (_) {}
                                for (const type of ["keydown","keypress","keyup"]) {
                                    l.dispatchEvent(new KeyboardEvent(type, {
                                        bubbles:true, cancelable:true, key:"Enter", code:"Enter",
                                        which:13, keyCode:13
                                    }));
                                }
                                console.info(
                                    `Toolbar AUTO ZIP v303: confirmed Area pair stuck; requested ZIP for ${lookupTextV303}.`
                                );
                            }, delayV303);
                        });
                        return;
                    }

                    console.info(
                        `Toolbar AUTO ZIP v303: no Area mapping for ${areaV302}; ` +
                        `falling back to existing mismatch repair.`
                    );
                }
            }

            // Preserve the existing mismatch behavior when Area cannot/should not run
            // (trusted header pair, manual edit lock, or no usable phone).
            if (runAutoZipLookupFromExistingCityStateOnMismatch()) {
                console.info(`Toolbar AUTO ZIP: reliable mismatch repair ran (${reason}).`);
                return;
            }
        }

        // v81: For a blank ZIP, FIRST inspect the result of any lookup already sent.
        // Do not keep re-sending the same City/State lookup on every retry: doing so
        // previously returned before this failure check and stranded junk cities such
        // as "Graduated" forever.
        if (status === "blank") {
            // v83 PRIORITY RULE: a SAVED/TRUSTED City+State in the resume header
            // always outranks the current page fields and Area-code fallback.
            // Example: if WallStJobs incorrectly parsed City="Graduated", but the
            // resume header contains a city we have already saved in Trusted Cities,
            // replace City/State with that trusted header pair and look up ITS ZIP.
            // Area is allowed only when no trusted header pair exists.
            const trustedHeaderLoc =
                getAuthoritativeHeaderLocationForAuto(getResumeText());
            const trustedHeaderState = String(trustedHeaderLoc?.state || "").trim().toUpperCase();
            if (
                trustedHeaderLoc?.city &&
                /^[A-Z]{2}$/.test(trustedHeaderState) &&
                !isManualContactLocked("city", cityInput) &&
                !isManualContactLocked("state", stateInput)
            ) {
                const trustedCity = normalizeContactDisplayCase(trustedHeaderLoc.city);
                const trustedSignature = `${normalizeLocationText(trustedCity)}|${trustedHeaderState}`;

                if (normalizeContactDisplayCase(String(cityInput.value || "").trim()) !== trustedCity) {
                    cityInput.value = trustedCity;
                    triggerEvents(cityInput);
                }
                if (String(stateInput.value || "").trim().toUpperCase() !== trustedHeaderState) {
                    stateInput.value = trustedHeaderState;
                    triggerEvents(stateInput);
                }

                // Any ZIP currently on the page belongs to the old/bad location.
                if (String(zipInput.value || "").trim()) {
                    zipInput.value = "";
                    triggerEvents(zipInput);
                }

                if (trustedSignature !== frt7AutoZipLastLookupSignature) {
                    if (runConfirmedZipLookup(
                        { city: trustedCity, state: trustedHeaderState },
                        { zipStatus: "blank" }
                    )) {
                        frt7AutoZipLastLookupSignature = trustedSignature;
                        frt7AutoZipLastLookupAt = Date.now();
                        console.info(`Toolbar AUTO ZIP v83: trusted HEADER location wins -> ${trustedCity}, ${trustedHeaderState}; waiting for ZIP result.`);
                    }
                }

                // Keep watching for the ZIP result, but NEVER fall through to Area
                // while this trusted header location exists.
                if (Date.now() - frt7AutoZipRetryStartedAt < 2000) {
                    frt7AutoZipRetryTimer = setTimeout(attempt, 650);
                }
                return;
            }

            // v108: Custom mappings no longer depend on a synthetic Area-button click.
            // Apply the saved mapping directly once WallStJobs has a definitive no-ZIP result.
            if (await applyDirectCustomAreaRecovery(
                `reliable blank-ZIP watcher: ${reason}`,
                false
            )) {
                return;
            }

            const city = String(cityInput.value || "").trim();
            const state = String(stateInput.value || "").trim().toUpperCase();
            const lookupInput = document.getElementById("txtZipLookupEntry");
            const lookupValue = String(lookupInput?.value || "").trim();
            const pageText = String(document.body?.innerText || "").replace(/\s+/g, " ");
            const explicitNoZip = pageShowsDefinitiveNoZipResult();
            const lookupAge = frt7AutoZipLastLookupAt > 0
                ? (Date.now() - frt7AutoZipLastLookupAt)
                : 0;
            const lookupHasStalled = Boolean(frt7AutoZipLastLookupSignature) &&
                frt7AutoZipLastLookupAt > 0 &&
                lookupAge >= 1800;

            // v88 IMPORTANT: WallStJobs paints "No zip code provided" immediately
            // for an initially blank ZIP. That text is NOT proof that our City/State
            // lookup failed. In v81-v87 we checked it before the first lookup was sent,
            // so a valid location such as San Antonio, TX could be diverted to Area
            // and would only work after a full refresh. Only treat that message as a
            // failed lookup AFTER we have actually submitted City/State and given the
            // site time to answer.
            const explicitNoZipAfterLookup = explicitNoZip &&
                Boolean(frt7AutoZipLastLookupSignature) &&
                frt7AutoZipLastLookupAt > 0 &&
                lookupAge >= 1400;

            // A real failed result wins after the first lookup has had a chance to run.
            if (explicitNoZipAfterLookup || lookupHasStalled) {
                console.info(`Toolbar AUTO ZIP v88: ZIP lookup failed/stalled; switching to Area (${reason}).`);
                queueAreaRecoveryAfterZipFailure(explicitNoZipAfterLookup ? "website still says no ZIP after lookup" : "ZIP lookup stalled");
                return;
            }

            const lookupSignature = `${normalizeLocationText(city)}|${state}`;
            const canLookup = city && /^[A-Z]{2}$/.test(state) && isSafeAutoCity({ city, state });
            // v406: Don't submit an address masquerading as a city to ZIP lookup.
            // The normal recovery path retains all manual/source/header/half-address guards.
            if (!canLookup && city && !String(zipInput.value || "").trim()) {
                console.info(`Toolbar AUTO ZIP v406: invalid city "${city}"; skipping ZIP lookup and requesting guarded Area recovery.`);
                // v407: The 250ms queued recovery was continually cancelled by
                // the 100ms Auto loop. Run the verified street-address recovery
                // once per applicant/city, immediately, rather than rescheduling.
                const recoveryKey = `${getApplicantLifecycleKey()}|${normalizeLocationText(city)}|${state}`;
                if (window.__frt7_v407_street_recovery_key !== recoveryKey) {
                    window.__frt7_v407_street_recovery_key = recoveryKey;
                    const areaPhone = String(getAreaSourcePhone() || '').replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
                    if (isUsableTenDigitPhone(areaPhone) && /\b(?:DRIVE|DR|STREET|ST|ROAD|RD|AVENUE|AVE|LANE|LN|BOULEVARD|BLVD|COURT|CT|WAY|PLACE|PL)\b/i.test(city)) {
                        if (!isManualContactLocked('city', cityInput) && !isManualContactLocked('state', stateInput) &&
                            !isManualContactLocked('zip', zipInput) && !frt7PreAutoLocationBlocksPhoneArea('v407 street recovery') &&
                            !getAuthoritativeHeaderLocationForAuto(getResumeText())?.city) {
                            const ok = fillLocationFromPhone(true);
                            console.info(`Toolbar AREA v407: street-address recovery executed; success=${Boolean(ok)}; location=${cityInput.value}, ${stateInput.value}.`);
                        } else console.info('Toolbar AREA v407: street recovery blocked by existing location/manual/header protection.');
                    } else {
                        queueAreaRecoveryAfterZipFailure(`invalid city: ${city}`);
                    }
                }
                return;
            }

            // v93 UNSAFE-CITY DEADLOCK FIX:
            // A junk/non-city value can be nonblank ("College Board", "Graduated",
            // company/title text, etc.) while also being too unsafe to submit to ZIP.
            // Older logic then did neither ZIP lookup nor Area because Area's generic
            // fallback expected City to be blank. If ZIP is blank, no trusted header
            // location won above, and the phone is usable, go straight to the REAL
            // Area button. queueAreaRecoveryAfterZipFailure() still re-checks manual
            // locks and trusted-header priority before it clicks anything.
            if (!canLookup && city && !String(zipInput.value || "").trim()) {
                let areaDigits = String(getAreaSourcePhone() || "").replace(/\D/g, "");
                if (areaDigits.length === 11 && areaDigits.startsWith("1")) areaDigits = areaDigits.slice(1);
                if (areaDigits.length >= 10) {
                    console.info(`Toolbar AUTO ZIP v93: unsafe City "${city}" cannot be ZIP-looked-up; switching directly to Area.`);
                    queueAreaRecoveryAfterZipFailure(`unsafe non-city value: ${city}`);
                    return;
                }
            }

            // Send a given City/State lookup only ONCE while waiting for its result.
            if (canLookup && lookupSignature !== frt7AutoZipLastLookupSignature) {
                if (runConfirmedZipLookup({ city, state }, { zipStatus: "blank" })) {
                    frt7AutoZipLastLookupSignature = lookupSignature;
                    frt7AutoZipLastLookupAt = Date.now();
                    console.info(`Toolbar AUTO ZIP v81: blank ZIP lookup sent once for ${city}, ${state}; waiting for result.`);
                    if (Date.now() - frt7AutoZipRetryStartedAt < 2000) {
                        frt7AutoZipRetryTimer = setTimeout(attempt, 650);
                    }
                    return;
                }
            }

            // If no lookup has been sent yet and the current location is unusable,
            // give the resume-confirmed pipeline one chance. It may replace City/State
            // with a genuinely confirmed location.
            if (!frt7AutoZipLastLookupSignature) {
                fillAutoCityStateFromResume({
                    ...fields,
                    city: false,
                    state: false,
                    zipLookup: true
                });
                if (String(zipInput.value || "").trim()) return;
            }

            // If WallStJobs already shows its no-ZIP message before we managed to
            // submit anything useful, Area is still the correct fallback.
            const pageStillSaysNoZip = pageShowsDefinitiveNoZipResult();
            if (
                pageStillSaysNoZip &&
                Boolean(frt7AutoZipLastLookupSignature) &&
                frt7AutoZipLastLookupAt > 0 &&
                (Date.now() - frt7AutoZipLastLookupAt >= 1400)
            ) {
                queueAreaRecoveryAfterZipFailure("website still says no ZIP after lookup");
                return;
            }
        }

        // "match" means no repair is needed. "unknown" commonly means WallStJobs
        // has not finished painting the validation text yet, so retry.
        if (status === "match") return;

        if (Date.now() - frt7AutoZipRetryStartedAt < 2000) {
            frt7AutoZipRetryTimer = setTimeout(attempt, 500);
        }
    };

    // Give the new applicant fields a short moment to render, then start checking.
    frt7AutoZipRetryTimer = setTimeout(attempt, 350);
}


// v257 HALF-ADDRESS -> NO AUTO AREA HARD STOP:
// If the TRUE resume header contains a numbered street address but the normal
// trusted/learned City+State resolver cannot establish a location, phone Area is
// too weak to use automatically. Expose one shared final guard so EVERY Auto path
// that reaches fillLocationFromPhone() is stopped, including deep ZIP recovery.
// A real human click on Area is still allowed as an explicit override.
window.__frt7_should_block_auto_area_for_half_address = function () {
    try {
        const resumeText = String(getResumeText() || "");
        if (!resumeText.trim()) return false;

        // If any existing trusted/learned header City+State resolver succeeds,
        // this is not a half-address-only case and existing location logic wins.
        const trusted = getAuthoritativeHeaderLocationForAuto(resumeText);
        const trustedState = String(trusted?.state || "").trim().toUpperCase();
        if (trusted?.city && /^[A-Z]{2}$/.test(trustedState)) return false;

        // Contact information is expected at the top. Restricting this to the
        // header avoids treating numbered street addresses in work history as the
        // applicant's home address.
        const header = resumeText
            .slice(0, 1400)
            .replace(/&(?:nbsp|#x9|#9);/gi, " ")
            .replace(/\s+/g, " ")
            .trim();

        // Examples: "652 Joy Dianne DR", "123 Main Street", "44 W Oak Ave".
        // Require a house number + street words + a real street suffix so dates,
        // phone numbers, ZIPs, and ordinary numbered resume text do not qualify.
        const streetAddress = /(?:^|[^A-Za-z0-9])\d{1,6}\s+(?:[A-Za-z0-9.'’#-]+\s+){1,6}(?:ST(?:REET)?|AVE(?:NUE)?|RD|ROAD|DR(?:IVE)?|LN|LANE|BLVD|BOULEVARD|CT|COURT|CIR(?:CLE)?|WAY|PL(?:ACE)?|PKWY|PARKWAY|HWY|HIGHWAY|TER(?:RACE)?|TRL|TRAIL)\b/i;
        return streetAddress.test(header);
    } catch (_) {
        return false;
    }
};

// v78 ZIP-FAIL -> AREA RECOVERY:
// If WallStJobs accepts a City/State ZIP lookup but still returns no ZIP, the
// parsed City may be junk (for example "Graduated"). In that situation, fall
// back to the existing Area button. Area itself is retried for a short window
// because the visible Phone field can arrive after the rest of the form.
let frt7AreaRecoveryTimer = null;
let frt7AreaRecoveryKey = "";
let frt7AreaRecoveryStartedAt = 0;

function queueAreaRecoveryAfterZipFailure(reason = "ZIP lookup returned no ZIP") {
    if (frt7AreaRecoveryTimer) {
        clearTimeout(frt7AreaRecoveryTimer);
        frt7AreaRecoveryTimer = null;
    }

    const startKey = getApplicantLifecycleKey();
    frt7AreaRecoveryKey = startKey;
    frt7AreaRecoveryStartedAt = Date.now();

    const attempt = async () => {
        frt7AreaRecoveryTimer = null;

        const currentKey = getApplicantLifecycleKey();
        if (!currentKey || (frt7AreaRecoveryKey && currentKey !== frt7AreaRecoveryKey)) return;

        const stored = await browser.storage.local.get([AUTO_KEY, AUTO_FIELDS_KEY]);
        const fields = { ...DEFAULT_AUTO_FIELDS, ...(stored[AUTO_FIELDS_KEY] || {}) };
        if (!stored[AUTO_KEY] || !fields.city) return;

        const cityInput = document.getElementById("txtCityDataEntry");
        const stateInput = document.getElementById("txtStateDataEntry");
        const zipInput = document.getElementById("txtZipDataEntry");
        const lookupInput = document.getElementById("txtZipLookupEntry");
        const areaBtn = document.getElementById("frt7-location-btn");

        if (!cityInput || !stateInput || !zipInput || !areaBtn) return;

        // v280: a delayed recovery from another branch must never Area-replace
        // a complete, error-free Career Builder/Resume Library location.
        if (frt7CareerBuilderValidLocationMustStay("Area recovery")) return;

        // v294: Nor may Area replace an already-filled Career Builder/Resume Library
        // City+State just because ZIP validation failed. Repair ZIP from that pair.
        if (frt7SourceCityStateZipRepair("Area recovery")) return;

        if (isManualContactLocked("city", cityInput) ||
            isManualContactLocked("state", stateInput) ||
            isManualContactLocked("zip", zipInput)) {
            console.info("Toolbar AREA v82: recovery stopped because location was manually edited.");
            return;
        }

        // v197: Even if an earlier ZIP-lookup branch temporarily cleared the ZIP,
        // never let deep recovery throw away the valid location WallStJobs originally
        // loaded for this applicant in favor of the phone area's representative city.
        if (frt7PreAutoLocationBlocksPhoneArea(`ZIP-failure recovery (${reason})`)) {
            const snap = frt7GetValidPreAutoLocationSnapshot();
            if (snap) {
                cityInput.value = snap.city;
                triggerEvents(cityInput);
                stateInput.value = snap.state;
                triggerEvents(stateInput);
                if (String(zipInput.value || "").trim() !== snap.zip) {
                    zipInput.value = snap.zip;
                    triggerEvents(zipInput);
                }
            }
            return;
        }

        // Once a ZIP has appeared, recovery is complete.
        if (String(zipInput.value || "").trim()) return;

        // v154 ABSOLUTE HEADER-BEFORE-AREA GUARD:
        // This is the DEEP ZIP-failure recovery path that was still able to turn
        // Elon, NC into 919 -> Raleigh after a temporary ZIP clear. Before Area can
        // run, consult the already-resolved authoritative lock AND every header source.
        const resumeTextForAreaRecovery = getResumeText();
        const trustedHeaderLoc =
            getAuthoritativeHeaderLocationForAuto(resumeTextForAreaRecovery);
        const trustedHeaderState = String(trustedHeaderLoc?.state || "").trim().toUpperCase();
        if (trustedHeaderLoc?.city && /^[A-Z]{2}$/.test(trustedHeaderState)) {
            const trustedCity = normalizeContactDisplayCase(trustedHeaderLoc.city);
            if (normalizeContactDisplayCase(String(cityInput.value || "").trim()) !== trustedCity) {
                cityInput.value = trustedCity;
                triggerEvents(cityInput);
            }
            if (String(stateInput.value || "").trim().toUpperCase() !== trustedHeaderState) {
                stateInput.value = trustedHeaderState;
                triggerEvents(stateInput);
            }
            zipInput.value = "";
            triggerEvents(zipInput);
            if (lookupInput) lookupInput.value = `${trustedCity}, ${trustedHeaderState}`;
            runConfirmedZipLookup({ city: trustedCity, state: trustedHeaderState }, { zipStatus: "blank" });
            console.info(`Toolbar AREA v154: cancelled ZIP-failure Area; HEADER location wins -> ${trustedCity}, ${trustedHeaderState}.`);
            return;
        }

        // v182 DEEP RECOVERY GUARD:
        // A failed ZIP lookup alone is not permission to throw away a valid location that
        // the candidate's current/first Experience block independently corroborates.
        const recoveryCurrentCity = normalizeContactDisplayCase(String(cityInput.value || "").trim());
        const recoveryCurrentState = String(stateInput.value || "").trim().toUpperCase();
        if (
            currentLocationIsCorroboratedByCurrentExperience(
                resumeTextForAreaRecovery,
                recoveryCurrentCity,
                recoveryCurrentState
            )
        ) {
            if (lookupInput) lookupInput.value = `${recoveryCurrentCity}, ${recoveryCurrentState}`;
            runConfirmedZipLookup(
                { city: recoveryCurrentCity, state: recoveryCurrentState },
                { zipStatus: "blank" }
            );
            console.info(
                `Toolbar AREA v182: cancelled ZIP-failure Area; current Experience ` +
                `corroborates ${recoveryCurrentCity}, ${recoveryCurrentState}.`
            );
            return;
        }

        let digits = String(getAreaSourcePhone() || "").replace(/\D/g, "");
        if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);

        // v82 CRITICAL FIX:
        // Auto recovery must NOT wait for AREA_CODE_LOOKUP to already be loaded.
        // The real Area button owns that initialization and loads the table on demand.
        // This is why a manual Area click worked while automatic recovery appeared
        // to do nothing: Auto was waiting for data that only the button itself loads.
        if (digits.length < 10) {
            if (Date.now() - frt7AreaRecoveryStartedAt < 2000) {
                frt7AreaRecoveryTimer = setTimeout(attempt, 500);
            }
            return;
        }

        // v154 final no-race check: if another Auto pass resolved a header location
        // while this async recovery was waiting, Area is no longer permitted.
        const lateHeaderLock = frt7GetAuthoritativeHeaderLocation();
        if (lateHeaderLock?.city && /^[A-Z]{2}$/.test(String(lateHeaderLock.state || "").toUpperCase())) {
            frt7EnforceAuthoritativeHeaderLocation("cancel late ZIP-failure Area click");
            console.info("Toolbar AREA v154: late Area click cancelled because header location became authoritative.");
            return;
        }

        const currentCity = normalizeContactDisplayCase(String(cityInput.value || "").trim());
        const currentState = String(stateInput.value || "").trim().toUpperCase();
        const lookupValue = String(lookupInput?.value || "").trim();
        console.info(`Toolbar AREA v154: auto-clicking REAL Area button after failed ZIP lookup (${reason}); current=${currentCity}, ${currentState}; lookup=${lookupValue}.`);
        areaBtn.click();
        console.info(`Toolbar AREA v406: click dispatched; result=${String(cityInput.value || "").trim()}, ${String(stateInput.value || "").trim()}; ZIP=${String(zipInput.value || "").trim() || "blank"}.`);

        if (Date.now() - frt7AreaRecoveryStartedAt < 2000) {
            frt7AreaRecoveryTimer = setTimeout(attempt, 700);
        }
    };

    frt7AreaRecoveryTimer = setTimeout(attempt, 250);
}

function fillAutoCityStateFromResume(fields = {}) {
    const coverLetterApplicant = frt7CoverLetterExistingLocationCandidate();
    if (coverLetterApplicant) {
        frt7SetAuthoritativeHeaderLocation(coverLetterApplicant, "v361 auto cover-letter guard");
        return false;
    }
    const wantsCity = Boolean(fields.city);
    const wantsState = Boolean(fields.state);
    const wantsZipLookup = Boolean(fields.zipLookup);
    if (!wantsCity && !wantsState && !wantsZipLookup) return false;

    // v313 EMPTY-RAW IFRAME CONTACT HEADER: exceptionally, WallStJobs leaves
    // txtResumeRaw empty while the same-origin preview contains the actual resume.
    // Only repair a BLANK city/ZIP from an explicit header City, ST ZIP; never
    // overwrite an existing location or a manual edit. Ordinary resumes unchanged.
    try {
        const raw = String(document.getElementById("txtResumeRaw")?.value || "").trim();
        const cityEl = document.getElementById("txtCityDataEntry");
        const stateEl = document.getElementById("txtStateDataEntry");
        const zipEl = document.getElementById("txtZipDataEntry");
        if (!raw && cityEl && stateEl && zipEl &&
            !String(cityEl.value || "").trim() && !String(zipEl.value || "").trim()) {
            const frame = document.querySelector('iframe[src*="displayresumetext.asp"]') ||
                document.querySelector("#divResumeContainer iframe");
            const doc = frame?.contentDocument || frame?.contentWindow?.document;
            const bodyText = String(doc?.querySelector(".Section1")?.innerText || doc?.body?.innerText || "")
                .replace(/\u00a0/g, " ").trim();
            if (bodyText.length >= 300) {
                const header = bodyText.slice(0, 650);
                const match = header.match(/(?:^|[\n|])\s*([A-Za-z][A-Za-z.'’ -]{1,55}?)\s*,\s*([A-Z]{2})\s+(\d{5})(?![\d-])/m);
                if (match && (!String(stateEl.value || "").trim() ||
                    String(stateEl.value || "").trim().toUpperCase() === match[2])) {
                    const canCity = wantsCity && !isManualContactLocked("city", cityEl);
                    const canState = wantsState && !isManualContactLocked("state", stateEl);
                    const canZip = !isManualContactLocked("zip", zipEl);
                    if (canCity && canZip &&
                        (String(stateEl.value || "").trim() || canState)) {
                        cityEl.value = normalizeContactDisplayCase(match[1]);
                        triggerEvents(cityEl);
                        if (canState && !String(stateEl.value || "").trim()) {
                            stateEl.value = match[2]; triggerEvents(stateEl);
                        }
                        zipEl.value = match[3]; triggerEvents(zipEl);
                        console.info(`Toolbar AUTO LOCATION v313: empty raw resume; verified iframe header -> ${cityEl.value}, ${match[2]} ${match[3]}.`);
                        return true;
                    }
                }
            }
        }
    } catch (e) { console.warn("Toolbar AUTO LOCATION v313: iframe header unavailable", e); }

    // v295 HARD SOURCE CITY/STATE LOCK:
    // Career Builder and Resume Library own the City+State pair whenever BOTH fields
    // arrived populated on the WallStJobs page. Do not even enter resume-header City
    // detection for these sources. This intentionally does NOT depend on the red ZIP
    // validation text being present yet; that text can arrive after Auto has started.
    // If ZIP is blank/wrong, repair ZIP from this exact City+State pair.
    if (frt7SourceProtectionAllowed()) {
        const sourceName = frt7IsCareerBuilderSource() ? "Career Builder" : "Resume Library";
        const cityInput = document.getElementById("txtCityDataEntry");
        const stateInput = document.getElementById("txtStateDataEntry");
        const zipInput = document.getElementById("txtZipDataEntry");
        const lookupInput = document.getElementById("txtZipLookupEntry");
        const city = normalizeContactDisplayCase(String(cityInput?.value || "").trim());
        const state = String(stateInput?.value || "").trim().toUpperCase();
        if (city && /^[A-Z]{2}$/.test(state)) {
            // Normalize display case only; never substitute a resume-derived city/state.
            if (cityInput && String(cityInput.value || "").trim() !== city) { cityInput.value = city; triggerEvents(cityInput); }
            if (stateInput && String(stateInput.value || "").trim() !== state) { stateInput.value = state; triggerEvents(stateInput); }

            const zip = String(zipInput?.value || "").trim();
            const zipState = /^\d{5}$/.test(zip) ? String(frt7StateFromZipV171(zip) || "").toUpperCase() : "";
            const status = getWebsiteZipStatus();
            const zipNeedsRepair = !/^\d{5}(?:-\d{4})?$/.test(zip) ||
                status === "mismatch" || status === "unresolvedzip" || status === "blank" ||
                (zipState && zipState !== state);

            if (wantsZipLookup && zipNeedsRepair && zipInput && lookupInput && !isManualContactLocked("zip", zipInput)) {
                if (zip) { zipInput.value = ""; triggerEvents(zipInput); }
                lookupInput.value = `${city}, ${state}`;
                fireZipLookupEnter(lookupInput);
                console.info(`Toolbar AUTO ZIP v295: ${sourceName} hard City/State lock; looked up ZIP for ${city}, ${state} (main Auto City/State pass).`);
            } else {
                console.info(`Toolbar AUTO LOCATION v295: ${sourceName} hard City/State lock; preserved ${city}, ${state} and skipped resume-header City/State replacement.`);
            }
            return true;
        }
    }

    // Existing complete/error-free preservation for other timing paths.
    if (frt7CareerBuilderValidLocationMustStay("main Auto City/State pass")) return false;

    const text = getResumeText();
    const loc = extractCityStateFromHeader(text);

    // v158: Header ZIP has priority over every automatic ZIP lookup. This is
    // intentionally checked before the old mismatch-repair lookup path.
    // v159: Direct header ZIP is contact autofill, NOT ZIP Lookup.
    // If City/State autofill is active and the true header says State + 5-digit ZIP,
    // copy that ZIP regardless of the ZIP Lookup checkbox or WallStJobs' match status.
    const explicitHeaderZip = loc?.state
        ? applyObviousHeaderZipFromResume(loc.state, "city/state autofill")
        : "";

    // Existing mismatch repair remains unchanged when the resume header does NOT
    // already supply an obvious ZIP.
    if (!explicitHeaderZip && wantsZipLookup && runAutoZipLookupFromExistingCityStateOnMismatch()) {
        return true;
    }
    if (!loc || !loc.city || !loc.state || !isSafeAutoCity(loc)) {
        console.warn("Toolbar AUTO LOCATION: Rejected or missing confirmed city/state.", loc);
        return false;
    }

    const cityInput = document.getElementById("txtCityDataEntry");
    const stateInput = document.getElementById("txtStateDataEntry");
    const zipInput = document.getElementById("txtZipDataEntry");

    // Human changes are authoritative for this applicant, even if WallStJobs
    // replaces the DOM node after the edit.
    const allowCityAuto = wantsCity && !isManualContactLocked("city", cityInput);
    const allowStateAuto = wantsState && !isManualContactLocked("state", stateInput);
    const allowZipAuto = wantsZipLookup && !isManualContactLocked("zip", zipInput);
    if (!allowCityAuto && !allowStateAuto && !allowZipAuto) return false;

    // v35: capitalization cleanup is allowed independently of location replacement.
    // This means a correct existing "OPA LOCKA, FL 33054" becomes "Opa Locka"
    // even when WallStJobs already says State/ZIP match and we otherwise preserve it.
    if (allowCityAuto && cityInput) {
        const normalizedExistingCity = normalizeContactDisplayCase(cityInput.value);
        if (normalizedExistingCity && normalizedExistingCity !== String(cityInput.value || "").trim()) {
            cityInput.value = normalizedExistingCity;
            triggerEvents(cityInput);
        }
    }

    if (allowStateAuto && stateInput) {
        const normalizedExistingState = String(stateInput.value || "").trim().toUpperCase();
        if (normalizedExistingState && normalizedExistingState !== String(stateInput.value || "").trim()) {
            stateInput.value = normalizedExistingState;
            triggerEvents(stateInput);
        }
    }

    const zipStatus = getWebsiteZipStatus();
    const currentCity = String(cityInput?.value || "").trim();
    const currentState = String(stateInput?.value || "").trim().toUpperCase();
    const sameCity = Boolean(currentCity) &&
        normalizeLocationText(currentCity) === normalizeLocationText(loc.city);
    const sameState = Boolean(currentState) && currentState === loc.state;

    // Most important protection: when the website says its current State/ZIP
    // already match, leave City, State, and ZIP exactly as they are. This keeps
    // a correct "San Jose, CA 95127" from being replaced by a bad "SJ" parse.
    if (zipStatus === "match") {
        console.log("Toolbar AUTO LOCATION: Existing State/ZIP match; preserving location.");
        return false;
    }

    // With a populated but unknown ZIP status, do not alter location fields.
    // We only act on a blank ZIP or an explicit website mismatch.
    if (zipStatus === "unknown") {
        console.log("Toolbar AUTO LOCATION: Populated ZIP has unknown validation status; preserving location.");
        return false;
    }

    let allowMismatchCorrection = false;
    if (zipStatus === "mismatch") {
        // Correct a mismatched State/ZIP only when the already-filled city is
        // exactly the same city confirmed by the resume. This supports
        // Round Rock, PA -> Round Rock, TX without replacing unrelated cities.
        // v142: A positively matched military installation is also authoritative.
        // The site's current city may be only a fragment of the base name (Andrews),
        // so requiring exact city equality would prevent the correction we need.
        allowMismatchCorrection = (sameCity && !sameState) || Boolean(loc.militaryInstallation);
        if (!allowMismatchCorrection) {
            console.warn("Toolbar AUTO LOCATION: Website mismatch exists, but current city does not exactly match the confirmed resume city; preserving location.", {
                currentCity, currentState, confirmedCity: loc.city, confirmedState: loc.state
            });
            return false;
        }
    }

    let changed = false;

    // For a blank ZIP, normal confirmed City/State filling is allowed. For a
    // mismatch correction, preserve the already-matching city and correct only
    // the state before performing a fresh ZIP lookup.
    if ((zipStatus === "blank" || (zipStatus === "mismatch" && loc.militaryInstallation)) && allowCityAuto && cityInput && !sameCity) {
        cityInput.value = normalizeContactDisplayCase(loc.city);
        triggerEvents(cityInput);
        changed = true;
    }

    if (allowStateAuto && stateInput && !sameState) {
        stateInput.value = loc.state;
        triggerEvents(stateInput);
        changed = true;
    }

    if (allowZipAuto && !explicitHeaderZip) {
        setTimeout(() => runConfirmedZipLookup(loc, {
            zipStatus,
            allowMismatchCorrection
        }), 120);
    }

    return changed;
}
async function revertOriginalValues(forcedFields = null) {
    const orig = window.__frt7_original;
    if (!orig) {
        console.warn("Toolbar Revert: original values were not captured.");
        return;
    }

    // v48: ARM NAME REVERT SYNCHRONOUSLY, BEFORE THE FIRST await.
    // The old function waited for storage before setting __frt7_name_reverted,
    // leaving a small race where the Auto Name retry could fire and put the name
    // right back. If the visible Name revert box is checked (or unavailable, where
    // Name defaults to enabled), Revert immediately becomes authoritative.
    const immediateNameRevertSetting = forcedFields
        ? forcedFields.name === true
        : document.getElementById("frt7-revert-name")?.checked;
    if (immediateNameRevertSetting !== false) {
        window.__frt7_name_reverted = true;
        pendingAutoNameLearning = null;

        const immediateFirst =
            document.querySelector("#txtFirstNameDataEntry") ||
            document.querySelector("#txtFirstName");
        const immediateLast =
            document.querySelector("#txtLastNameDataEntry") ||
            document.querySelector("#txtLastName");

        if (immediateFirst) markManualContactEdit(immediateFirst);
        if (immediateLast) markManualContactEdit(immediateLast);

        // Stop any old delayed Name-button timer that has not fired yet.
        if (delayedNameClickTimer) {
            clearTimeout(delayedNameClickTimer);
            delayedNameClickTimer = null;
        }

        console.info("Toolbar NAME v48: Revert hard-stop armed immediately.");
    }

    // Read the visible checkboxes first so a just-clicked setting works immediately.
    const checkboxFields = {
        name: document.getElementById("frt7-revert-name")?.checked,
        email: document.getElementById("frt7-revert-email")?.checked,
        phone: document.getElementById("frt7-revert-phone")?.checked,
        city: document.getElementById("frt7-revert-city")?.checked,
        state: document.getElementById("frt7-revert-state")?.checked,
        zip: document.getElementById("frt7-revert-zip")?.checked
    };
    const stored = await browser.storage.local.get(REVERT_FIELDS_KEY);
    const storedFields = stored[REVERT_FIELDS_KEY] || {};
    // v274: toolbar split buttons can force exactly Name-only or Email-only.
    // The existing Revert settings are deliberately preserved unchanged for future use.
    const revertFields = forcedFields
        ? Object.fromEntries(
            Object.keys(DEFAULT_REVERT_FIELDS).map(key => [key, forcedFields[key] === true])
        )
        : Object.fromEntries(
            Object.keys(DEFAULT_REVERT_FIELDS).map(key => [
                key,
                typeof checkboxFields[key] === "boolean"
                    ? checkboxFields[key]
                    : (typeof storedFields[key] === "boolean" ? storedFields[key] : DEFAULT_REVERT_FIELDS[key])
            ])
        );

    const fields = {
        first: document.querySelector("#txtFirstNameDataEntry") || document.querySelector("#txtFirstName"),
        last: document.querySelector("#txtLastNameDataEntry") || document.querySelector("#txtLastName"),
        email: document.querySelector("#txtEmail"),
        phone: document.querySelector("#txtPhoneDataEntry") || document.querySelector("#txtPhone"),
        city: document.querySelector("#txtCityDataEntry"),
        state: document.querySelector("#txtStateDataEntry"),
        zip: document.querySelector("#txtZipDataEntry")
    };


    window.__frt7_reverted_fields = { ...(window.__frt7_reverted_fields || {}), ...revertFields };
    if (revertFields.name) window.__frt7_name_reverted = true;

    // v41: capture exactly what the user is rejecting BEFORE Revert restores the
    // original fields. Do not depend solely on pendingAutoNameLearning: Auto Name
    // retries can replace/clear that pending object, and a manual Name-button result
    // never creates it at all. The visible pre-Revert name is the authoritative
    // "this was wrong" signal from the user.
    const rejectedVisibleNameBeforeRevert = revertFields.name
        ? {
            first: String(fields.first?.value || "").trim(),
            last: String(fields.last?.value || "").trim()
        }
        : null;

    const restore = (enabled, element, value) => {
        if (!enabled || !element) return;
        element.value = value ?? "";
        triggerEvents(element);
    };

    // Restore first. Rejected-name saving must never delay or block Revert.
    restore(revertFields.name, fields.first, orig.first);
    restore(revertFields.name, fields.last, orig.last);
    restore(revertFields.email, fields.email, orig.email);
    restore(revertFields.phone, fields.phone, orig.phone);
    restore(revertFields.city, fields.city, orig.city);
    restore(revertFields.state, fields.state, orig.state);
    restore(revertFields.zip, fields.zip, orig.zip);

    if (revertFields.name) {
        window.__frt7_last_auto_name = null;

        const originalName = {
            first: String(orig.first || "").trim(),
            last: String(orig.last || "").trim()
        };

        const rejectedKey = normalizeRejectedName(
            `${rejectedVisibleNameBeforeRevert?.first || ""} ${rejectedVisibleNameBeforeRevert?.last || ""}`
        );
        const originalKey = normalizeRejectedName(
            `${originalName.first} ${originalName.last}`
        );

        // Learn the actual visible name that was rejected. Only learn when it
        // differs from the original; pressing Revert when nothing changed should
        // never blacklist the correct applicant name.
        if (rejectedKey && rejectedKey !== originalKey) {
            learnRejectedAutoNameWords(rejectedVisibleNameBeforeRevert, originalName);
        } else if (pendingAutoNameLearning?.proposed) {
            // Defensive fallback for unusual timing where the fields were repainted
            // to original immediately before the Revert handler ran.
            const pendingKey = normalizeRejectedName(
                `${pendingAutoNameLearning.proposed.first || ""} ${pendingAutoNameLearning.proposed.last || ""}`
            );
            if (pendingKey && pendingKey !== originalKey) {
                learnRejectedAutoNameWords(pendingAutoNameLearning.proposed, originalName);
            }
        }

        pendingAutoNameLearning = null;
    }

    console.log("Toolbar: reverted selected fields", revertFields);
}



    function fillCityStateFromResume(city, state) {
        const cityInput   = document.getElementById("txtCityDataEntry");
        const stateInput  = document.getElementById("txtStateDataEntry");
        const lookupInput = document.getElementById("txtZipLookupEntry");

        const normalizedCity = normalizeContactDisplayCase(city);
        const normalizedState = String(state || "").trim().toUpperCase();

        if (cityInput) {
            cityInput.value = normalizedCity;
            try { triggerEvents(cityInput); } catch(e) {}
        }
        if (stateInput) {
            stateInput.value = normalizedState;
            try { triggerEvents(stateInput); } catch(e) {}
        }
        if (lookupInput) {
            lookupInput.value = normalizedCity + ", " + normalizedState;
            try { triggerEvents(lookupInput); } catch(e) {}
            fireZipLookupEnter(lookupInput);
        }
    }

    function runManualCityStateZipLikeAuto() {
        // v198 MANUAL City/ST = current Auto location decision path:
        // 1) Give the exact trusted/saved/header City resolver first priority.
        //    That shared resolver synchronizes State and performs the same ZIP/header-ZIP
        //    work Auto uses when it has a trusted pair.
        // 2) If there is no trusted/saved header City+State, use the exact Area/phone
        //    writer used by the Area button, which also performs the normal ZIP lookup.
        //
        // This intentionally does NOT depend on the Auto master toggle or its per-field
        // checkboxes: clicking City/ST is an explicit manual request to run the location
        // resolver now. Auto itself is not changed.
        const usedTrustedLocation = fillCityOnlyFromResume({
            trustedOnly: true,
            manualButton: true
        });

        if (usedTrustedLocation) {
            console.info("Toolbar CITY/ST v198: used trusted/saved Auto location path.");
            return true;
        }

        console.info("Toolbar CITY/ST v198: no trusted/saved header location; using Area fallback.");
        return fillLocationFromPhone();
    }

// v353: Bridge from applicant lifecycle (outer scope) into the toolbar's
// private Auto runner (createToolbar scope). No Name button logic is changed.
let frt7RunScopedAuto = null;

function createToolbar() {
        const existingToolbar = document.getElementById("floating-resume-toolbar-v7");
        if (existingToolbar) {
            // Older copies of this userscript can otherwise win the race and make
            // the newly installed build silently return here. Replace the visible
            // toolbar so this build definitely owns the UI the user is clicking.
            const existingBuild = existingToolbar.dataset?.frt7Build || "";
            if (existingBuild === FRT7_BUILD_ID) return;

            console.warn(
                "Toolbar: replacing an older/duplicate Contact Info Toolbar instance.",
                existingBuild || "(unmarked older build)"
            );
            existingToolbar.remove();
            document.getElementById("frt7-settings-panel")?.remove();
        }

        const toolbar = document.createElement("div");
        toolbar.id = "floating-resume-toolbar-v7";
        toolbar.dataset.frt7Build = FRT7_BUILD_ID;
        toolbar.title = `Contact Info Toolbar build ${FRT7_BUILD_ID}`;
        toolbar.innerHTML = `
            <div class="frt7-buttons">
                <button class="frt7-btn" id="frt7-name-btn">
                    <span class="frt7-emoji">👤</span>
                    <span class="frt7-label">Name</span>
                </button>
                <button class="frt7-btn" id="frt7-email-btn">
                    <span class="frt7-emoji">✉️</span>
                    <span class="frt7-label">Email</span>
                </button>
                <button class="frt7-btn" id="frt7-phone-btn">
                    <span class="frt7-emoji">📞</span>
                    <span class="frt7-label">Phone</span>
                </button>
				<button class="frt7-btn" id="frt7-cityonly-btn">
					<span class="frt7-emoji">🏙️</span>
					<span class="frt7-label">City</span>
				</button>

<div class="frt7-revert-split">
    <button class="frt7-btn frt7-revert-mini" id="frt7-revert-name-btn" title="Revert Name only">
        <span class="frt7-emoji">↩️</span>
        <span class="frt7-label">Name</span>
    </button>
    <button class="frt7-btn frt7-revert-mini" id="frt7-revert-email-btn" title="Revert Email only">
        <span class="frt7-emoji">↩️</span>
        <span class="frt7-label">Email</span>
    </button>
</div>


				<div class="frt7-divider"></div>

                <button class="frt7-btn" id="frt7-location-btn">
                    <span class="frt7-emoji">📞</span>
                    <span class="frt7-label">Area</span>
                </button>
				<button class="frt7-btn" id="frt7-citystate-btn">
					<span class="frt7-emoji">📍</span>
					<span class="frt7-label">City/ST</span>
				</button>
<div class="frt7-divider frt7-collapse-divider" id="frt7-collapse-divider"></div>

<button class="frt7-icon-btn" id="frt7-settings-btn">⚙️</button>
<button
    class="frt7-icon-btn"
    id="frt7-pin-btn"
    title="Pin toolbar">
    📍
</button>

            </div>
        `;


        // --- Drag + Save Position ---
        let offsetX = 0, offsetY = 0, dragging = false;

let isPinned = false;

browser.storage.local.get("frt7_pinned").then(res => {
    if (res.frt7_pinned) {
        isPinned = true;
        const pinBtn = document.getElementById("frt7-pin-btn");
        if (pinBtn) pinBtn.style.opacity = "0.5";
    }
});


        // Restore saved position
        browser.storage.local.get("toolbarPos").then(res => {
            if (res.toolbarPos) {
                toolbar.style.top = res.toolbarPos.top;
                toolbar.style.left = res.toolbarPos.left;
                toolbar.style.right = "auto";
            }
        });

        toolbar.addEventListener("mousedown", (e) => {
		if (isPinned) return;
            dragging = true;
            offsetX = e.clientX - toolbar.offsetLeft;
            offsetY = e.clientY - toolbar.offsetTop;
            toolbar.style.transition = "none";
        });

        document.addEventListener("mousemove", (e) => {
            if (!dragging) return;
            toolbar.style.left = (e.clientX - offsetX) + "px";
            toolbar.style.top = (e.clientY - offsetY) + "px";
            toolbar.style.right = "auto";
        });

        document.addEventListener("mouseup", () => {
            if (!dragging) return;
            dragging = false;
            const pos = { top: toolbar.style.top, left: toolbar.style.left };
            browser.storage.local.set({ toolbarPos: pos });
        });

const style = document.createElement("style");
style.textContent = `
    #floating-resume-toolbar-v7 {
        position: fixed;
        top: 80px;
        right: 10px;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.25);
        z-index: 10000002;
        font-family: Arial, sans-serif;
        user-select: none;
        min-width: 130px;
    }

    #floating-resume-toolbar-v7 .frt7-buttons {
        display: flex;
        padding: 6px 8px 8px 8px;
        gap: 4px;
        align-items: center;

        /* ⭐ Required so header can appear above the lookup buttons */
        position: relative;
    }

    #floating-resume-toolbar-v7 .frt7-btn {
        flex: 1 1 auto;
        border: none;
        background: var(--frt-btn-bg);
        border-radius: 6px;
        padding: 4px 4px 2px 4px;
        cursor: pointer;
        font-size: 11px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1px;
    }

#floating-resume-toolbar-v7 .frt7-revert-split {
    display: flex;
    gap: 2px;
    align-self: stretch;
}
#floating-resume-toolbar-v7 .frt7-revert-mini {
    flex: 0 0 auto;
    min-width: 34px;
}

#floating-resume-toolbar-v7 .frt7-auto-btn.frt7-auto-on {
    background: #d8f5dc !important;
    box-shadow: inset 0 0 0 2px #2f8f46;
}

.frt7-btn:hover {
    filter: brightness(0.92);
}

.frt7-collapse-divider {
    width: 2px;
    transition: height 0.15s ease, opacity 0.15s ease;
}

    #floating-resume-toolbar-v7 .frt7-emoji {
        font-size: 16px;
        line-height: 1;
    }

    #floating-resume-toolbar-v7 .frt7-label {
        font-size: 10px;
    }
/* 🧩 Clickable collapse divider – bigger hit area */
.frt7-collapse-divider {
    width: 8px;                /* 👈 bigger click target */
    margin: 0 4px;             /* keep spacing sane */
    background-clip: content-box;
    padding: 0 3px;            /* visual line stays thin */
    cursor: pointer;
}
.frt7-collapse-divider:hover {
    opacity: 1;
}


.frt7-collapse-divider:hover {
    opacity: 1;
    background: rgba(0,0,0,0.15);
}

#floating-resume-toolbar-v7.frt7-dark .frt7-collapse-divider:hover {
    background: rgba(255,255,255,0.2);
}

    /* 🔥 Vertical divider */
    .frt7-divider {
        width: 1px;
        background: #ccc;
        margin: 0 6px;
        height: 28px;
        align-self: center;
    }

/* 🌙 Small icon buttons (dark mode / pin) */
.frt7-icon-btn {
    border: none;
    background: var(--frt-bg-color);   /* ⭐ now follows toolbar bg */
    cursor: pointer;
    font-size: 11px;
    padding: 2px 4px;
    line-height: 1;
    border-radius: 4px;
}
.frt7-icon-btn:hover {
    filter: brightness(0.9);
}
/* ⭐ Settings panel text fix */
#frt7-settings-panel {
    color: #000;
}

#frt7-settings-panel.dark {
    background: #2b2b2b !important;
    color: #eaeaea !important;
}

#frt7-settings-panel label,
#frt7-settings-panel b {
    color: inherit !important;
}

#frt7-settings-panel hr {
    border-color: currentColor;
}
/* 🎨 Compact color pickers */
#frt7-settings-panel input[type="color"] {
    width: 36px;
    height: 22px;
    padding: 0;
    border: 1px solid #888;
    border-radius: 4px;
    cursor: pointer;
}


/* --------------------------------------------
   ⭐ BUTTON BACKGROUND (THEME-AWARE)
-------------------------------------------- */
#floating-resume-toolbar-v7 {
    --frt-btn-bg: rgba(0, 0, 0, 0.05);
}

#floating-resume-toolbar-v7.frt7-dark {
    --frt-btn-bg: rgba(255, 255, 255, 0.08);
}


/* --------------------------------------------
   ⭐ SETTINGS COLOR VARIABLES (SAFE)
-------------------------------------------- */
/* --------------------------------------------
   ⭐ DEFAULT (LIGHT MODE)
-------------------------------------------- */
#floating-resume-toolbar-v7:not(.frt7-dark) {
    --frt-font-color: #000000;
    --frt-bg-color: #ffffff;
}

#floating-resume-toolbar-v7,
#floating-resume-toolbar-v7 * {
    color: var(--frt-font-color) !important;
}

#floating-resume-toolbar-v7 {
    background: var(--frt-bg-color) !important;
}
/* --------------------------------------------
   ⭐ DARK MODE (CLASS-BASED)
-------------------------------------------- */
#floating-resume-toolbar-v7.frt7-dark {
    --frt-font-color: #eaeaea;
    --frt-bg-color: #1e1e1e;
}

.frt7-icon-btn:hover {
    opacity: 0.7;
}

`;

document.documentElement.appendChild(style);

        document.body.appendChild(toolbar);
// --------------------------------------------
// ⭐ SETTINGS PANEL (UI ONLY)
// --------------------------------------------
const settingsPanel = document.createElement("div");
settingsPanel.id = "frt7-settings-panel";
settingsPanel.dataset.frt7Build = FRT7_BUILD_ID;
settingsPanel.style.cssText = `
    position: fixed;
    top: 80px;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: min(760px, calc(100vw - 40px));
    max-height: calc(100vh - 120px);
    overflow: hidden;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #444;
    border-radius: 10px;
    padding: 0;
    font-size: 12px;
    z-index: 10000003;
    display: none;
    box-shadow: 0 8px 28px rgba(0,0,0,0.35);
`;

settingsPanel.addEventListener("mousedown", e => e.stopPropagation());

let settingsDragging = false;
let settingsDragOffsetX = 0;
let settingsDragOffsetY = 0;

const keepSettingsInViewport = () => {
    if (settingsPanel.style.display !== "block") return;
    const rect = settingsPanel.getBoundingClientRect();
    const margin = 10;
    const left = Math.max(margin, Math.min(rect.left, window.innerWidth - rect.width - margin));
    const top = Math.max(margin, Math.min(rect.top, window.innerHeight - 50));
    settingsPanel.style.left = left + "px";
    settingsPanel.style.top = top + "px";
    settingsPanel.style.right = "auto";
    settingsPanel.style.transform = "none";
};

settingsPanel.addEventListener("mousedown", e => {
    const dragbar = e.target.closest("#frt7-settings-dragbar");
    if (!dragbar || e.target.closest("button,input,label")) return;
    const rect = settingsPanel.getBoundingClientRect();
    settingsDragging = true;
    settingsDragOffsetX = e.clientX - rect.left;
    settingsDragOffsetY = e.clientY - rect.top;
    settingsPanel.style.left = rect.left + "px";
    settingsPanel.style.top = rect.top + "px";
    settingsPanel.style.transform = "none";
    e.preventDefault();
});

document.addEventListener("mousemove", e => {
    if (!settingsDragging) return;
    const rect = settingsPanel.getBoundingClientRect();
    const margin = 10;
    const maxLeft = Math.max(margin, window.innerWidth - rect.width - margin);
    const maxTop = Math.max(margin, window.innerHeight - 50);
    settingsPanel.style.left = Math.max(margin, Math.min(e.clientX - settingsDragOffsetX, maxLeft)) + "px";
    settingsPanel.style.top = Math.max(margin, Math.min(e.clientY - settingsDragOffsetY, maxTop)) + "px";
});

document.addEventListener("mouseup", () => {
    if (!settingsDragging) return;
    settingsDragging = false;
    browser.storage.local.set({
        frt7SettingsPanelPos: { left: settingsPanel.style.left, top: settingsPanel.style.top }
    });
});
window.addEventListener("resize", keepSettingsInViewport);

// v86 SETTINGS UI FIX:
// Auto intentionally generates programmatic .click() events while a resume settles
// (Name/Email/City/Area/etc.). Those are not human clicks and must NEVER close an
// open Settings panel. Only a genuine user click outside Settings closes it.
document.addEventListener("click", e => {
    if (!e.isTrusted) return;

    const target = e.target instanceof Element ? e.target : null;
    if (
        settingsPanel.style.display === "block" &&
        target &&
        !settingsPanel.contains(target) &&
        !target.closest("#frt7-settings-btn")
    ) {
        settingsPanel.style.display = "none";
    }
});

settingsPanel.innerHTML = `
<div id="frt7-settings-dragbar" style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 12px;background:rgba(127,127,127,.12);border-bottom:1px solid #888;border-radius:10px 10px 0 0;cursor:move;user-select:none;">
  <div style="display:flex;align-items:baseline;gap:8px;">
    <b style="font-size:14px;">Toolbar Settings</b>
    <span id="frt7-build-label" style="font-size:10px;color:#777;font-weight:normal;">BUILD v87 • rare iframe contact fallback</span>
  </div>
  <button type="button" id="frt7-settings-close" title="Close settings" style="width:26px;height:24px;padding:0;line-height:20px;font-size:18px;cursor:pointer;">×</button>
</div>
<div style="padding:12px;overflow:auto;max-height:calc(100vh - 175px);box-sizing:border-box;">
  <div style="display:grid;grid-template-columns:minmax(240px,.85fr) minmax(300px,1.15fr);gap:16px;align-items:start;">
    <div style="min-width:0;">
      <div style="border:1px solid #aaa;border-radius:7px;padding:10px;margin-bottom:12px;">
        <label style="display:flex;align-items:center;gap:7px;font-weight:bold;"><input type="checkbox" id="frt7-dark-toggle"> Dark Mode</label>
      </div>
      <div style="border:1px solid #aaa;border-radius:7px;padding:10px;margin-bottom:12px;">
        <b>Backup / Transfer</b>
        <div style="margin:5px 0 8px;color:#666;line-height:1.3;">Export/Import moves everything. Merge Backup only adds shared names/cities to your lists and keeps your own preferences/deletions.</div>
        <div style="display:flex;gap:7px;flex-wrap:wrap;">
          <button type="button" id="frt7-export-settings">Export Backup</button>
          <button type="button" id="frt7-import-settings">Import Backup</button>
          <button type="button" id="frt7-merge-settings">Merge Backup</button>
          <input type="file" id="frt7-import-settings-file" accept="application/json,.json" style="display:none;">
          <input type="file" id="frt7-merge-settings-file" accept="application/json,.json" style="display:none;">
        </div>
        <div id="frt7-transfer-status" style="min-height:16px;margin-top:7px;font-size:11px;font-weight:bold;"></div>
      </div>
      <div style="border:1px solid #aaa;border-radius:7px;padding:10px;margin-bottom:12px;">
        <b>Revert fields</b>
        <div style="margin:5px 0 8px;color:#666;line-height:1.3;">Choose which fields the Revert button restores. Rejected name words are learned only when Name is checked.</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px 14px;margin-top:10px;">
          <label><input type="checkbox" id="frt7-revert-name"> Name</label>
          <label><input type="checkbox" id="frt7-revert-email"> Email</label>
          <label><input type="checkbox" id="frt7-revert-phone"> Phone</label>
          <label><input type="checkbox" id="frt7-revert-city"> City</label>
          <label><input type="checkbox" id="frt7-revert-state"> State</label>
          <label><input type="checkbox" id="frt7-revert-zip"> ZIP</label>
        </div>
      </div>
      <div style="border:1px solid #aaa;border-radius:7px;padding:10px;margin-bottom:12px;">
        <b>Auto-fill fields</b>
        <label style="display:flex;align-items:center;gap:7px;margin-top:10px;padding-bottom:9px;border-bottom:1px solid rgba(127,127,127,.28);font-weight:bold;">
          <input type="checkbox" id="frt7-auto-btn" title="Automatically fix contact fields when each resume loads"> Auto on/off
        </label>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px 14px;margin-top:10px;">
          <label><input type="checkbox" id="frt7-auto-name"> Name</label>
          <label><input type="checkbox" id="frt7-auto-email"> Email</label>
          <label><input type="checkbox" id="frt7-auto-phone"> Phone</label>
          <label><input type="checkbox" id="frt7-auto-city"> City</label>
          <label><input type="checkbox" id="frt7-auto-state"> State</label>
          <label title="Automatically run Lookup Zip when ZIP is blank or when the website reports that ZIP does not match the filled City/State."><input type="checkbox" id="frt7-auto-ziplookup"> ZIP Lookup</label>
        </div>
      </div>
      <div style="border:1px solid #aaa;border-radius:7px;padding:10px;margin-bottom:12px;">
        <b>Auto-change sound</b>
        <label style="display:flex;align-items:center;gap:7px;margin-top:10px;">
          <input type="checkbox" id="frt7-auto-sound-enabled"> Play sound when Auto changes contact info
        </label>
        <div style="margin-top:10px;">
          <div style="font-weight:600;margin-bottom:6px;">Play sound for changes to:</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px 12px;">
            <label><input type="checkbox" id="frt7-auto-sound-trigger-name"> Name</label>
            <label><input type="checkbox" id="frt7-auto-sound-trigger-email"> Email</label>
            <label><input type="checkbox" id="frt7-auto-sound-trigger-phone"> Phone</label>
            <label><input type="checkbox" id="frt7-auto-sound-trigger-city"> City</label>
            <label><input type="checkbox" id="frt7-auto-sound-trigger-state"> State</label>
            <label><input type="checkbox" id="frt7-auto-sound-trigger-zip"> ZIP</label>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:9px;margin-top:12px;min-width:0;">
          <div style="display:grid;grid-template-columns:62px minmax(0,1fr) 54px;gap:8px;align-items:center;min-width:0;">
            <label for="frt7-auto-sound-type">Sound</label>
            <select id="frt7-auto-sound-type" style="width:100%;min-width:0;max-width:100%;box-sizing:border-box;"><option value="chime">Chime</option><option value="beep">Beep</option><option value="soft">Soft</option><option value="low">Low</option><option value="click">Click</option></select>
            <button type="button" id="frt7-auto-sound-test" style="width:54px;box-sizing:border-box;">Test</button>
          </div>
          <div style="display:grid;grid-template-columns:62px minmax(0,1fr) 48px;gap:8px;align-items:center;min-width:0;">
            <label for="frt7-auto-sound-volume">Volume</label>
            <input type="range" id="frt7-auto-sound-volume" min="0" max="100" step="5" style="width:100%;min-width:0;box-sizing:border-box;">
            <span id="frt7-auto-sound-volume-label" style="text-align:right;white-space:nowrap;">35%</span>
          </div>
          <div style="display:grid;grid-template-columns:62px minmax(0,1fr) 48px;gap:8px;align-items:center;min-width:0;">
            <label for="frt7-auto-sound-duration">Duration</label>
            <input type="range" id="frt7-auto-sound-duration" min="50" max="2000" step="50" style="width:100%;min-width:0;box-sizing:border-box;">
            <span id="frt7-auto-sound-duration-label" style="text-align:right;white-space:nowrap;">220ms</span>
          </div>
        </div>
        <div style="margin-top:6px;color:#666;line-height:1.3;">Sounds only when Auto changes a checked field. If multiple checked fields change together, they are grouped into one sound.</div>
      </div>
      <div style="border:1px solid #aaa;border-radius:7px;padding:10px;margin-bottom:12px;">
        <b>Name change popup</b>
        <label style="display:flex;align-items:center;gap:7px;margin-top:10px;">
          <input type="checkbox" id="frt7-name-toast-enabled"> Show popup when Auto changes Name
        </label>
        <div style="display:grid;grid-template-columns:auto 1fr 48px;gap:8px;align-items:center;margin-top:10px;">
          <label for="frt7-name-toast-size">Size</label>
          <input type="range" id="frt7-name-toast-size" min="70" max="200" step="10" value="100">
          <span id="frt7-name-toast-size-label" style="text-align:right;">100%</span>
        </div>
        <div style="margin-top:6px;color:#666;line-height:1.3;">Appears at the top center for 3 seconds only when Auto actually changes First or Last Name.</div>
      </div>
      <div style="border:1px solid #aaa;border-radius:7px;padding:10px;">
        <b>Appearance</b>
        <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;margin-top:10px;">
          <label for="frt7-font-color">Font Color</label><input type="color" id="frt7-font-color" style="width:100%;height:28px;"><button id="frt7-reset-font" type="button">Reset</button>
          <label for="frt7-bg-color">Background</label><input type="color" id="frt7-bg-color" style="width:100%;height:28px;"><button id="frt7-reset-bg" type="button">Reset</button>
        </div>
      </div>
    </div>
    <div style="min-width:0;">
      <div style="border:1px solid #aaa;border-radius:7px;padding:10px;margin-bottom:12px;">
        <b>Learned Cities</b>
        <div style="margin:5px 0 8px;color:#666;line-height:1.3;">Correct cities are learned only when the resume shows that exact city beside a state.</div>
        <input type="text" id="frt7-city-search" placeholder="Search cities…" autocomplete="off" style="width:100%;padding:6px 8px;margin:0 0 6px;border:1px solid #999;border-radius:5px;box-sizing:border-box;background:#fff;color:#111;">
        <div id="frt7-learned-cities-list" style="height:180px;overflow:auto;border:1px solid #bbb;border-radius:5px;padding:6px;margin-bottom:8px;background:rgba(127,127,127,.06);box-sizing:border-box;"></div>
        <button type="button" id="frt7-clear-learned-cities">Clear Learned Cities</button>
      </div>
      <div style="border:1px solid #aaa;border-radius:7px;padding:10px;margin-bottom:12px;">
        <b>U.S. City Database</b>
        <div style="margin:5px 0 8px;color:#666;line-height:1.3;">Census-derived U.S. places database. It is kept separate from Learned Cities for performance. Your edits, additions, and disabled entries are saved as small overrides and included in Settings backups.</div>
        <div style="display:grid;grid-template-columns:1fr 70px 58px;gap:6px;margin-bottom:6px;">
          <input type="text" id="frt7-us-city-db-add-city" placeholder="Add City" autocomplete="off" style="width:100%;box-sizing:border-box;">
          <input type="text" id="frt7-us-city-db-add-state" maxlength="2" placeholder="ST" autocomplete="off" style="width:100%;box-sizing:border-box;">
          <button type="button" id="frt7-us-city-db-add">Add</button>
        </div>
        <input type="text" id="frt7-us-city-db-search" placeholder="Search U.S. city database…" autocomplete="off" style="width:100%;padding:6px 8px;margin:0 0 5px;border:1px solid #999;border-radius:5px;box-sizing:border-box;background:#fff;color:#111;">
        <div id="frt7-us-city-db-status" style="min-height:16px;margin-bottom:5px;font-size:11px;font-weight:bold;"></div>
        <div id="frt7-us-city-db-list" style="height:180px;overflow:auto;border:1px solid #bbb;border-radius:5px;padding:6px;margin-bottom:6px;background:rgba(127,127,127,.06);box-sizing:border-box;"></div>
        <button type="button" id="frt7-us-city-db-refresh">Refresh Database</button>
      </div>
      <div style="border:1px solid #aaa;border-radius:7px;padding:10px;margin-bottom:12px;">
        <b>Custom Area Codes</b>
        <div style="margin:5px 0 8px;color:#666;line-height:1.3;">Add an area code and the City/State it should use. Custom entries take priority over the built-in area-code list. The Area button will still run the normal ZIP lookup after filling City/State.</div>
        <div style="display:grid;grid-template-columns:72px 1fr 58px 58px;gap:6px;align-items:center;margin-bottom:7px;">
          <input type="text" id="frt7-custom-area-code" inputmode="numeric" maxlength="3" placeholder="Area" autocomplete="off" style="width:100%;box-sizing:border-box;">
          <input type="text" id="frt7-custom-area-city" placeholder="City" autocomplete="off" style="width:100%;box-sizing:border-box;">
          <input type="text" id="frt7-custom-area-state" maxlength="2" placeholder="ST" autocomplete="off" style="width:100%;box-sizing:border-box;">
          <button type="button" id="frt7-custom-area-add">Add</button>
        </div>
        <div id="frt7-custom-area-status" style="min-height:16px;margin-bottom:5px;font-size:11px;font-weight:bold;"></div>
        <div id="frt7-custom-area-list" style="height:115px;overflow:auto;border:1px solid #bbb;border-radius:5px;padding:6px;background:rgba(127,127,127,.06);box-sizing:border-box;"></div>
      </div>
      <div style="border:1px solid #aaa;border-radius:7px;padding:10px;margin-bottom:12px;">
        <b>Safe Multi-Word First Names</b>
        <div style="margin:5px 0 8px;color:#666;line-height:1.3;">
          Trusted first names such as Lee Ann. Any First Name containing more than one word is saved when you finish/process that applicant. When the exact phrase appears in a future resume header, it stays together in First Name.
        </div>
        <div style="display:flex;gap:6px;margin-bottom:6px;">
          <input
              type="text"
              id="frt7-add-safe-first-name-input"
              placeholder="e.g. Lee Ann"
              autocomplete="off"
              style="flex:1;min-width:0;padding:6px 8px;border:1px solid #999;border-radius:5px;box-sizing:border-box;background:#fff;color:#111;"
          >
          <button type="button" id="frt7-add-safe-first-name" style="padding:5px 12px;">Add</button>
        </div>
        <div id="frt7-safe-first-name-status" style="min-height:16px;margin:0 0 5px;font-size:11px;font-weight:bold;"></div>
        <div id="frt7-safe-first-names-list" style="height:115px;overflow:auto;border:1px solid #bbb;border-radius:5px;padding:6px;margin-bottom:8px;background:rgba(127,127,127,.06);box-sizing:border-box;"></div>
        <button type="button" id="frt7-clear-safe-first-names">Clear Safe First Names</button>

        <div style="border-top:1px solid #bbb;margin-top:10px;padding-top:9px;">
          <b style="font-size:12px;">Credentials — excluded from names (Team Sync)</b>
          <div style="margin:5px 0;color:#666;">Add or remove credentials excluded from First/Last Name. Changes sync when Team Sync is enabled.</div>
          <div style="display:flex;gap:6px;margin-bottom:6px;"><input id="frt7-credential-input" type="text" placeholder="e.g. CAM" style="flex:1;min-width:0;padding:6px;"><button type="button" id="frt7-credential-add">Add</button></div>
          <div id="frt7-credential-status" style="font-size:11px;margin-bottom:5px;"></div>
          <div id="frt7-credential-list" style="max-height:150px;overflow:auto;border:1px solid #bbb;padding:6px;"></div>
        </div>
        <div style="border-top:1px solid #bbb;margin-top:10px;padding-top:9px;">
          <b style="font-size:12px;">Learned Mac Last Names</b>
          <div style="margin:5px 0 7px;color:#666;line-height:1.3;">
            Mac names are normally left as Macon / Macdonald. If you manually type a Last Name such as MacDonald, that exact surname capitalization is saved and reused in the future.
          </div>
          <div id="frt7-mac-last-name-status" style="min-height:14px;margin-bottom:4px;font-size:11px;font-weight:bold;"></div>
          <div id="frt7-mac-last-names-list" style="height:90px;overflow:auto;border:1px solid #bbb;border-radius:5px;padding:6px;margin-bottom:7px;background:rgba(127,127,127,.06);box-sizing:border-box;"></div>
          <button type="button" id="frt7-clear-mac-last-names">Clear Learned Mac Last Names</button>
        </div>
      </div>

      <div style="border:1px solid #aaa;border-radius:7px;padding:10px;">
        <div style="display:flex;align-items:baseline;justify-content:space-between;gap:8px;">
          <b>Rejected Auto Names</b>
          <span style="font-size:10px;color:#777;">storage: v3</span>
        </div>
        <div style="margin:5px 0 8px;color:#666;line-height:1.3;">
          Revert learns this automatically. A single rejected word becomes a word blocker unless there is strong evidence it is a real first name. Multi-word bad detections are saved as exact phrases.
        </div>

        <div style="display:flex;gap:6px;margin-bottom:6px;">
          <input
              type="text"
              id="frt7-add-rejected-name-input"
              placeholder="Type a word or exact phrase"
              autocomplete="off"
              style="
                  flex:1;
                  min-width:0;
                  padding:6px 8px;
                  border:1px solid #999;
                  border-radius:5px;
                  box-sizing:border-box;
                  background:#fff;
                  color:#111;
              "
          >
          <button
              type="button"
              id="frt7-add-rejected-name"
              style="padding:5px 12px;"
          >Save</button>
        </div>

        <div id="frt7-rejected-name-save-status" style="min-height:16px;margin:0 0 5px;font-size:11px;font-weight:bold;"></div>

        <div style="margin:0 0 8px;color:#777;line-height:1.25;font-size:11px;">
          Automatic mode: single words block anywhere by default. Only strongly recognized real first names stay exact-only. Multi-word phrases block only that exact detected name.
        </div>

        <input type="text" id="frt7-name-search" placeholder="Search names…" autocomplete="off" style="width:100%;padding:6px 8px;margin:0 0 6px;border:1px solid #999;border-radius:5px;box-sizing:border-box;background:#fff;color:#111;">

        <div id="frt7-rejected-names-list" style="
            height:115px;
            overflow:auto;
            border:1px solid #bbb;
            border-radius:5px;
            padding:6px;
            margin-bottom:8px;
            background:rgba(127,127,127,.06);
            box-sizing:border-box;
        "></div>
        <div id="frt7-rejected-debug-status" style="margin:6px 0;padding:6px;border:1px solid #999;border-radius:5px;font-size:10px;line-height:1.35;background:rgba(127,127,127,.08);">BUILD v26 diagnostic initializing…</div>
        <button type="button" id="frt7-clear-rejected-names">Clear Rejected Names</button>
      </div>
    </div>
  </div>
</div>`;

document.body.appendChild(settingsPanel);

browser.storage.local.get("frt7SettingsPanelPos").then(result => {
    const pos = result.frt7SettingsPanelPos;
    if (pos?.left && pos?.top) {
        settingsPanel.style.left = pos.left;
        settingsPanel.style.top = pos.top;
        settingsPanel.style.right = "auto";
        settingsPanel.style.transform = "none";
    }
});

settingsPanel.querySelector("#frt7-settings-close")?.addEventListener("click", e => {
    e.preventDefault(); e.stopPropagation(); settingsPanel.style.display = "none";
});

function escapeSettingsHtml(value) {
    return String(value || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
}

function renderCustomAreaCodesSettings() {
    const list = settingsPanel.querySelector("#frt7-custom-area-list");
    if (!list) return;
    loadCustomAreaCodes();
    list.innerHTML = "";
    const entries = Object.entries(customAreaCodesCache)
        .filter(([,value]) => value && value.deleted !== true)
        .sort(([a],[b]) => a.localeCompare(b));
    if (!entries.length) {
        const empty = document.createElement("div");
        empty.textContent = "No custom area codes yet.";
        empty.style.opacity = "0.7";
        list.appendChild(empty);
        return;
    }
    for (const [area, info] of entries) {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.justifyContent = "space-between";
        row.style.gap = "8px";
        row.style.padding = "3px 0";
        const label = document.createElement("span");
        label.textContent = `${area} — ${info.city}, ${String(info.state || "").toUpperCase()}`;
        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "×";
        remove.title = `Remove custom area code ${area}`;
        remove.addEventListener("click", event => {
            event.preventDefault(); event.stopPropagation();
            if (removeCustomAreaCode(area)) {
                row.remove();
                refreshSettingsListsFromStorage(true);
            }
        });
        row.append(label, remove);
        list.appendChild(row);
    }
}

function addCustomAreaCodeFromSettings() {
    const areaInput = settingsPanel.querySelector("#frt7-custom-area-code");
    const cityInput = settingsPanel.querySelector("#frt7-custom-area-city");
    const stateInput = settingsPanel.querySelector("#frt7-custom-area-state");
    const status = settingsPanel.querySelector("#frt7-custom-area-status");
    const result = addCustomAreaCode(areaInput?.value, cityInput?.value, stateInput?.value);
    if (status) {
        status.textContent = result.ok ? "Custom area code saved." : result.reason;
        status.style.color = result.ok ? "#16821b" : "#b00020";
    }
    if (!result.ok) return;
    refreshSettingsListsFromStorage(true);
    if (areaInput) areaInput.value = "";
    if (cityInput) cityInput.value = "";
    if (stateInput) stateInput.value = "";
}

settingsPanel.querySelector("#frt7-custom-area-code")?.addEventListener("input", event => {
    event.currentTarget.value = normalizeCustomAreaCode(event.currentTarget.value);
});
settingsPanel.querySelector("#frt7-custom-area-state")?.addEventListener("input", event => {
    event.currentTarget.value = String(event.currentTarget.value || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0,2);
});
settingsPanel.querySelector("#frt7-custom-area-add")?.addEventListener("click", event => {
    event.preventDefault(); event.stopPropagation(); addCustomAreaCodeFromSettings();
});
for (const id of ["#frt7-custom-area-code", "#frt7-custom-area-city", "#frt7-custom-area-state"]) {
    settingsPanel.querySelector(id)?.addEventListener("keydown", event => {
        if (event.key === "Enter") { event.preventDefault(); addCustomAreaCodeFromSettings(); }
    });
}
renderCustomAreaCodesSettings();
function frt7RenderCredentials() {
    const list=settingsPanel.querySelector('#frt7-credential-list'); if(!list) return;
    list.replaceChildren();
    const db=frt7CredentialOverrides();
    const keys=new Set([...NAME_CREDENTIALS,...Object.keys(db)]);
    for(const key of [...keys].sort()) {
        if(!frt7CredentialIsActive(key)) continue;
        const line=document.createElement('div'); line.style.cssText='display:flex;justify-content:space-between;align-items:center;padding:3px 2px;gap:8px';
        const name=document.createElement('span'); name.textContent=key;
        const remove=document.createElement('button'); remove.type='button'; remove.textContent='Remove';
        remove.addEventListener('click',()=>{frt7SetCredential(key,false);frt7RenderCredentials();});
        line.append(name,remove);list.appendChild(line);
    }
}
settingsPanel.querySelector('#frt7-credential-add')?.addEventListener('click',()=>{
    const input=settingsPanel.querySelector('#frt7-credential-input');
    const ok=frt7SetCredential(input?.value,true);
    const status=settingsPanel.querySelector('#frt7-credential-status');
    if(status)status.textContent=ok?'Credential saved locally; Team Sync will propagate it.':'Enter a credential using letters, numbers, periods or hyphens.';
    if(ok)input.value='';frt7RenderCredentials();
});
settingsPanel.querySelector('#frt7-credential-input')?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();settingsPanel.querySelector('#frt7-credential-add')?.click();}});
window.addEventListener('frt7:credentials-changed',frt7RenderCredentials);
window.addEventListener('frt7:team-sync-data-updated',frt7RenderCredentials);
frt7RenderCredentials();

// v385: Watch persisted data while Settings is open. This catches updates
// from direct X handlers, other toolbar callbacks, and incoming Team Sync,
// even when those paths don't call the renderer.
let liveCityRevision = null;
let liveAreaRevision = null;
function refreshSettingsListsFromStorage(force=false) {
    if (!settingsPanel?.isConnected) return;
    const cityRaw=String(GM_getValue(LEARNED_CITIES_SINGLE_DB_KEY,'{}')||'{}');
    const areaRaw=String(GM_getValue(CUSTOM_AREA_CODES_KEY,'{}')||'{}');
    if (force || cityRaw!==liveCityRevision) {
        liveCityRevision=cityRaw;
        try {
            learnedCitiesCache=parseLearnedCitiesStore(cityRaw);
            renderLearnedCitiesSettings();
        } catch(error) { console.warn('Live city settings refresh failed:',error); }
    }
    if (force || areaRaw!==liveAreaRevision) {
        liveAreaRevision=areaRaw;
        try {
            loadCustomAreaCodes();
            renderCustomAreaCodesSettings();
        } catch(error) { console.warn('Live area-code settings refresh failed:',error); }
    }
}
setInterval(()=>refreshSettingsListsFromStorage(),600);
// v396: Settings owns these caches and refresh functions; Team Sync only signals.
window.addEventListener('frt7:team-sync-data-updated',()=>{
    try { refreshSettingsListsFromStorage(true); }
    catch(error) { console.warn('Team Sync Settings refresh failed:',error); }
});

function renderLearnedCitiesSettings() {
        const container = settingsPanel.querySelector("#frt7-learned-cities-list");
        if (!container) return;

        container.innerHTML = "";

        // v38 manual Add controls: City + optional State + Add.
        let addRow = document.getElementById("frt7-trusted-city-add-row");
        if (!addRow) {
            addRow = document.createElement("div");
            addRow.id = "frt7-trusted-city-add-row";
            addRow.style.display = "grid";
            addRow.style.gridTemplateColumns = "1fr 64px 64px";
            addRow.style.gap = "6px";
            addRow.style.marginBottom = "8px";
            addRow.style.alignItems = "center";

            const cityInput = document.createElement("input");
            cityInput.id = "frt7-trusted-city-add-city";
            cityInput.type = "text";
            cityInput.placeholder = "City";
            cityInput.autocomplete = "off";
            cityInput.style.width = "100%";

            const stateInput = document.createElement("input");
            stateInput.id = "frt7-trusted-city-add-state";
            stateInput.type = "text";
            stateInput.placeholder = "ST";
            stateInput.maxLength = 2;
            stateInput.autocomplete = "off";
            stateInput.style.width = "100%";
            stateInput.addEventListener("input", () => {
                stateInput.value = String(stateInput.value || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2);
            });

            const addBtn = document.createElement("button");
            addBtn.type = "button";
            addBtn.textContent = "Add";
            addBtn.style.cursor = "pointer";

            const runAdd = async () => {
                const city = String(cityInput.value || "").trim();
                const state = String(stateInput.value || "").trim().toUpperCase();

                const result = await addManualTrustedCity(city, state);
                if (!result.ok) {
                    alert(result.reason || "Could not add trusted city.");
                    return;
                }

                cityInput.value = "";
                stateInput.value = "";
                refreshSettingsListsFromStorage(true);
            };

            addBtn.addEventListener("click", runAdd);
            cityInput.addEventListener("keydown", event => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    runAdd();
                }
            });
            stateInput.addEventListener("keydown", event => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    runAdd();
                }
            });

            addRow.appendChild(cityInput);
            addRow.appendChild(stateInput);
            addRow.appendChild(addBtn);

            container.parentElement?.insertBefore(addRow, container);
        }

        const citySearch = String(document.getElementById("frt7-city-search")?.value || "").trim().toLowerCase();
        const entries = Object.entries(learnedCitiesCache)
            .filter(([, entry]) => entry && entry.deleted !== true && entry.city)
            .filter(([, entry]) => {
                if (!citySearch) return true;
                const city = String(entry.city || "").toLowerCase();
                const state = String(entry.state || "").trim().toLowerCase();
                const display = state ? `${city}, ${state}` : city;
                return city.includes(citySearch) || state.includes(citySearch) || display.includes(citySearch);
            })
            .sort(([, a], [, b]) =>
                String(a.city || "").localeCompare(String(b.city || ""), undefined, { sensitivity: "base" }) ||
                String(a.state || "").localeCompare(String(b.state || ""), undefined, { sensitivity: "base" })
            );

        if (!entries.length) {
            const empty = document.createElement("div");
            empty.textContent = citySearch ? "No matching cities." : "No trusted cities yet.";
            empty.style.opacity = "0.7";
            container.appendChild(empty);
            return;
        }

        for (const [key, entry] of entries) {
            const row = document.createElement("div");
            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.justifyContent = "space-between";
            row.style.gap = "8px";
            row.style.padding = "3px 0";

            const label = document.createElement("span");
            const state = String(entry.state || "").trim().toUpperCase();
            label.textContent = state ? `${entry.city}, ${state}` : String(entry.city || "");

            const removeBtn = document.createElement("button");
            removeBtn.type = "button";
            removeBtn.textContent = "×";
            removeBtn.title = `Remove trusted city ${label.textContent}`;
            removeBtn.style.cursor = "pointer";
            removeBtn.style.flex = "0 0 auto";

            let removalHandled = false;
            const removeNow = event => {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();

                if (removalHandled) return;
                removalHandled = true;

                // v60: Match the WORKING rejected-name X exactly in spirit.
                // Perform the city database mutation DIRECTLY from the X press,
                // in capture phase, so the movable Settings panel cannot intercept
                // the pointer/mouse event before deletion runs.
                try {
                    const exactKey = Object.prototype.hasOwnProperty.call(learnedCitiesCache, key)
                        ? key
                        : learnedCityStateKey(entry.city, entry.state);
                    if (!exactKey) throw new Error("Could not resolve learned city/state pair key.");

                    learnedCitiesCache[exactKey] = {
                        ...(learnedCitiesCache[exactKey] || entry || {}),
                        city: String(entry.city || "").trim(),
                        state: String(entry.state || "").trim().toUpperCase(),
                        deleted: true,
                        deletedAt: Date.now()
                    };

                    GM_setValue(LEARNED_CITIES_SINGLE_DB_KEY, JSON.stringify(learnedCitiesCache));

                    const verify = parseLearnedCitiesStore(
                        GM_getValue(LEARNED_CITIES_SINGLE_DB_KEY)
                    );
                    if (verify[exactKey]?.deleted !== true) {
                        removalHandled = false;
                        throw new Error(`Direct X write verification failed for ${label.textContent}.`);
                    }
                    queueExplicitSyncDeletion('learnedCities', exactKey);

                    learnedCitiesCache = verify;
                    console.info(`Toolbar trusted cities v60: ${label.textContent} = DELETED (direct X verified).`);
                    refreshSettingsListsFromStorage(true);
                } catch (error) {
                    console.error("Toolbar trusted city direct-X removal failed:", error);
                    renderLearnedCitiesSettings();
                    alert(`Could not remove ${label.textContent}.`);
                }
            };

            // Same event strategy as the working rejected-name X.
            removeBtn.addEventListener("pointerdown", removeNow, true);
            removeBtn.addEventListener("mousedown", event => {
                event.stopPropagation();
            }, true);
            removeBtn.addEventListener("click", removeNow, true);

            row.appendChild(label);
            row.appendChild(removeBtn);
            container.appendChild(row);
        }
    }

// v94 UI-only list search. These inputs filter visible rows only; they do not
// modify the learned-city or rejected-name databases.
settingsPanel.querySelector("#frt7-city-search")?.addEventListener("input", () => {
    renderLearnedCitiesSettings();
});
settingsPanel.querySelector("#frt7-us-city-db-search")?.addEventListener("input", () => { renderUsCityDatabaseSettings(); });
settingsPanel.querySelector("#frt7-us-city-db-add-state")?.addEventListener("input", event => { event.target.value = String(event.target.value || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0,2); });
settingsPanel.querySelector("#frt7-us-city-db-add")?.addEventListener("click", () => {
    const city = settingsPanel.querySelector("#frt7-us-city-db-add-city")?.value || "";
    const state = settingsPanel.querySelector("#frt7-us-city-db-add-state")?.value || "";
    if (!addUsCityOverride(city, state)) { alert("Enter a City and 2-letter State."); return; }
    settingsPanel.querySelector("#frt7-us-city-db-add-city").value = "";
    settingsPanel.querySelector("#frt7-us-city-db-add-state").value = "";
});
settingsPanel.querySelector("#frt7-us-city-db-refresh")?.addEventListener("click", () => {
    GM_setValue(US_CITY_DB_CACHE_KEY, "[]"); usCityDbLoaded = false; usCityDbRows = []; usCityDbPairSet = new Set(); fetchUsCityDatabase();
});
settingsPanel.querySelector("#frt7-name-search")?.addEventListener("input", () => {
    renderRejectedAutoNamesSettings();
});

function updateRejectedNameDiagnostic(message = "") {
    const box = settingsPanel?.querySelector?.("#frt7-rejected-debug-status");
    if (!box) return;
    const raw = GM_getValue(REJECTED_AUTO_NAMES_SINGLE_DB_KEY);
    const db = parseRejectedNameStoreObject(raw);
    const entries = Object.values(db || {});
    const active = entries.filter(e => e && e.name && e.deleted !== true).length;
    const deleted = entries.filter(e => e && e.deleted === true).length;
    const adrian = db[normalizeRejectedName("Adrian")];
    const adriana = db[normalizeRejectedName("Adriana")];
    const state = e => !e ? "MISSING" : (e.deleted === true ? "DELETED" : "ACTIVE");
    box.textContent = `BUILD v26 | DB active=${active}, deleted=${deleted} | ADRIAN=${state(adrian)} | ADRIANA=${state(adriana)}${message ? " | " + message : ""}`;
}


function renderSafeFirstNamesSettings() {
    const list = settingsPanel.querySelector("#frt7-safe-first-names-list");
    if (!list) return;

    list.textContent = "";
    const entries = Object.entries(safeFirstNamesCache)
        .filter(([, entry]) => entry?.name)
        .sort((a, b) => String(a[1].name).localeCompare(String(b[1].name), undefined, { sensitivity: "base" }));

    if (!entries.length) {
        const empty = document.createElement("div");
        empty.style.color = "#777";
        empty.textContent = "No safe multi-word first names yet.";
        list.appendChild(empty);
        return;
    }

    for (const [key, entry] of entries) {
        const row = document.createElement("div");
        row.style.cssText = "display:flex;align-items:center;gap:5px;margin:2px 0;";

        const label = document.createElement("span");
        label.style.cssText = "flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;";
        label.textContent = entry.name;

        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "×";
        remove.title = `Remove safe first name ${entry.name}`;
        remove.style.cssText = "padding:0 4px;cursor:pointer;";
        remove.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            const ok = removeSafeFirstName(key);
            const status = settingsPanel.querySelector("#frt7-safe-first-name-status");
            if (status) {
                status.textContent = ok ? `Removed ${entry.name}.` : `Could not remove ${entry.name}.`;
                status.style.color = ok ? "#187000" : "#b00020";
            }
        });

        row.append(label, remove);
        list.appendChild(row);
    }
}

function addSafeFirstNameFromSettings() {
    const input = settingsPanel.querySelector("#frt7-add-safe-first-name-input");
    const status = settingsPanel.querySelector("#frt7-safe-first-name-status");
    const value = String(input?.value || "").trim();

    const result = addSafeFirstName(value, "settings");
    if (!result.ok) {
        if (status) {
            status.textContent = result.reason || "Could not save safe first name.";
            status.style.color = "#b00020";
        }
        input?.focus();
        return;
    }

    if (status) {
        status.textContent = `Saved ${result.entry.name}.`;
        status.style.color = "#187000";
    }
    if (input) input.value = "";
    renderSafeFirstNamesSettings();
}

settingsPanel.querySelector("#frt7-add-safe-first-name")?.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    addSafeFirstNameFromSettings();
});

settingsPanel.querySelector("#frt7-add-safe-first-name-input")?.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    event.stopPropagation();
    addSafeFirstNameFromSettings();
});

settingsPanel.querySelector("#frt7-clear-safe-first-names")?.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    clearSafeFirstNames();
    const status = settingsPanel.querySelector("#frt7-safe-first-name-status");
    if (status) {
        status.textContent = "Safe first-name list cleared.";
        status.style.color = "#187000";
    }
});


function renderMacLastNamesSettings() {
    const list = settingsPanel.querySelector("#frt7-mac-last-names-list");
    if (!list) return;
    list.textContent = "";

    const db = readLearnedMacLastNameCases();
    const entries = Object.entries(db)
        .filter(([, entry]) => entry?.name)
        .sort((a, b) => String(a[1].name).localeCompare(String(b[1].name), undefined, { sensitivity: "base" }));

    if (!entries.length) {
        const empty = document.createElement("div");
        empty.style.color = "#777";
        empty.textContent = "No learned Mac last names yet.";
        list.appendChild(empty);
        return;
    }

    for (const [key, entry] of entries) {
        const row = document.createElement("div");
        row.style.cssText = "display:flex;align-items:center;gap:5px;margin:2px 0;";

        const label = document.createElement("span");
        label.style.cssText = "flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;";
        label.textContent = entry.name;

        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "×";
        remove.title = `Remove learned capitalization ${entry.name}`;
        remove.style.cssText = "padding:0 4px;cursor:pointer;";
        remove.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            const dbNow = readLearnedMacLastNameCases();
            delete dbNow[key];
            writeLearnedMacLastNameCases(dbNow);
            renderMacLastNamesSettings();
        });

        row.append(label, remove);
        list.appendChild(row);
    }
}

settingsPanel.querySelector("#frt7-clear-mac-last-names")?.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    writeLearnedMacLastNameCases({});
    renderMacLastNamesSettings();
    const status = settingsPanel.querySelector("#frt7-mac-last-name-status");
    if (status) {
        status.textContent = "Learned Mac last-name list cleared.";
        status.style.color = "#187000";
    }
});

renderMacLastNamesSettings();

function renderRejectedAutoNamesSettings() {
    const list = settingsPanel.querySelector("#frt7-rejected-names-list");
    if (!list) return;

    list.textContent = "";

    const nameSearch = String(settingsPanel.querySelector("#frt7-name-search")?.value || "").trim().toLowerCase();
    const entries = Object.entries(rejectedAutoNamesCache)
        .filter(([, entry]) => entry && entry.name && entry.deleted !== true)
        .filter(([, entry]) => !nameSearch || String(entry.name || "").toLowerCase().includes(nameSearch))
        .sort((a, b) => a[1].name.localeCompare(b[1].name));

    if (!entries.length) {
        const empty = document.createElement("div");
        empty.style.color = "#777";
        empty.textContent = nameSearch ? "No matching names." : "No rejected names learned yet.";
        list.appendChild(empty);
        return;
    }

    for (const [key, entry] of entries) {
        const row = document.createElement("div");
        row.style.cssText = "display:flex;align-items:center;gap:4px;margin:2px 0;";

        const label = document.createElement("span");
        label.style.cssText = "flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;";
        label.textContent = String(entry.name);

        if (entry.manual === true) {
            const manual = document.createElement("span");
            manual.style.cssText = "color:#777;font-size:10px;";
            const mode = getRejectedBlockMode(entry);
            manual.textContent = mode === "word" ? " (word block)" : " (exact)";
            label.appendChild(manual);
        }

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.title = "Forget this rejected name";
        removeButton.style.cssText = "padding:0 4px;";
        removeButton.textContent = "×";

        let removalHandled = false;
        const removeNow = event => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            if (removalHandled) return;
            removalHandled = true;

            // v26: the X button performs the database mutation DIRECTLY.
            // Do not hide the row first and do not delegate to another helper.
            // The row is removed only after the exact v24 single-DB record has
            // been marked deleted, saved, and read back successfully.
            try {
                const normalized = normalizeRejectedName(entry.name) || normalizeRejectedName(key);
                if (!normalized) throw new Error("Could not normalize rejected-name key.");

                rejectedAutoNamesCache[normalized] = {
                    ...(rejectedAutoNamesCache[normalized] || entry || {}),
                    name: String(entry.name || key || normalized).trim(),
                    deleted: true,
                    deletedAt: Date.now()
                };
                pendingAutoNameLearning = null;

                GM_setValue(REJECTED_AUTO_NAMES_SINGLE_DB_KEY, JSON.stringify(rejectedAutoNamesCache));

                const verify = parseRejectedNameStoreObject(
                    GM_getValue(REJECTED_AUTO_NAMES_SINGLE_DB_KEY)
                );
                if (verify[normalized]?.deleted !== true) {
                    removalHandled = false;
                    updateRejectedNameDiagnostic(`${entry.name} DELETE FAILED - DB still active`);
                    throw new Error(`Direct X write verification failed for ${entry.name}.`);
                }

                queueExplicitSyncDeletion('rejectedNames', normalized);
                rejectedAutoNamesCache = verify;
                window.__frt7_rejected_last_diag = `${entry.name} = DELETED (direct X verified)`;
                updateRejectedNameDiagnostic(window.__frt7_rejected_last_diag);
                renderRejectedAutoNamesSettings();
            } catch (error) {
                console.error("Toolbar rejected name direct-X removal failed:", error);
                updateRejectedNameDiagnostic(`${entry.name} DELETE ERROR: ${error?.message || error}`);
                // Keep/rebuild the row if persistence failed, so the UI can never
                // falsely imply that a name was deleted when the DB still says active.
                renderRejectedAutoNamesSettings();
            }
        };

        // Capture phase prevents the movable Settings window from intercepting
        // the X press before this button processes it.
        removeButton.addEventListener("pointerdown", removeNow, true);
        removeButton.addEventListener("mousedown", event => {
            event.stopPropagation();
        }, true);
        removeButton.addEventListener("click", removeNow, true);

        row.append(label, removeButton);
        list.appendChild(row);
    }
    updateRejectedNameDiagnostic("loaded/rendered");
}

settingsPanel.addEventListener("click", async event => {
    const target = event.target instanceof Element ? event.target : null;
    const cityButton = target?.closest("[data-forget-city]");
    if (!cityButton) return;

    event.preventDefault();
    event.stopPropagation();

    if (typeof discardPendingCityLearning === "function") {
        discardPendingCityLearning();
    }
    cityButton.disabled = true;
    await forgetLearnedCity(
        decodeURIComponent(cityButton.dataset.forgetCity)
    );
});

settingsPanel.querySelector("#frt7-clear-learned-cities")?.addEventListener("click", async event => {
    event.preventDefault();
    event.stopPropagation();

    if (typeof discardPendingCityLearning === "function") {
        discardPendingCityLearning();
    }

    const button = event.currentTarget;
    if (button) button.disabled = true;
    await clearLearnedCities();
    if (button) button.disabled = false;
});

const addRejectedNameFromSettings = () => {
    const input = settingsPanel.querySelector("#frt7-add-rejected-name-input");
    const status = settingsPanel.querySelector("#frt7-rejected-name-save-status");
    const value = String(input?.value || "").trim();

    if (!value) {
        if (status) {
            status.textContent = "Type a word or phrase first.";
            status.style.color = "#b00020";
        }
        input?.focus();
        return;
    }

    try {
        const result = addManualRejectedName(value);
        if (!result) throw new Error("Rejected name was empty.");

        // Rebuild immediately from the now-updated cache.
        renderRejectedAutoNamesSettings();

        if (input) {
            input.value = "";
            input.focus();
        }
        if (status) {
            status.textContent = `Saved: ${value}`;
            status.style.color = "#16821b";
        }

        const list = settingsPanel.querySelector("#frt7-rejected-names-list");
        if (list) list.scrollTop = 0;
    } catch (error) {
        console.error("Toolbar rejected name save failed:", error);
        if (status) {
            status.textContent = "Save failed.";
            status.style.color = "#b00020";
        }
    }
};

settingsPanel.querySelector("#frt7-add-rejected-name")?.addEventListener("click", async event => {
    event.preventDefault();
    event.stopPropagation();
    addRejectedNameFromSettings();
});

settingsPanel.querySelector("#frt7-add-rejected-name-input")?.addEventListener("keydown", async event => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    event.stopPropagation();
    addRejectedNameFromSettings();
});

settingsPanel.querySelector("#frt7-clear-rejected-names")?.addEventListener("click", async event => {
    event.preventDefault();
    event.stopPropagation();

    const button = event.currentTarget;
    if (button) button.disabled = true;
    clearRejectedAutoNames();
    if (button) button.disabled = false;
});

// v61: portable backup / transfer of learned data + toolbar preferences.
function getTransferStatusElement() {
    return settingsPanel.querySelector("#frt7-transfer-status");
}

function setTransferStatus(message, ok = true) {
    const status = getTransferStatusElement();
    if (!status) return;
    status.textContent = message;
    status.style.color = ok ? "#16821b" : "#b00020";
}

async function buildToolbarBackup() {
    await Promise.all([learnedCitiesReady, rejectedAutoNamesReady]);
    loadSafeFirstNames();

    const preferenceKeys = [
        COLLAPSE_KEY,
        AUTO_KEY,
        AUTO_FIELDS_KEY,
        REVERT_FIELDS_KEY,
        AUTO_SOUND_ENABLED_KEY,
        AUTO_SOUND_TYPE_KEY,
        AUTO_SOUND_VOLUME_KEY,
        AUTO_SOUND_DURATION_KEY,
        AUTO_SOUND_TRIGGERS_KEY,
        "frt7SettingsPanelPos",
        "frt7DarkMode",
        "frt7FontColor",
        "frt7BgColor"
    ];
    const preferences = {};
    for (const key of preferenceKeys) {
        const value = GM_getValue(key);
        if (value !== undefined) preferences[key] = value;
    }

    return {
        format: "ContactInfoToolbarBackup",
        backupVersion: 1,
        createdAt: new Date().toISOString(),
        sourceBuild: FRT7_BUILD_ID,
        data: {
            rejectedNames: parseRejectedNameStoreObject(GM_getValue(REJECTED_AUTO_NAMES_SINGLE_DB_KEY)),
            learnedCities: parseLearnedCitiesStore(GM_getValue(LEARNED_CITIES_SINGLE_DB_KEY)),
            usCityDatabaseOverrides: parseJsonObject(GM_getValue(US_CITY_DB_OVERRIDES_KEY, "{}")),
            // v203: Export the actual persisted Custom Area Codes database.
            // Reading the GM value directly guarantees the backup contains every
            // saved area code even if the settings UI cache has not been refreshed.
            customAreaCodes: parseJsonObject(GM_getValue(CUSTOM_AREA_CODES_KEY, "{}")),
            safeFirstNames: parseSafeFirstNamesStore(GM_getValue(SAFE_FIRST_NAMES_KEY)),
            macLastNameCases: readLearnedMacLastNameCases(),
            preferences
        }
    };
}

async function exportToolbarBackup() {
    let downloadTriggered = false;
    let url = null;

    try {
        const backup = await buildToolbarBackup();
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
        url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        const datePart = new Date().toISOString().slice(0, 10);
        anchor.href = url;
        anchor.download = `Contact_Info_Toolbar_Backup_${datePart}.json`;
        document.body.appendChild(anchor);
        anchor.click();
        downloadTriggered = true;

        // v95: Once the browser has accepted the download click, the export itself
        // succeeded. Cleanup/status work must never turn that into a false red error.
        try { anchor.remove(); } catch (_) {}
        try { setTimeout(() => URL.revokeObjectURL(url), 1000); } catch (_) {}
        try { setTransferStatus("Backup exported successfully.", true); } catch (_) {}
    } catch (error) {
        console.error("Toolbar backup export failed:", error);

        // v95 FALSE-FAILURE FIX: if the JSON download was already triggered, do not
        // overwrite the success message just because later cleanup/status code failed.
        if (downloadTriggered) {
            try { setTransferStatus("Backup exported successfully.", true); } catch (_) {}
            return;
        }

        try {
            setTransferStatus("Export failed before the backup could be downloaded.", false);
        } catch (_) {}
    }
}

function mergeTransferDatabase(current, incoming) {
    const a = current && typeof current === "object" ? current : {};
    const b = incoming && typeof incoming === "object" ? incoming : {};
    return { ...a, ...b };
}


// v85 COWORKER MERGE:
// Add active shared list entries without replacing this user's existing records.
// Local records always win, especially deletion tombstones. Incoming deleted
// records are ignored because Merge is intentionally additive, not a sync/delete.
function mergeSharedActiveRecords(current, incoming) {
    const existing = current && typeof current === "object" ? current : {};
    const shared = incoming && typeof incoming === "object" ? incoming : {};
    const merged = { ...existing };
    let added = 0;
    let kept = 0;
    let skippedDeleted = 0;

    for (const [key, entry] of Object.entries(shared)) {
        if (!entry || typeof entry !== "object") continue;
        if (entry.deleted === true) {
            skippedDeleted++;
            continue;
        }
        if (Object.prototype.hasOwnProperty.call(merged, key)) {
            kept++;
            continue;
        }
        merged[key] = { ...entry };
        added++;
    }

    return { merged, added, kept, skippedDeleted };
}

async function mergeToolbarBackupFile(file) {
    if (!file) return;
    try {
        const rawText = await file.text();
        const backup = JSON.parse(rawText);
        if (!backup || backup.format !== "ContactInfoToolbarBackup" || !backup.data) {
            throw new Error("This is not a Contact Info Toolbar backup file.");
        }

        await Promise.all([learnedCitiesReady, rejectedAutoNamesReady]);
        loadSafeFirstNames();

        const importedRejected = parseRejectedNameStoreObject(backup.data.rejectedNames);
        const importedCities = parseLearnedCitiesStore(backup.data.learnedCities);
        const importedUsCityOverrides = parseJsonObject(backup.data.usCityDatabaseOverrides);
        const importedCustomAreas = backup.data.customAreaCodes && typeof backup.data.customAreaCodes === "object" ? backup.data.customAreaCodes : {};
        const importedSafeFirst = parseSafeFirstNamesStore(backup.data.safeFirstNames);
        const importedMacLastNames = backup.data.macLastNameCases && typeof backup.data.macLastNameCases === "object" ? backup.data.macLastNameCases : {};

        const rejectedResult = mergeSharedActiveRecords(rejectedAutoNamesCache, importedRejected);
        const cityResult = mergeSharedActiveRecords(learnedCitiesCache, importedCities);
        const usCityOverrideResult = mergeSharedActiveRecords(usCityDbOverrides, importedUsCityOverrides);
        const safeResult = mergeSharedActiveRecords(safeFirstNamesCache, importedSafeFirst);
        const macLastResult = mergeSharedActiveRecords(readLearnedMacLastNameCases(), importedMacLastNames);
        const customAreaResult = mergeSharedActiveRecords(customAreaCodesCache, importedCustomAreas);

        rejectedAutoNamesCache = rejectedResult.merged;
        learnedCitiesCache = cityResult.merged;
        usCityDbOverrides = usCityOverrideResult.merged;
        saveUsCityOverrides();
        safeFirstNamesCache = safeResult.merged;
        customAreaCodesCache = customAreaResult.merged;

        saveRejectedAutoNames();
        await saveLearnedCities();
        saveSafeFirstNames();
        writeLearnedMacLastNameCases(macLastResult.merged);
        saveCustomAreaCodes();

        renderRejectedAutoNamesSettings();
        renderLearnedCitiesSettings();
        renderUsCityDatabaseSettings();
        renderCustomAreaCodesSettings();
        renderSafeFirstNamesSettings();
        renderMacLastNamesSettings();

        const totalAdded = rejectedResult.added + cityResult.added + usCityOverrideResult.added + safeResult.added + macLastResult.added + customAreaResult.added;
        setTransferStatus(
            `Merge complete: added ${totalAdded} shared entries ` +
            `(${rejectedResult.added} rejected names, ${cityResult.added} cities, ${safeResult.added} safe names, ${macLastResult.added} Mac last names, ${customAreaResult.added} area codes). ` +
            `Your existing entries, deletions, and toolbar preferences were preserved.`,
            true
        );
    } catch (error) {
        console.error("Toolbar backup merge failed:", error);
        setTransferStatus(`Merge failed: ${error?.message || "invalid backup file"}. Nothing was changed.`, false);
    }
}

async function importToolbarBackupFile(file) {
    if (!file) return;
    try {
        const text = await file.text();
        const backup = JSON.parse(text);
        if (!backup || backup.format !== "ContactInfoToolbarBackup" || !backup.data) {
            throw new Error("This is not a Contact Info Toolbar backup file.");
        }

        await Promise.all([learnedCitiesReady, rejectedAutoNamesReady]);
        loadSafeFirstNames();

        const importedRejected = parseRejectedNameStoreObject(backup.data.rejectedNames);
        const importedCities = parseLearnedCitiesStore(backup.data.learnedCities);
        const importedUsCityOverrides = parseJsonObject(backup.data.usCityDatabaseOverrides);
        const importedCustomAreas = backup.data.customAreaCodes && typeof backup.data.customAreaCodes === "object" ? backup.data.customAreaCodes : {};
        const importedSafeFirst = parseSafeFirstNamesStore(backup.data.safeFirstNames);
        const importedMacLastNames = backup.data.macLastNameCases && typeof backup.data.macLastNameCases === "object" ? backup.data.macLastNameCases : {};

        rejectedAutoNamesCache = mergeTransferDatabase(rejectedAutoNamesCache, importedRejected);
        learnedCitiesCache = mergeTransferDatabase(learnedCitiesCache, importedCities);
        safeFirstNamesCache = mergeTransferDatabase(safeFirstNamesCache, importedSafeFirst);
        const importedMacMerged = mergeTransferDatabase(readLearnedMacLastNameCases(), importedMacLastNames);
        customAreaCodesCache = mergeTransferDatabase(customAreaCodesCache, importedCustomAreas);

        saveRejectedAutoNames();
        await saveLearnedCities();
        saveSafeFirstNames();
        writeLearnedMacLastNameCases(importedMacMerged);

        // v203: The old Import path merged Custom Area Codes into memory but
        // never wrote them back to GM storage. Persist them now so imported
        // area codes survive reload and are available to the Area button.
        saveCustomAreaCodes();

        const prefs = backup.data.preferences;
        if (prefs && typeof prefs === "object") {
            for (const [key, value] of Object.entries(prefs)) {
                if (value !== undefined) GM_setValue(key, value);
            }
        }

        renderRejectedAutoNamesSettings();
        renderLearnedCitiesSettings();
        renderCustomAreaCodesSettings();
        renderSafeFirstNamesSettings();
        renderMacLastNamesSettings();
        setTransferStatus("Backup imported. Saved names/cities and custom area codes were merged successfully. Reload this page to apply imported toolbar preferences.", true);
    } catch (error) {
        console.error("Toolbar backup import failed:", error);
        setTransferStatus(`Import failed: ${error?.message || "invalid backup file"}`, false);
    }
}

settingsPanel.querySelector("#frt7-export-settings")?.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    exportToolbarBackup();
});

settingsPanel.querySelector("#frt7-import-settings")?.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    settingsPanel.querySelector("#frt7-import-settings-file")?.click();
});

settingsPanel.querySelector("#frt7-import-settings-file")?.addEventListener("change", async event => {
    event.stopPropagation();
    const input = event.currentTarget;
    const file = input?.files?.[0];
    await importToolbarBackupFile(file);
    if (input) input.value = "";
});

settingsPanel.querySelector("#frt7-merge-settings")?.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    settingsPanel.querySelector("#frt7-merge-settings-file")?.click();
});

settingsPanel.querySelector("#frt7-merge-settings-file")?.addEventListener("change", async event => {
    event.stopPropagation();
    const input = event.currentTarget;
    const file = input?.files?.[0];
    await mergeToolbarBackupFile(file);
    if (input) input.value = "";
});


// v137: Learn capitalization ONLY from a real human edit to the Last Name field.
// Auto-filled/programmatic changes have isTrusted=false and are ignored.
document.addEventListener("change", event => {
    const target = event.target;
    if (!event.isTrusted || !(target instanceof HTMLInputElement)) return;
    if (!target.matches("#txtLastNameDataEntry, #txtLastName")) return;

    const beforeDb = JSON.stringify(readLearnedMacLastNameCases());
    const changed = learnManualMacLastNameCase(target.value);
    if (!changed) return;

    const afterDb = JSON.stringify(readLearnedMacLastNameCases());
    if (beforeDb !== afterDb) {
        try { renderMacLastNamesSettings(); } catch (_) {}
        const status = settingsPanel?.querySelector?.("#frt7-mac-last-name-status");
        if (status) {
            const firstWord = String(target.value || "").trim().split(/\s+/)[0] || "";
            const saved = /^Mac[A-ZÀ-ÖØ-Þ]/.test(firstWord);
            status.textContent = saved
                ? `Saved capitalization: ${String(target.value || "").trim()}`
                : `Removed saved capitalization for ${String(target.value || "").trim()}.`;
            status.style.color = "#187000";
        }
    }
});

learnedCitiesReady.then(renderLearnedCitiesSettings);
rejectedAutoNamesReady.then(() => { renderRejectedAutoNamesSettings(); updateRejectedNameDiagnostic("page load complete"); });

const discardPendingAutoNameLearning = () => {
    pendingAutoNameLearning = null;
};

const commitPendingAutoNameLearning = async () => {
    const pending = pendingAutoNameLearning;
    pendingAutoNameLearning = null;
    if (!pending?.proposed || !pending?.original) return false;

    const firstInput =
        document.querySelector("#txtFirstNameDataEntry") ||
        document.querySelector("#txtFirstName");
    const lastInput =
        document.querySelector("#txtLastNameDataEntry") ||
        document.querySelector("#txtLastName");

    const finalName = {
        first: String(firstInput?.value || "").trim(),
        last: String(lastInput?.value || "").trim()
    };

    const proposedKey = normalizeRejectedName(
        `${pending.proposed.first} ${pending.proposed.last}`
    );
    const originalKey = normalizeRejectedName(
        `${pending.original.first} ${pending.original.last}`
    );
    const finalKey = normalizeRejectedName(
        `${finalName.first} ${finalName.last}`
    );

    if (!proposedKey || proposedKey === originalKey) return false;
    if (!finalKey || finalKey === proposedKey) return false;

    return learnRejectedAutoName(pending.proposed);
};

document.addEventListener("click", event => {
    const control = event.target instanceof Element
        ? event.target.closest("button, input[type='button'], input[type='submit'], a")
        : null;
    if (!control) return;

    const rawLabel = control.tagName === "INPUT"
        ? control.value
        : control.textContent;
    const label = String(rawLabel || "")
        .replace(/\s+/g, " ")
        .trim()
        .toUpperCase();

    const throwawayAction =
        label === "NG TECH" ||
        label === "NOT IN U.S." ||
        label === "NOT IN US" ||
        label === "FORMAT ISSUE";

    if (throwawayAction) {
        discardPendingAutoNameLearning();
        return;
    }

    const acceptedAction =
        label === "SAVE" ||
        label === "NEXT" ||
        label === "NEXT ->" ||
        label === "NON-SALES" ||
        label === "NON SALES" ||
        label === "PRIOR SALES";

    if (acceptedAction) {
        commitPendingAutoNameLearning().catch(error => {
            console.error("Toolbar NAME LEARNING COMMIT:", error);
        });
    }
}, true);


        const autoBtn = document.getElementById("frt7-auto-btn");
        const nameBtn = document.getElementById("frt7-name-btn");
        const emailBtn = document.getElementById("frt7-email-btn");
        const phoneBtn = document.getElementById("frt7-phone-btn");
        const locBtn = document.getElementById("frt7-location-btn");
		const locCityStateBtn = document.getElementById("frt7-citystate-btn");
        const cityBtn = document.getElementById("frt7-city-btn");
		const cityOnlyBtn = document.getElementById("frt7-cityonly-btn");
const revertNameBtn = document.getElementById("frt7-revert-name-btn");
const revertEmailBtn = document.getElementById("frt7-revert-email-btn");
const collapseDivider = document.getElementById("frt7-collapse-divider");
const pinBtn  = document.getElementById("frt7-pin-btn");
const settingsBtn = document.getElementById("frt7-settings-btn");

let settingsCollapsed = false;

browser.storage.local.get(COLLAPSE_KEY).then(res => {
    if (res[COLLAPSE_KEY]) {
        settingsCollapsed = true;

        settingsBtn.style.display = "none";
        pinBtn.style.display = "none";
        collapseDivider.style.height = "16px";
        collapseDivider.title = "Show settings";
    }
});
collapseDivider.addEventListener("click", e => {
    e.stopPropagation();

    settingsCollapsed = !settingsCollapsed;

    settingsBtn.style.display = settingsCollapsed ? "none" : "";
    pinBtn.style.display      = settingsCollapsed ? "none" : "";

    collapseDivider.style.height = settingsCollapsed ? "16px" : "28px";

    collapseDivider.title = settingsCollapsed
        ? "Show settings"
        : "Hide settings";

    // ⭐ SAVE collapsed state
    browser.storage.local.set({ [COLLAPSE_KEY]: settingsCollapsed });
});


settingsBtn.addEventListener("click", e => {
    e.stopPropagation();
    const opening = settingsPanel.style.display === "none";
    settingsPanel.style.display = opening ? "block" : "none";
    if (opening) {
        renderLearnedCitiesSettings();
        renderCustomAreaCodesSettings();
        renderSafeFirstNamesSettings();
        renderRejectedAutoNamesSettings();
        requestAnimationFrame(keepSettingsInViewport);
    }
});
const bar = document.getElementById("floating-resume-toolbar-v7");

document.getElementById("frt7-dark-toggle")
    ?.addEventListener("change", e => {
        const isDark = e.target.checked;

        bar.classList.toggle("frt7-dark", isDark);
        settingsPanel.classList.toggle("dark", isDark);
    });

document.getElementById("frt7-font-color")
    ?.addEventListener("input", e => {
        bar.style.setProperty("--frt-font-color", e.target.value);
    });

document.getElementById("frt7-bg-color")
    ?.addEventListener("input", e => {
        bar.style.setProperty("--frt-bg-color", e.target.value);
    });

document.getElementById("frt7-reset-font")
    ?.addEventListener("click", () => {
        bar.style.setProperty("--frt-font-color", "#000000");
    });

document.getElementById("frt7-reset-bg")
    ?.addEventListener("click", () => {
        bar.style.setProperty("--frt-bg-color", "#ffffff");
    });


        const revertFieldInputs = {
            name: document.getElementById("frt7-revert-name"),
            email: document.getElementById("frt7-revert-email"),
            phone: document.getElementById("frt7-revert-phone"),
            city: document.getElementById("frt7-revert-city"),
            state: document.getElementById("frt7-revert-state"),
            zip: document.getElementById("frt7-revert-zip")
        };

        async function getRevertFields() {
            const result = await browser.storage.local.get(REVERT_FIELDS_KEY);
            return { ...DEFAULT_REVERT_FIELDS, ...(result[REVERT_FIELDS_KEY] || {}) };
        }

        async function saveRevertFieldsFromSettings() {
            const fields = {
                name: Boolean(revertFieldInputs.name?.checked),
                email: Boolean(revertFieldInputs.email?.checked),
                phone: Boolean(revertFieldInputs.phone?.checked),
                city: Boolean(revertFieldInputs.city?.checked),
                state: Boolean(revertFieldInputs.state?.checked),
                zip: Boolean(revertFieldInputs.zip?.checked)
            };
            await browser.storage.local.set({ [REVERT_FIELDS_KEY]: fields });
        }

        getRevertFields().then(fields => {
            Object.entries(revertFieldInputs).forEach(([key, input]) => {
                if (!input) return;
                input.checked = Boolean(fields[key]);
                input.addEventListener("change", saveRevertFieldsFromSettings);
            });
        });

        const autoFieldInputs = {
            name: document.getElementById("frt7-auto-name"),
            email: document.getElementById("frt7-auto-email"),
            phone: document.getElementById("frt7-auto-phone"),
            city: document.getElementById("frt7-auto-city"),
            state: document.getElementById("frt7-auto-state"),
            zipLookup: document.getElementById("frt7-auto-ziplookup")
        };

        function autoFieldsAreAllOff(fields) {
            return Object.keys(DEFAULT_AUTO_FIELDS).every(key => !Boolean(fields?.[key]));
        }

        function showAutoFieldsAllOffWarning(restoredFields) {
            if (window.__frt7_auto_fields_all_off_warning_shown) return;
            window.__frt7_auto_fields_all_off_warning_shown = true;

            const restoredNames = Object.entries(restoredFields || {})
                .filter(([, enabled]) => Boolean(enabled))
                .map(([key]) => key === "zipLookup" ? "ZIP Lookup" : key.charAt(0).toUpperCase() + key.slice(1));

            const restoredText = restoredNames.length ? restoredNames.join(", ") : "the default Auto settings";
            setTimeout(() => {
                alert(
                    "Contact Info Toolbar warning:\n\n" +
                    "Auto is ON, but every individual Auto field was found turned OFF. " +
                    "That is usually accidental, so the toolbar restored your last known Auto settings.\n\n" +
                    "Restored: " + restoredText
                );
            }, 0);
        }

        async function getAutoFields() {
            const result = await browser.storage.local.get([AUTO_KEY, AUTO_FIELDS_KEY, AUTO_FIELDS_LAST_GOOD_KEY]);
            const fields = { ...DEFAULT_AUTO_FIELDS, ...(result[AUTO_FIELDS_KEY] || {}) };
            const masterEnabled = Boolean(result[AUTO_KEY]);

            // v146 ALL-OFF GUARD:
            // If master Auto is ON but every individual Auto field suddenly becomes false,
            // treat it as suspicious rather than silently disabling the entire toolbar.
            // Restore the last non-empty field configuration; if none exists, use defaults.
            if (masterEnabled && autoFieldsAreAllOff(fields)) {
                const savedLastGood = { ...DEFAULT_AUTO_FIELDS, ...(result[AUTO_FIELDS_LAST_GOOD_KEY] || {}) };
                const restored = autoFieldsAreAllOff(savedLastGood) ? { ...DEFAULT_AUTO_FIELDS } : savedLastGood;

                await browser.storage.local.set({
                    [AUTO_FIELDS_KEY]: restored,
                    [AUTO_FIELDS_LAST_GOOD_KEY]: restored
                });

                console.warn("Toolbar AUTO v146: all individual Auto fields were OFF while master Auto was ON; restored last known good settings.", restored);
                showAutoFieldsAllOffWarning(restored);
                return restored;
            }

            // Remember every legitimate non-all-off configuration for recovery.
            if (!autoFieldsAreAllOff(fields)) {
                await browser.storage.local.set({ [AUTO_FIELDS_LAST_GOOD_KEY]: fields });
            }

            return fields;
        }

        async function saveAutoFieldsFromSettings() {
            const fields = {
                name: Boolean(autoFieldInputs.name?.checked),
                email: Boolean(autoFieldInputs.email?.checked),
                phone: Boolean(autoFieldInputs.phone?.checked),
                city: Boolean(autoFieldInputs.city?.checked),
                state: Boolean(autoFieldInputs.state?.checked),
                zipLookup: Boolean(autoFieldInputs.zipLookup?.checked)
            };

            const masterState = await browser.storage.local.get(AUTO_KEY);
            if (Boolean(masterState[AUTO_KEY]) && autoFieldsAreAllOff(fields)) {
                const stored = await browser.storage.local.get(AUTO_FIELDS_LAST_GOOD_KEY);
                const savedLastGood = { ...DEFAULT_AUTO_FIELDS, ...(stored[AUTO_FIELDS_LAST_GOOD_KEY] || {}) };
                const restored = autoFieldsAreAllOff(savedLastGood) ? { ...DEFAULT_AUTO_FIELDS } : savedLastGood;

                Object.entries(autoFieldInputs).forEach(([key, input]) => {
                    if (input) input.checked = Boolean(restored[key]);
                });
                await browser.storage.local.set({ [AUTO_FIELDS_KEY]: restored });
                showAutoFieldsAllOffWarning(restored);
                return;
            }

            await browser.storage.local.set({
                [AUTO_FIELDS_KEY]: fields,
                ...(autoFieldsAreAllOff(fields) ? {} : { [AUTO_FIELDS_LAST_GOOD_KEY]: fields })
            });
        }

        getAutoFields().then(fields => {
            Object.entries(autoFieldInputs).forEach(([key, input]) => {
                if (!input) return;
                input.checked = Boolean(fields[key]);
                input.addEventListener("change", saveAutoFieldsFromSettings);
            });
        });

        // v244 Auto-change sound settings.
        const autoSoundEnabledInput = document.getElementById("frt7-auto-sound-enabled");
        const autoSoundTypeInput = document.getElementById("frt7-auto-sound-type");
        const autoSoundVolumeInput = document.getElementById("frt7-auto-sound-volume");
        const autoSoundDurationInput = document.getElementById("frt7-auto-sound-duration");
        const autoSoundVolumeLabel = document.getElementById("frt7-auto-sound-volume-label");
        const autoSoundDurationLabel = document.getElementById("frt7-auto-sound-duration-label");
        const initialAutoSound = getAutoSoundSettings();
        const autoSoundTriggerInputs = {
            name: document.getElementById("frt7-auto-sound-trigger-name"),
            email: document.getElementById("frt7-auto-sound-trigger-email"),
            phone: document.getElementById("frt7-auto-sound-trigger-phone"),
            city: document.getElementById("frt7-auto-sound-trigger-city"),
            state: document.getElementById("frt7-auto-sound-trigger-state"),
            zip: document.getElementById("frt7-auto-sound-trigger-zip")
        };
        Object.entries(autoSoundTriggerInputs).forEach(([key, input]) => {
            if (!input) return;
            input.checked = initialAutoSound.triggers[key] !== false;
            input.addEventListener("change", () => {
                const triggers = {};
                Object.entries(autoSoundTriggerInputs).forEach(([field, box]) => { triggers[field] = Boolean(box?.checked); });
                GM_setValue(AUTO_SOUND_TRIGGERS_KEY, JSON.stringify(triggers));
            });
        });
        if (autoSoundEnabledInput) autoSoundEnabledInput.checked = initialAutoSound.enabled;
        if (autoSoundTypeInput) autoSoundTypeInput.value = initialAutoSound.type;
        if (autoSoundVolumeInput) autoSoundVolumeInput.value = String(initialAutoSound.volume);
        if (autoSoundDurationInput) autoSoundDurationInput.value = String(initialAutoSound.duration);
        if (autoSoundVolumeLabel) autoSoundVolumeLabel.textContent = `${initialAutoSound.volume}%`;
        if (autoSoundDurationLabel) autoSoundDurationLabel.textContent = `${initialAutoSound.duration}ms`;
        autoSoundEnabledInput?.addEventListener("change", () => GM_setValue(AUTO_SOUND_ENABLED_KEY, Boolean(autoSoundEnabledInput.checked)));
        autoSoundTypeInput?.addEventListener("change", () => GM_setValue(AUTO_SOUND_TYPE_KEY, String(autoSoundTypeInput.value || "chime")));
        autoSoundVolumeInput?.addEventListener("input", () => { if (autoSoundVolumeLabel) autoSoundVolumeLabel.textContent = `${autoSoundVolumeInput.value}%`; });
        autoSoundVolumeInput?.addEventListener("change", () => GM_setValue(AUTO_SOUND_VOLUME_KEY, Number(autoSoundVolumeInput.value) || 0));
        autoSoundDurationInput?.addEventListener("input", () => { if (autoSoundDurationLabel) autoSoundDurationLabel.textContent = `${autoSoundDurationInput.value}ms`; });
        autoSoundDurationInput?.addEventListener("change", () => GM_setValue(AUTO_SOUND_DURATION_KEY, Number(autoSoundDurationInput.value) || 220));
        document.getElementById("frt7-auto-sound-test")?.addEventListener("click", async event => {
            event.preventDefault();
            event.stopPropagation();
            // Save the visible controls first, then play inside this user gesture.
            if (autoSoundTypeInput) GM_setValue(AUTO_SOUND_TYPE_KEY, String(autoSoundTypeInput.value || "chime"));
            if (autoSoundVolumeInput) GM_setValue(AUTO_SOUND_VOLUME_KEY, Number(autoSoundVolumeInput.value) || 0);
            if (autoSoundDurationInput) GM_setValue(AUTO_SOUND_DURATION_KEY, Number(autoSoundDurationInput.value) || 220);
            await playAutoChangeSound(true);
        });

        // v200 Name-change popup settings.
        const nameToastEnabledInput = document.getElementById("frt7-name-toast-enabled");
        const nameToastSizeInput = document.getElementById("frt7-name-toast-size");
        const nameToastSizeLabel = document.getElementById("frt7-name-toast-size-label");

        if (nameToastEnabledInput) {
            nameToastEnabledInput.checked = getNameChangeToastEnabled();
            nameToastEnabledInput.addEventListener("change", () => {
                GM_setValue(NAME_CHANGE_TOAST_ENABLED_KEY, Boolean(nameToastEnabledInput.checked));
            });
        }

        if (nameToastSizeInput) {
            const savedSize = getNameChangeToastSize();
            nameToastSizeInput.value = String(savedSize);
            if (nameToastSizeLabel) nameToastSizeLabel.textContent = `${savedSize}%`;

            nameToastSizeInput.addEventListener("input", () => {
                const size = Math.max(70, Math.min(200, Number(nameToastSizeInput.value) || 100));
                if (nameToastSizeLabel) nameToastSizeLabel.textContent = `${size}%`;
            });
            nameToastSizeInput.addEventListener("change", () => {
                const size = Math.max(70, Math.min(200, Number(nameToastSizeInput.value) || 100));
                GM_setValue(NAME_CHANGE_TOAST_SIZE_KEY, size);
                if (nameToastSizeLabel) nameToastSizeLabel.textContent = `${size}%`;
            });
        }


        // v46 TRUSTED CITY LEARNING:
        // The FINAL City field is authoritative when an APPROVED workflow action
        // is clicked. This runs synchronously in capture phase BEFORE navigation,
        // so Revert -> Monmouth -> Next reliably saves Monmouth.
        //
        // Discard actions (Format Issue / Not in U.S. / NG Tech / Mark NG /
        // No Location) never call this function.
        function saveTrustedCityFromCurrentFieldSync(source = "workflow action") {
            if (discardLearningIsBlocked()) return false;

            const cityInput = document.getElementById("txtCityDataEntry");
            const stateInput = document.getElementById("txtStateDataEntry");

            const city = normalizeContactDisplayCase(String(cityInput?.value || "").trim());
            const state = String(stateInput?.value || "").trim().toUpperCase();
            const key = learnedCityStateKey(city, state);

            if (!key || !city) return false;
            if (state && !/^[A-Z]{2}$/.test(state)) return false;
            if (/\d|@/.test(city)) return false;
            if (city.split(/\s+/).filter(Boolean).length > 5) return false;
            if (/[;:!?]/.test(city)) return false;

            // v156 CLICK-SPEED FIX:
            // This capture-phase handler runs BEFORE WallStJobs' own Next/Prior Sales/
            // Non-Sales/etc. click handler. Do the minimum synchronous work required
            // for persistence so our toolbar never holds up navigation.
            //
            // learnedCitiesCache is already the session-authoritative database and every
            // normal city mutation keeps it current. Avoid an extra GM read + JSON parse,
            // verification read + parse, settings re-render, and sort before navigation.
            const prior = learnedCitiesCache[key] || {};
            if (prior?.deleted === true) {
                console.info(`Toolbar trusted cities v59: workflow did NOT resurrect deleted city "${city}".`);
                return false;
            }

            const alreadyTrusted =
                prior.city === city &&
                String(prior.state || "").trim().toUpperCase() === state &&
                prior.trustedManualCity === true &&
                prior.deleted !== true;

            if (alreadyTrusted) return true;

            // v217 MANUAL CITY SAVE FIX:
            // Persist the FINAL City + State immediately, while we are still on the
            // applicant the user approved. v157 deferred this through sessionStorage
            // until the next page loaded; that could lose an otherwise valid manual
            // correction when WallStJobs changed/replaced the page in a way that did
            // not give the next toolbar instance a reliable chance to flush it.
            //
            // Keep this path lightweight: update the in-memory cache + one GM write.
            // Do NOT verify/read back or re-render Settings during the outgoing click.
            const learnedAt = Date.now();
            learnedCitiesCache[key] = {
                ...prior,
                city,
                state,
                trustedManualCity: true,
                deleted: false,
                learnedFromWorkflow: true,
                learnedAt,
                source
            };
            try {
                GM_setValue(LEARNED_CITIES_SINGLE_DB_KEY, JSON.stringify(learnedCitiesCache));
                // Remove any stale deferred record from the older v157 path.
                sessionStorage.removeItem("frt7_pending_workflow_city_v157");
            } catch (e) {
                console.warn("Toolbar v217: immediate City learning save failed; keeping deferred fallback.", e);
                try {
                    sessionStorage.setItem("frt7_pending_workflow_city_v157", JSON.stringify({
                        city, state, source, learnedAt
                    }));
                } catch (_) {}
            }
            return true;
        }

        // v44 SAFE FIRST NAME LEARNING:
        // The FINAL First Name field is authoritative when the user processes the
        // applicant. We intentionally save BEFORE the site's click handler can
        // navigate/load the next resume.
        //
        // Example:
        //   First Name field = "Lee Ann"
        //   user clicks Next / Prior Sales / Non-Sales / etc.
        //   -> "Lee Ann" is synchronously persisted to Safe Multi-Word First Names.
        //
        // We do NOT require the current resume parser/header matcher to approve the
        // phrase. The user's final field value is the approval.
        function learnSafeFirstNameFromCurrentField(source = "workflow action") {
            if (discardLearningIsBlocked()) return false;
            const firstInput =
                document.getElementById("txtFirstNameDataEntry") ||
                document.getElementById("txtFirstName");

            const value = normalizeContactDisplayCase(String(firstInput?.value || "").trim());
            if (!isValidSafeMultiwordFirstName(value)) return false;

            // v156 CLICK-SPEED FIX: keep this capture-phase path tiny. If already known,
            // do nothing. Otherwise update cache + one GM write; no readback or settings render.
            const key = normalizeSafeFirstName(value);
            const prior = safeFirstNamesCache[key];
            if (prior?.name === value) return true;

            // v157 NO CLICK DELAY: queue the tiny approved value only. The next page
            // persists it after navigation, so this capture handler cannot delay the click.
            try {
                sessionStorage.setItem("frt7_pending_workflow_first_v157", JSON.stringify({
                    name: value, source, learnedAt: Date.now()
                }));
            } catch (_) {}
            return true;
        }

        function flushPendingWorkflowLearningV157() {
            // Runs only on the newly loaded page, outside the outgoing click path.
            try {
                const rawCity = sessionStorage.getItem("frt7_pending_workflow_city_v157");
                if (rawCity) {
                    sessionStorage.removeItem("frt7_pending_workflow_city_v157");
                    const rec = JSON.parse(rawCity);
                    const city = normalizeContactDisplayCase(String(rec?.city || "").trim());
                    const state = String(rec?.state || "").trim().toUpperCase();
                    const key = learnedCityStateKey(city, state);
                    if (key && city && (!state || /^[A-Z]{2}$/.test(state))) {
                        const prior = learnedCitiesCache[key] || {};
                        if (prior?.deleted !== true) {
                            learnedCitiesCache[key] = {
                                ...prior, city, state, trustedManualCity: true, deleted: false,
                                learnedFromWorkflow: true, learnedAt: rec?.learnedAt || Date.now(),
                                source: rec?.source || "workflow action"
                            };
                            GM_setValue(LEARNED_CITIES_SINGLE_DB_KEY, JSON.stringify(learnedCitiesCache));
                        }
                    }
                }
            } catch (e) { console.warn("Toolbar v157: pending City learning flush failed.", e); }

            try {
                const rawFirst = sessionStorage.getItem("frt7_pending_workflow_first_v157");
                if (rawFirst) {
                    sessionStorage.removeItem("frt7_pending_workflow_first_v157");
                    const rec = JSON.parse(rawFirst);
                    const value = normalizeContactDisplayCase(String(rec?.name || "").trim());
                    if (isValidSafeMultiwordFirstName(value)) {
                        const key = normalizeSafeFirstName(value);
                        safeFirstNamesCache[key] = {
                            name: value, source: rec?.source || "workflow action",
                            learnedAt: rec?.learnedAt || Date.now()
                        };
                        GM_setValue(SAFE_FIRST_NAMES_KEY, JSON.stringify(safeFirstNamesCache));
                    }
                }
            } catch (e) { console.warn("Toolbar v157: pending First Name learning flush failed.", e); }
        }

        function workflowActionLabel(target) {
            if (!target) return "";

            const el = target.closest?.("button, input[type='button'], input[type='submit'], a") || target;
            const raw = String(
                el?.value ||
                el?.innerText ||
                el?.textContent ||
                el?.title ||
                ""
            ).replace(/\s+/g, " ").trim();

            return raw;
        }

        function normalizeWorkflowActionLabel(label) {
            return String(label || "").toLowerCase()
                .replace(/[←→<>]/g, " ").replace(/\s+/g, " ").trim();
        }

        function isDiscardWorkflowAction(label) {
            const s = normalizeWorkflowActionLabel(label);
            return /^format issue\b/.test(s) ||
                   /^not in u\.?s\.?\b/.test(s) ||
                   /^ng tech\b/.test(s) ||
                   /^mark ng\b/.test(s) ||
                   /^no location\b/.test(s);
        }

        function isLearningWorkflowAction(label) {
            const s = normalizeWorkflowActionLabel(label);
            if (!s || isDiscardWorkflowAction(s)) return false;
            return /^next\b/.test(s) ||
                   /^save\b/.test(s) ||
                   /^skip\b/.test(s) ||
                   /^non[- ]?sales\b/.test(s) ||
                   /^prior sales\b/.test(s) ||
                   /^hs\b/.test(s);
        }

        let discardLearningUntil = 0;
        function discardLearningIsBlocked() {
            return Date.now() < discardLearningUntil;
        }

        // HARD DISCARD: arm before click handlers/change events can teach anything.
        document.addEventListener("pointerdown", event => {
            const label = workflowActionLabel(event.target);
            if (!isDiscardWorkflowAction(label)) return;
            discardLearningUntil = Date.now() + 15000;
            pendingAutoNameLearning = null;
            console.info(`Toolbar v45 DISCARD: no learning for "${label}".`);
        }, true);

        document.addEventListener("click", event => {
            const label = workflowActionLabel(event.target);
            if (isDiscardWorkflowAction(label)) {
                discardLearningUntil = Date.now() + 15000;
                pendingAutoNameLearning = null;
                return;
            }
            if (!isLearningWorkflowAction(label)) return;

            // v46: Whatever is in City NOW is what gets trusted.
            saveTrustedCityFromCurrentFieldSync(label || "workflow action");
            learnSafeFirstNameFromCurrentField(label || "workflow action");
        }, true);

        // No generic submit learner: it could not safely distinguish a normal
        // processed applicant from one of the discard classifications.

        // v46: Do NOT learn City merely because the field was edited.
        // Learning is committed only when an approved workflow action is clicked.
        // This is what guarantees discard actions never save a city.

        function updateAutoButton(enabled) {
            if (!autoBtn) return;
            // v199 UI-ONLY MOVE: the master Auto control now lives in Settings as a
            // checkbox. AUTO_KEY and every Auto execution path remain unchanged.
            autoBtn.checked = Boolean(enabled);
            autoBtn.title = enabled
                ? "Auto-fix is enabled. Uncheck to turn it off."
                : "Automatically fix contact fields when each resume loads.";
        }

        // v155 ONE AUTHORITATIVE HEADER RESOLVER:
        // All automatic Area paths use this exact resolver. Explicit City+State wins,
        // then safe learned standalone city, then military fallback. Every underlying
        // matcher is true-header-scoped.
        function getAuthoritativeHeaderLocationForAuto(resumeText = getResumeText()) {
            const coverLetterApplicant = frt7CoverLetterExistingLocationCandidate();
            if (coverLetterApplicant) return coverLetterApplicant;
            const verifiedContact = frt7VerifiedExistingContactLocation();
            if (verifiedContact) return verifiedContact;

            const valid = loc => frt7ValidHeaderCity(loc) ? loc : null;
            const ocrAddress = valid(frt7OcrNorthBrunswickHeader(resumeText));
            if (ocrAddress) return ocrAddress;
            const locked = valid(frt7GetAuthoritativeHeaderLocation());
            if (locked) return locked;
            // Skip invalid candidates and continue to the next source; do not
            // let a punctuation-only learned city block the Area fallback.
            return valid(findExplicitRemoteHybridHeaderCity(resumeText)) ||
                valid(findTrustedLearnedCityInHeader(resumeText)) ||
                valid(findExplicitLocationInLiteralRawContact()) ||
                valid(findUsCityDatabaseInHeader(resumeText)) ||
                valid(findUsCityZipInHeaderV171(resumeText)) ||
                valid(findRegionalAliasInHeader(resumeText)) ||
                valid(findMilitaryInstallationInHeader(resumeText));
        }

        // v182 CURRENT-EXPERIENCE CORROBORATION:
        // Phone area code is last-resort evidence. If WallStJobs already supplied a
        // valid City+State and that EXACT pair appears right at the start of the
        // candidate's current/first Experience block, keep that pair and repair its ZIP
        // instead of replacing it with an unrelated phone-area-code city.
        //
        // Deliberately narrow:
        //   1) exact current City+State only;
        //   2) pair must be a valid U.S. city-database pair;
        //   3) pair must NOT be in the true contact/header (header already has higher priority);
        //   4) pair must appear within the first 1100 characters after the first
        //      EXPERIENCE / WORK EXPERIENCE / PROFESSIONAL EXPERIENCE / EMPLOYMENT HISTORY heading;
        //   5) Education never counts as corroboration.
        // This is corroboration only: it may block Area and trigger a ZIP lookup, but it
        // never replaces a genuine header location.
        function currentLocationIsCorroboratedByCurrentExperience(resumeText, currentCity, currentState) {
            const textValue = String(resumeText || "");
            const city = normalizeContactDisplayCase(String(currentCity || "").trim());
            const state = String(currentState || "").trim().toUpperCase();
            if (!textValue || !city || !/^[A-Z]{2}$/.test(state)) return false;
            if (!isUsCityDatabasePair(city, state)) return false;

            const rawStart = textValue.slice(0, 9000);
            const sectionStop = findTrueResumeSectionStop(rawStart);

            const cityEsc = city
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                .replace(/\s+/g, "\\s+");
            const stateEsc = state.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const pairRe = new RegExp(
                "(^|[^A-Za-zÀ-ÖØ-öø-ÿ])" + cityEsc + "\\s*,?\\s*" + stateEsc + "\\b",
                "i"
            );

            if (sectionStop >= 0 && pairRe.test(rawStart.slice(0, sectionStop))) return false;

            const experienceHeading = /\b(?:PROFESSIONAL\s+EXPERIENCE|WORK\s+EXPERIENCE|EMPLOYMENT\s+HISTORY|EXPERIENCE)\b/i.exec(rawStart);
            if (!experienceHeading) return false;

            const experienceStart = experienceHeading.index + experienceHeading[0].length;
            let firstExperienceWindow = rawStart.slice(experienceStart, experienceStart + 1100);

            const educationIndex = firstExperienceWindow.search(/\bEDUCATION\b/i);
            if (educationIndex >= 0) firstExperienceWindow = firstExperienceWindow.slice(0, educationIndex);

            if (!pairRe.test(firstExperienceWindow)) return false;

            console.info(
                `Toolbar LOCATION v182: current page location "${city}, ${state}" is corroborated ` +
                `by the first/current Experience block; Area-code fallback is blocked.`
            );
            return true;
        }

        // v155 POST-HEADER LOCATION GUARD:
        // WallStJobs itself can prefill City/State from WORK EXPERIENCE, EXPERIENCE,
        // EDUCATION, etc. That is not applicant contact location. If the current
        // City+State does not appear in the TRUE header but does appear after the first
        // major section heading, treat it exactly like the old Education-only false
        // location and allow Area fallback.
        function currentLocationIsPostHeaderOnly(resumeText, currentCity, currentState) {
            const textValue = String(resumeText || "");
            const city = normalizeContactDisplayCase(String(currentCity || "").trim());
            const state = String(currentState || "").trim().toUpperCase();
            if (!textValue || !city || !/^[A-Z]{2}$/.test(state)) return false;

            const rawStart = textValue.slice(0, 7000);
            const sectionStop = findTrueResumeSectionStop(rawStart);
            if (sectionStop < 0) return false;

            const header = rawStart.slice(0, sectionStop);
            const postHeader = rawStart.slice(sectionStop);

            const cityEsc = city
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                .replace(/\s+/g, "\\s+");
            const stateEsc = state.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const pairRe = new RegExp(
                "(^|[^A-Za-zÀ-ÖØ-öø-ÿ])" + cityEsc + "\\s*,?\\s*" + stateEsc + "\\b",
                "i"
            );

            // If the exact current pair is actually in the header, it is not post-header-only.
            if (pairRe.test(header)) return false;

            // Exact current pair appears only after a major section boundary.
            if (pairRe.test(postHeader)) return true;

            // WallStJobs sometimes glues employer/title words onto the real city,
            // e.g. "National Group Miami" from "... National Group Miami, FL ...".
            // If the CURRENT city phrase itself appears before the same state only
            // after the header boundary, treat that as post-header contamination too.
            const looseCurrentPair = new RegExp(
                cityEsc + "\\s*,?\\s*" + stateEsc + "\\b",
                "i"
            );
            if (looseCurrentPair.test(postHeader)) return true;

            // v162 SAFE ABBREVIATED POST-HEADER MATCH:
            // WallStJobs can shorten a city that it pulled from Experience/Education
            // (example: "GRAND BLANC, MI" -> on-page City "Gr Blanc"). The older exact
            // post-header guard then failed and a valid-looking ZIP caused Area to be
            // suppressed. Only treat this as post-header contamination when ALL of the
            // following are true:
            //   1) the full candidate appears after the true header with the SAME state;
            //   2) that full candidate is a real active U.S. City+State database pair;
            //   3) current and full city have the same number of words;
            //   4) every current word is either exact or a >=2-letter PREFIX of the
            //      corresponding full word; and
            //   5) at least one word is actually shortened.
            // This deliberately will not fuzzy-match typos, different cities, initials,
            // reordered words, or a legitimate location that appears in the header.
            const currentWords = normalizeLocationText(city).split(" ").filter(Boolean);
            if (currentWords.length && currentWords.length <= 4) {
                const postPairRe = new RegExp(
                    "([A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ.'’\\-]*(?:\\s+[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ.'’\\-]*){0,3})\\s*,\\s*" +
                    stateEsc + "\\b",
                    "gi"
                );

                let match;
                while ((match = postPairRe.exec(postHeader))) {
                    const fullCity = normalizeContactDisplayCase(match[1]);
                    if (!fullCity || !isUsCityDatabasePair(fullCity, state)) continue;

                    const fullWords = normalizeLocationText(fullCity).split(" ").filter(Boolean);
                    if (fullWords.length !== currentWords.length) continue;

                    let shortened = false;
                    let safePrefixMatch = true;
                    for (let i = 0; i < currentWords.length; i++) {
                        const cur = currentWords[i];
                        const full = fullWords[i];
                        if (cur === full) continue;
                        if (cur.length >= 2 && cur.length < full.length && full.startsWith(cur)) {
                            shortened = true;
                            continue;
                        }
                        safePrefixMatch = false;
                        break;
                    }

                    if (!safePrefixMatch || !shortened) continue;

                    // Final header safety check: even an abbreviated form must not be
                    // treated as post-header-only if the full real City+State is in the header.
                    const fullCityEsc = fullCity
                        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                        .replace(/\s+/g, "\\s+");
                    const fullPairRe = new RegExp(
                        "(^|[^A-Za-zÀ-ÖØ-öø-ÿ])" + fullCityEsc + "\\s*,?\\s*" + stateEsc + "\\b",
                        "i"
                    );
                    if (fullPairRe.test(header)) return false;

                    console.info(
                        `Toolbar AUTO AREA v162: recognized abbreviated post-header location ` +
                        `"${city}, ${state}" as "${fullCity}, ${state}".`
                    );
                    return true;
                }
            }

            return false;
        }

        // v145 EDUCATION LOCATION GUARD:
        // If WallStJobs populated City/State from the EDUCATION section while the TRUE
        // header contains no trusted location, that school location must not block Area.
        // This is intentionally narrow: the CURRENT on-page City + State must literally
        // appear inside EDUCATION, before the next major section.
        function currentLocationIsEducationOnly(resumeText, currentCity, currentState) {
            const textValue = String(resumeText || "");
            const city = normalizeContactDisplayCase(String(currentCity || "").trim());
            const state = String(currentState || "").trim().toUpperCase();
            if (!textValue || !city || !/^[A-Z]{2}$/.test(state)) return false;

            const rawStart = textValue.slice(0, 5000);
            const educationMatch = /\bEDUCATION\b/i.exec(rawStart);
            if (!educationMatch) return false;

            const afterEducation = rawStart.slice(educationMatch.index + educationMatch[0].length);
            const nextSection = afterEducation.search(
                /\b(?:CORE\s+EXPERTISE|CORE\s+COMPETENCIES|PROFESSIONAL\s+EXPERIENCE|WORK\s+EXPERIENCE|EMPLOYMENT\s+HISTORY|EXPERIENCE|SKILLS|QUALIFICATIONS|CERTIFICATES?|LICENSES?|PROJECTS?|SUMMARY|OBJECTIVE)\b/i
            );
            const educationText = nextSection >= 0
                ? afterEducation.slice(0, nextSection)
                : afterEducation.slice(0, 1800);

            const cityEsc = city
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                .replace(/\s+/g, "\\s+");
            const stateEsc = state.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const pairRe = new RegExp(
                "(^|[^A-Za-zÀ-ÖØ-öø-ÿ])" + cityEsc + "\\s*,?\\s*" + stateEsc + "\\b",
                "i"
            );
            return pairRe.test(educationText);
        }

        // v164 CANADIAN HEADER -> AREA FALLBACK:
        // WallStJobs can misread a Canadian contact header as a same-named U.S. city
        // (for example "New Brunswick, Canada" -> New Brunswick, NJ). Detect Canada
        // only inside the TRUE contact/header section. This does not create a Canadian
        // city parser; it only tells Auto Area that a site-supplied U.S. fallback is
        // not trustworthy, so the existing phone area-code logic may replace it.
        function trueHeaderExplicitlySaysCanada(resumeText) {
            const rawStart = String(resumeText || "").slice(0, 1800);
            if (!rawStart.trim()) return false;
            const sectionStop = findTrueResumeSectionStop(rawStart);
            const head = (sectionStop >= 0
                ? rawStart.slice(0, sectionStop)
                : rawStart.slice(0, 900)
            ).slice(0, 900);
            return /\bCanada\b/i.test(head);
        }

        // v51 AUTO AREA FALLBACK:
        // When the resume header has no trustworthy City/State and the website has
        // neither City nor ZIP, use the SAME Area button logic as a human click.
        // The Area path is intentionally a fallback only; it never overrides a
        // confirmed U.S. header location. v164 additionally allows it to replace a
        // site-populated U.S. location when the TRUE header explicitly says Canada.
        function tryAutoAreaFallback(reason = "auto") {
            if (frt7HumanTouchedLocation()) return false;
            const fieldsPromise = getAutoFields();
            Promise.resolve(fieldsPromise).then(fields => {
                if (!fields?.city) return false;

                const cityInput = document.getElementById("txtCityDataEntry");
                const zipInput = document.getElementById("txtZipDataEntry");
                if (!cityInput || !zipInput) return false;
                if (isManualContactLocked("city", cityInput) || isManualContactLocked("zip", zipInput)) return false;

                const currentCity = String(cityInput.value || "").trim();
                const currentZip = String(zipInput.value || "").trim();
                const stateInputNow = document.getElementById("txtStateDataEntry");
                const currentState = String(stateInputNow?.value || "").trim().toUpperCase();
                const resumeTextNow = getResumeText();

                // v197 INITIAL VALID SITE LOCATION VETO:
                // Do not replace an originally loaded, internally valid City/State/ZIP
                // with the coarse phone-area-code city. Trusted explicit resume-header
                // corrections happen through the header pipeline and are not blocked here.
                if (frt7PreAutoLocationBlocksPhoneArea(`tryAutoAreaFallback (${reason})`)) {
                    return false;
                }

                // v185 HEADER/AREA LOAD-RACE GUARD:
                // The Census city database is what proves ordinary explicit header pairs
                // such as "Independence, KY". If Area runs while that database is still
                // loading, the header resolver can temporarily return null and the phone
                // area code can wrongly win (512 -> Austin, TX). Never make a phone-based
                // Area decision during that short database-loading window. The existing
                // queued retries and the database-load reconciliation pass will try again.
                if (!usCityDbLoaded && usCityDbLoading) {
                    console.info(
                        `Toolbar AUTO AREA v185: U.S. city database still loading; ` +
                        `delaying Area so an explicit header City/State cannot lose (${reason}).`
                    );
                    return false;
                }

                // v102 TRUSTED HEADER FIRST:
                // A real trusted header location always wins and must never be replaced
                // by the Area-code fallback.
                // v153 HEADER LOCATION BEFORE AREA:
                // Check every authoritative header source before Area is even considered.
                // Explicit U.S.-database City+State comes before the standalone learned
                // fallback, so "Elon, NC" can never lose to phone 919 -> Raleigh.
                const trustedHeaderLoc =
                    getAuthoritativeHeaderLocationForAuto(resumeTextNow);
                const trustedHeaderState = String(trustedHeaderLoc?.state || "").trim().toUpperCase();

                // v155: WallStJobs may itself prefill a perfectly valid-looking City/State/ZIP
                // from Education, Experience, Work Experience, or another post-header section. If that exact current City+State appears in EDUCATION and
                // there is NO trusted header location, treat it as unusable contact location
                // and allow the normal Area button to replace it from the phone area code.
                const hasTrustedUsHeaderLocation = Boolean(
                    trustedHeaderLoc?.city && /^[A-Z]{2}$/.test(trustedHeaderState)
                );
                const experienceCorroboratesCurrentLocation =
                    !hasTrustedUsHeaderLocation &&
                    currentLocationIsCorroboratedByCurrentExperience(
                        resumeTextNow,
                        currentCity,
                        currentState
                    );

                const postHeaderOnlyLocation =
                    !hasTrustedUsHeaderLocation &&
                    !experienceCorroboratesCurrentLocation &&
                    currentLocationIsPostHeaderOnly(resumeTextNow, currentCity, currentState);

                // v164: If the TRUE header explicitly says Canada and there is no
                // authoritative U.S. City+State pair, do not preserve WallStJobs'
                // same-name U.S. fallback. Let Area use the phone area code instead.
                const canadianHeaderNeedsArea =
                    !hasTrustedUsHeaderLocation &&
                    trueHeaderExplicitlySaysCanada(resumeTextNow);

                // v101 NO LOCATION -> TRUSTED HEADER, OTHERWISE AREA:
                // WallStJobs sometimes loads the literal placeholder "No Location" as
                // the City while leaving an old/default State and ZIP populated. Treat
                // that placeholder as unusable location data and click the REAL Area
                // button. The existing Area handler will replace City + State, clear the
                // stale ZIP, and run the normal ZIP lookup from the phone's area code.
                // v138 LIGHTWEIGHT PLACEHOLDER RULE:
                // Treat Remote/Hybrid exactly like No Location for this existing fallback.
                // No new heartbeat or long-running watcher is added.
                const cityIsNoLocation = /^no\s+location$/i.test(currentCity);
                const cityIsRemotePlaceholder = /^(?:remote|hybrid|remote\s*\/\s*hybrid|hybrid\s*\/\s*remote)$/i.test(currentCity);
                const cityIsLocationPlaceholder = cityIsNoLocation || cityIsRemotePlaceholder;

                // v165 NAME-AS-CITY FALLBACK:
                // WallStJobs can occasionally populate City with the applicant's First or
                // Last Name (for example Sam Lance -> City "Sam") while leaving ZIP blank.
                // A nonblank City normally suppresses Area, so this bad parse could survive.
                //
                // Keep this deliberately narrow:
                //   1) there is NO authoritative U.S. header location;
                //   2) ZIP is blank;
                //   3) the current City exactly equals the visible applicant First OR Last Name.
                // Manual City/ZIP edits were already protected above. A genuine header City, ST
                // still wins before this rule, so names that are also real cities are not
                // displaced when the resume actually supplies that location.
                const currentFirstNameForArea = normalizeContactDisplayCase(String(
                    document.querySelector("#txtFirstNameDataEntry")?.value ||
                    document.querySelector("#txtFirstName")?.value || ""
                ).trim());
                const currentLastNameForArea = normalizeContactDisplayCase(String(
                    document.querySelector("#txtLastNameDataEntry")?.value ||
                    document.querySelector("#txtLastName")?.value || ""
                ).trim());
                const normalizedCurrentCityForArea = normalizeContactDisplayCase(currentCity);
                const cityMatchesApplicantName = Boolean(
                    normalizedCurrentCityForArea &&
                    (
                        (currentFirstNameForArea && normalizedCurrentCityForArea === currentFirstNameForArea) ||
                        (currentLastNameForArea && normalizedCurrentCityForArea === currentLastNameForArea)
                    )
                );
                const nameCityNeedsArea =
                    !hasTrustedUsHeaderLocation &&
                    !currentZip &&
                    cityMatchesApplicantName;

                // v166 STATE-NAME-AS-CITY FALLBACK:
                // WallStJobs can occasionally put a full U.S. state name in the City
                // field (for example City "Texas", State "MO") while ZIP is blank.
                // A nonblank City would normally suppress Area.
                //
                // Keep this deliberately narrow:
                //   1) there is NO authoritative U.S. header City+State;
                //   2) ZIP is blank;
                //   3) City is EXACTLY a full state/territory name from STATE_MAP;
                //   4) the visible State does NOT equal that state's own abbreviation.
                //
                // The mismatch requirement avoids treating a same-state value as a reason
                // to use Area, and all existing manual-edit/header protections still run first.
                const stateNameCityExpectedState =
                    STATE_MAP[String(currentCity || "").trim().toUpperCase()] || "";
                const stateNameCityNeedsArea =
                    !hasTrustedUsHeaderLocation &&
                    !currentZip &&
                    Boolean(stateNameCityExpectedState) &&
                    currentState !== stateNameCityExpectedState;

                // v179 INVALID CITY+STATE -> AREA FALLBACK:
                // WallStJobs can preload a real U.S. city name with the WRONG state
                // (recorded example: Phoenix, UT) while ZIP is blank. A generic nonblank
                // City normally suppresses Area, even though the manual Area button is
                // exactly what we want in this situation.
                //
                // Keep this narrow and safe:
                //   1) no trusted header location;
                //   2) ZIP is blank;
                //   3) current State is a normal 2-letter abbreviation;
                //   4) the U.S. city DB is loaded;
                //   5) this City name exists somewhere in the U.S. city DB;
                //   6) but this exact City+State pair does NOT exist.
                //
                // This means a legitimate different city covered by the same area code
                // is preserved. We only use Area when the visible pair itself is invalid.
                const currentCityPairKeyForArea =
                    usCityPairKey(normalizeContactDisplayCase(currentCity), currentState);
                const currentCityNameKeyForArea =
                    normalizeLearnedCity(normalizeContactDisplayCase(currentCity));
                const currentCityExistsInAnyStateForArea =
                    Boolean(currentCityNameKeyForArea) &&
                    usCityDbLoaded &&
                    usCityDbRows.some(row =>
                        normalizeLearnedCity(row.city) === currentCityNameKeyForArea
                    );
                const invalidCityStateNeedsArea =
                    !hasTrustedUsHeaderLocation &&
                    !currentZip &&
                    Boolean(currentCity) &&
                    /^[A-Z]{2}$/.test(currentState) &&
                    usCityDbLoaded &&
                    currentCityExistsInAnyStateForArea &&
                    !usCityDbPairSet.has(currentCityPairKeyForArea);

                // v191 OBVIOUS ROLE/TITLE-AS-CITY FALLBACK:
                // Keep the existing narrow v185 single-word rule, but also handle a short
                // multi-word City value when EVERY word is already established resume/job
                // vocabulary. This catches flattened junk such as "Health Insurance License"
                // without creating a broad "unknown multi-word city" rule.
                // Genuine explicit header City+State still wins above this rule.
                const normalizedCityRoleToken = String(currentCity || "").trim().toUpperCase();
                const normalizedCityRoleWords = normalizedCityRoleToken
                    .split(/\s+/)
                    .filter(Boolean);
                const cityRoleWordsAreAllKnownJunk =
                    normalizedCityRoleWords.length >= 1 &&
                    normalizedCityRoleWords.length <= 5 &&
                    normalizedCityRoleWords.every(word =>
                        /^[A-Z][A-Z'’\-]*$/.test(word) &&
                        (
                            NON_NAME_TRAIL_WORDS.has(word) ||
                            REJECTED_HARD_WORDS.has(word)
                        )
                    );
                const obviousRoleCityNeedsArea =
                    !hasTrustedUsHeaderLocation &&
                    !currentZip &&
                    /^[A-Z]{2}$/.test(currentState) &&
                    cityRoleWordsAreAllKnownJunk;

                // v197.4 CITY-ONLY INCOMPLETE LOCATION FALLBACK:
                // A nonblank City used to suppress Area even when State AND ZIP were both
                // blank. If there is no authoritative/saved header City+State, that is not
                // a complete location, so let the normal Area button use the phone area code.
                // Example: WallStJobs loads City="USA", State blank, ZIP blank.
                const incompleteCityOnlyNeedsArea =
                    !hasTrustedUsHeaderLocation &&
                    Boolean(currentCity) &&
                    !currentState &&
                    !currentZip;

                // v204 INVALID LOADED CITY EVEN WHEN ZIP IS GREEN:
                // A matching State+ZIP is not enough to make junk in City authoritative.
                // Example: City="International Rescue Committee", State=DC, ZIP=20599.
                // Once the U.S. city DB is ready, if the visible City+State is not a real
                // city pair and no true-header/saved contact location exists, allow Area.
                // This does NOT affect v182: an actually valid loaded City+State that exactly
                // matches the current/most-recent Experience location is preserved above.
                const invalidLoadedCityWithZipNeedsArea =
                    !hasTrustedUsHeaderLocation &&
                    Boolean(currentCity) &&
                    /^[A-Z]{2}$/.test(currentState) &&
                    Boolean(currentZip) &&
                    usCityDbLoaded &&
                    !isUsCityDatabasePair(
                        normalizeContactDisplayCase(currentCity),
                        currentState
                    );

                // v153 CRITICAL ORDERING FIX:
                // A real header location must be handled BEFORE the "current City/ZIP
                // already populated" early return. Otherwise an earlier Area click can
                // populate Raleigh, NC and then future passes preserve Raleigh forever
                // even though the header explicitly says Elon, NC.
                if (
                    trustedHeaderLoc?.city &&
                    /^[A-Z]{2}$/.test(trustedHeaderState)
                ) {
                    // v243: A bare learned city in the header is not authoritative
                    // enough to replace a good existing location or to invent its saved
                    // State. Preserve explicit City+State behavior by applying this only
                    // to learned candidates whose state was NOT present in the header.
                    if (trustedHeaderLoc.learned && trustedHeaderLoc.withState === false) {
                        const standaloneGuard = frt7HandleStandaloneLearnedCityAutoGuard(
                            trustedHeaderLoc,
                            `Area fallback: ${reason}`
                        );
                        if (standaloneGuard.handled) return standaloneGuard.action === "area";
                    }

                    const stateInput = document.getElementById("txtStateDataEntry");
                    const lookupInput = document.getElementById("txtZipLookupEntry");
                    if (!stateInput || isManualContactLocked("state", stateInput)) return false;

                    const trustedCity = normalizeContactDisplayCase(trustedHeaderLoc.city);
                    try {
                        frt7SetAuthoritativeHeaderLocation(
                            { ...trustedHeaderLoc, city: trustedCity, state: trustedHeaderState },
                            "tryAutoAreaFallback"
                        );
                    } catch (_) {}
                    const currentNormalizedCity = normalizeContactDisplayCase(currentCity);
                    const currentNormalizedState = String(currentState || "").trim().toUpperCase();
                    const pairAlreadyCorrect =
                        currentNormalizedCity === trustedCity &&
                        currentNormalizedState === trustedHeaderState;

                    // If the pair is already correct, Area has nothing to do. Keep a
                    // correct existing ZIP; the normal ZIP watcher handles blanks/mismatches.
                    if (pairAlreadyCorrect && currentZip) return false;

                    cityInput.value = trustedCity;
                    triggerEvents(cityInput);
                    stateInput.value = trustedHeaderState;
                    triggerEvents(stateInput);

                    // v242: If WallStJobs already supplied a ZIP that independently maps
                    // to the trusted header State, preserve it even when City/State needed
                    // correction. Only clear/lookup when that existing ZIP is not verified
                    // for the trusted State.
                    const existingTrustedZip = String(zipInput.value || "").trim();
                    const existingTrustedZipState = /^\d{5}$/.test(existingTrustedZip)
                        ? frt7StateFromZipV171(existingTrustedZip)
                        : "";
                    const preserveTrustedZip = Boolean(
                        existingTrustedZip &&
                        existingTrustedZipState &&
                        existingTrustedZipState === trustedHeaderState
                    );

                    if (!pairAlreadyCorrect && !preserveTrustedZip) {
                        zipInput.value = "";
                        triggerEvents(zipInput);
                    }
                    if (!preserveTrustedZip) {
                        if (lookupInput) lookupInput.value = `${trustedCity}, ${trustedHeaderState}`;
                        runConfirmedZipLookup(
                            { city: trustedCity, state: trustedHeaderState },
                            { zipStatus: pairAlreadyCorrect ? getWebsiteZipStatus() : "blank" }
                        );
                    } else {
                        console.info(
                            `Toolbar AUTO AREA v242: preserved existing ZIP ${existingTrustedZip}; it maps to trusted State ${trustedHeaderState}.`
                        );
                    }
                    console.info(`Toolbar AUTO AREA v153: HEADER location blocks Area -> ${trustedCity}, ${trustedHeaderState}.`);
                    return true;
                }

                // v182: Keep a valid page location corroborated by the candidate's
                // first/current Experience block. It is weaker than a true header location,
                // but stronger than phone area code.
                if (experienceCorroboratesCurrentLocation) {
                    const stateInput = document.getElementById("txtStateDataEntry");
                    const lookupInput = document.getElementById("txtZipLookupEntry");
                    if (!stateInput || isManualContactLocked("state", stateInput)) return false;

                    const preservedCity = normalizeContactDisplayCase(currentCity);
                    const preservedState = String(currentState || "").trim().toUpperCase();
                    const statusNow = getWebsiteZipStatus();

                    if (statusNow !== "match") {
                        if (!isManualContactLocked("zip", zipInput)) {
                            zipInput.value = "";
                            triggerEvents(zipInput);
                        }
                        if (lookupInput) lookupInput.value = `${preservedCity}, ${preservedState}`;
                        runConfirmedZipLookup(
                            { city: preservedCity, state: preservedState },
                            { zipStatus: "blank" }
                        );
                    }

                    console.info(
                        `Toolbar AUTO AREA v182: preserved Experience-corroborated ` +
                        `${preservedCity}, ${preservedState}; phone Area fallback blocked.`
                    );
                    return true;
                }

                if (
                    !postHeaderOnlyLocation &&
                    !canadianHeaderNeedsArea &&
                    !cityIsLocationPlaceholder &&
                    !nameCityNeedsArea &&
                    !stateNameCityNeedsArea &&
                    !invalidCityStateNeedsArea &&
                    !obviousRoleCityNeedsArea &&
                    !incompleteCityOnlyNeedsArea &&
                    !invalidLoadedCityWithZipNeedsArea &&
                    (currentCity || currentZip)
                ) return false;

                // v102 IMPORTANT: Do NOT let a generic/non-saved header parse suppress Area.
                // The explicit fallback rule is now: City blank (or "No Location") + ZIP blank
                // + no saved/trusted header city => click Area, even when State is populated.

                const areaBtn = document.getElementById("frt7-location-btn");
                if (!areaBtn) return false;

                if (canadianHeaderNeedsArea) {
                    console.info(
                        `Toolbar AUTO AREA v164: TRUE header says Canada; ignored website U.S. fallback ` +
                        `"${currentCity}, ${currentState}" and clicked Area for phone-based location (${reason}).`
                    );
                } else if (nameCityNeedsArea) {
                    console.info(
                        `Toolbar AUTO AREA v165: ignored City "${currentCity}" because it exactly matches ` +
                        `the applicant name and ZIP is blank; clicking Area (${reason}).`
                    );
                } else if (stateNameCityNeedsArea) {
                    console.info(
                        `Toolbar AUTO AREA v166: ignored City "${currentCity}" because it is a full state name ` +
                        `but visible State is "${currentState}" instead of "${stateNameCityExpectedState}" and ZIP is blank; ` +
                        `clicking Area (${reason}).`
                    );
                } else if (invalidCityStateNeedsArea) {
                    console.info(
                        `Toolbar AUTO AREA v179: ignored invalid U.S. City/State pair ` +
                        `"${currentCity}, ${currentState}" with blank ZIP; clicking Area (${reason}).`
                    );
                } else if (obviousRoleCityNeedsArea) {
                    console.info(
                        `Toolbar AUTO AREA v185: ignored obvious role/title City "${currentCity}" ` +
                        `with blank ZIP; clicking Area (${reason}).`
                    );
                } else if (incompleteCityOnlyNeedsArea) {
                    console.info(
                        `Toolbar AUTO AREA v197.4: City "${currentCity}" is incomplete because State and ZIP are blank ` +
                        `and no saved/trusted header location exists; clicking Area (${reason}).`
                    );
                } else if (postHeaderOnlyLocation) {
                    console.info(
                        `Toolbar AUTO AREA v155: ignored post-header location "${currentCity}, ${currentState}" ` +
                        `and clicked Area for phone-based location (${reason}).`
                    );
                } else if (cityIsLocationPlaceholder) {
                    console.info(`Toolbar AUTO AREA v138: City is placeholder "${currentCity}"; clicking Area to replace City/State/ZIP (${reason}).`);
                } else {
                    console.info(`Toolbar AUTO AREA v102: City/ZIP blank with no saved header city (State may be populated); clicking Area (${reason}).`);
                }
                areaBtn.click();
                return true;
            }).catch(err => console.warn("Toolbar AUTO AREA fallback failed", err));
        }

        function queueAutoAreaFallback(reason = "auto") {
            // Phone can arrive slightly after the rest of the applicant fields.
            // Retry at the exact same times with the exact same guards.
            //
            // v163 PERFORMANCE-ONLY: after one attempt actually succeeds, later queued
            // attempts become no-ops instead of repeating the same header/storage work.
            let completed = false;
            [0, 400, 1000, 1800].forEach(delay => {
                setTimeout(async () => {
                    if (completed) return;

                    // v228 PERFORMANCE: when Auto already produced a complete visible
                    // location, do not enter the expensive resume/storage Area guard.
                    // If WallStJobs later clears/repaints a field, a later retry still
                    // falls through to the original guarded Area logic.
                    const cityNow = String(document.getElementById("txtCityDataEntry")?.value || "").trim();
                    const stateNow = String(document.getElementById("txtStateDataEntry")?.value || "").trim();
                    const zipNow = String(document.getElementById("txtZipDataEntry")?.value || "").trim();
                    if (cityNow && stateNow && /^\d{5}(?:-\d{4})?$/.test(zipNow)) {
                        return;
                    }

                    const succeeded = await tryAutoAreaFallback(reason);
                    if (succeeded) completed = true;
                }, delay);
            });
        }

        async function runAutoFixOnce() {
            // v351: expose silent early returns, including repeated watchdog runs.
            console.info(`Toolbar AUTO v351: entered unified pass; completed=${autoRunCompleted}; applicant=${getCurrentApplicantId()}.`);
            if (autoRunCompleted) {
                console.info("Toolbar AUTO v351: SKIP unified pass: already running/completed for this lifecycle.");
                return;
            }
            autoRunCompleted = true;
            // v397: Start changed-field watcher BEFORE the independent early Name pass.
            // Otherwise early name edits become the watcher baseline and lose the yellow badge.
            startAutoChangeSoundWatcher();
            console.info("Toolbar AUTO v351: starting independent Name readiness/settings check.");
            // Start Name before any unrelated progress/location initialization.
            // Still use the protected Name button, never a direct name-field write.
            void getAutoFields().then(fields => {
                window.__frt7_auto_name_enabled = Boolean(fields.name);
                console.info(`Toolbar AUTO NAME v351: setting=${fields.name ? "ON" : "OFF"}; iframeTextLength=${String(getResumeText() || "").length}; button=${Boolean(document.getElementById("frt7-name-btn"))}.`);
                if (fields.name) queueDelayedNameButtonClick("early independent pass");
            }).catch(err => console.warn("Toolbar AUTO NAME v351: failed to read settings:", err));
            const progressRun = frt7BeginProgress("Working… preparing contact fields");

            // v197: Freeze WallStJobs' fully painted location before ANY automatic
            // City/ZIP/Area work runs. This also covers same-document applicant changes
            // because every unified Auto pass gets a fresh lifecycle-keyed snapshot.
            frt7CapturePreAutoLocationSnapshot("runAutoFixOnce start");

            console.info("Toolbar AUTO v350: waiting for city and rejected-name databases before remaining fields.");
            await Promise.all([learnedCitiesReady, rejectedAutoNamesReady]);
            console.info("Toolbar AUTO v350: databases ready; continuing remaining fields.");

            // v37: Do NOT learn cities merely because they were already on the page.
            // Only genuine human City edits create trusted city entries.

            const fields = await getAutoFields();

            // v181: ALL enabled Auto fields run from the same true 500ms readiness gate.
            // Name and Email remain one-shot; City/State/ZIP/Phone use their existing logic.
            window.__frt7_auto_name_enabled = Boolean(fields.name);
            window.__frt7_auto_email_enabled = Boolean(fields.email);
            window.__frt7_auto_city_enabled = Boolean(fields.city);
            const firstInput = document.querySelector("#txtFirstNameDataEntry") || document.querySelector("#txtFirstName");
            const lastInput = document.querySelector("#txtLastNameDataEntry") || document.querySelector("#txtLastName");
            const emailInput = document.querySelector("#txtEmail");
            const phoneInput = document.querySelector("#txtPhoneDataEntry") || document.querySelector("#txtPhone");
            const cityInput = document.querySelector("#txtCityDataEntry");
            const stateInput = document.querySelector("#txtStateDataEntry");
            const zipInput = document.querySelector("#txtZipDataEntry");

            // v397: watcher already started before the independent early Name pass.
            // Do not restart it here: restarting clears early yellow changed badges.

            // v189: independent City-only cleanup for prefilled/autofilled junk.
            // This does not depend on the normal Auto City branch succeeding.
            if (fields.city) setTimeout(() => frt7QueueCityOnlyCanonicalizerV189("post-fast-pass"), 250);

            frt7Progress("Working… Name", progressRun);
            if (fields.name) clickNameButtonOnceWhenResumeLoads();
            else console.info("Toolbar AUTO NAME v349: SKIP: Name checkbox disabled.");
            frt7Progress("Working… Email", progressRun);
            if (fields.email) clickEmailButtonOnceWhenResumeLoads();
            if (fields.email) {
                const emailApplicant = getManualContactApplicantKey();
                setTimeout(() => {
                    if (progressRun !== frt7ProgressRun ||
                        window.__frt7_auto_email_enabled === false ||
                        getManualContactApplicantKey() !== emailApplicant) return;
                    const input = document.querySelector("#txtEmail");
                    const expected = frt7ResumeEmailForContact();
                    if (!input || !expected ||
                        String(input.value || "").trim().toLowerCase() === expected.toLowerCase() ||
                        shouldBlockProtectedEmailChange(input.value, expected) ||
                        isObviousOcrEmailDomainIssue(expected) && !isIndeedEmailRelay(input.value) ||
                        isManualContactLocked("email", input)) return;
                    document.getElementById("frt7-email-btn")?.click();
                }, 1150);
            }
            frt7Progress("Working… City and state", progressRun);
            try {
            if (fields.city && !isManualContactLocked("city", cityInput)) {
                // v236 AUTO CITY = MANUAL TRUSTED RESOLVER AT THE REAL AUTO STEP:
                // v230 skipped City resolution whenever WallStJobs had ANY nonblank
                // City + State. That meant a wrong preload such as Chicago, IL could
                // prevent Auto from ever checking the resume's saved/trusted header
                // location, even though pressing City/ST immediately found Nashville, TN.
                //
                // Run the SAME trusted resolver used by the manual City/ST action now,
                // at the actual foreground Auto City step. The outer manual-edit guard
                // remains authoritative, and fillCityOnlyFromResume still honors the
                // existing State/ZIP locks. No city-selection rules are changed.
                const autoTrustedCityResolvedV236 = fillCityOnlyFromResume({
                    trustedOnly: true,
                    manualButton: true,
                    autoInvocation: true // v297: this is Auto, not a human City/City-ST click
                });

                // If the trusted resolver is not ready yet (for example, resume/saved
                // data is still settling) keep the existing delayed recovery ONLY when
                // the current location is incomplete. Do not add new polling for a
                // complete location; the immediate trusted resolver above is the fix.
                const cityNowV236 = String(cityInput?.value || "").trim();
                const stateNowV236 = String(stateInput?.value || "").trim();
                const cityNeedsRecoveryV236 = !cityNowV236 || /^no\s+location$/i.test(cityNowV236) || !stateNowV236;
                if (!autoTrustedCityResolvedV236 && cityNeedsRecoveryV236) {
                    clickCityButtonOnceWhenResumeLoads();
                } else if (delayedCityClickTimer) {
                    clearTimeout(delayedCityClickTimer);
                    delayedCityClickTimer = null;
                }
            }
            frt7Progress("Working… Phone", progressRun);
            if (fields.phone && !isManualContactLocked("phone", phoneInput)) fillPhoneField();
            frt7Progress("Working… City, state and ZIP", progressRun);

            // v159 DIRECT HEADER ZIP:
            // This is deliberately independent of ZIP Lookup. A true-header pattern
            // such as "Indianapolis, IN 46268" must immediately own the ZIP field,
            // even if WallStJobs currently says its different ZIP "matches".
            if (fields.city || fields.state || fields.zipLookup) {
                const directHeaderLoc = extractCityStateFromHeader(getResumeText());
                const directHeaderState = String(
                    directHeaderLoc?.state || stateInput?.value || ""
                ).trim().toUpperCase();
                applyObviousHeaderZipFromResume(directHeaderState, "initial direct pass");
                queueRawHeaderZipEnforcer("initial page load");
            }

            // v102: If City + ZIP are blank after the normal Auto contact pass, queue
            // Area recovery even when WallStJobs has populated ONLY State. The strict
            // tryAutoAreaFallback() guard still gives any saved/trusted header city first
            // priority, so this cannot override a saved City/State from the resume header.
            const cityAndZipBlank =
                !String(cityInput?.value || "").trim() &&
                !String(zipInput?.value || "").trim();

            if (fields.city && cityAndZipBlank) {
                // v68: Use the ACTUAL Area button id (frt7-location-btn), and retry
                // because WallStJobs sometimes finishes populating Phone after the
                // first Auto contact pass.
                [0, 400, 1000, 1800].forEach(delay => {
                    setTimeout(() => {
                        const freshCity = document.querySelector("#txtCityDataEntry");
                        const freshState = document.querySelector("#txtStateDataEntry");
                        const freshZip = document.querySelector("#txtZipDataEntry");
                        const stillCityAndZipBlank =
                            !String(freshCity?.value || "").trim() &&
                            !String(freshZip?.value || "").trim();

                        if (!stillCityAndZipBlank) return;

                        // v114 AREA PHONE SOURCE UNIFICATION:
                        // Use the same authoritative phone source as the real Area button.
                        // This includes the visible Phone field, the current phone cache,
                        // and the resume text fallback, so Auto Area cannot miss a valid
                        // area code just because WallStJobs has not repainted the Phone
                        // field yet.
                        const phoneDigits = String(getAreaSourcePhone() || "")
                            .replace(/\D/g, "")
                            .replace(/^1(?=\d{10}$)/, "");
                        if (phoneDigits.length < 10) return;

                        const areaBtn = document.getElementById("frt7-location-btn");
                        if (areaBtn) {
                            console.info(`Toolbar AREA v102: City/ZIP blank (State may be populated); running guarded Area fallback after ${delay}ms.`);
                            tryAutoAreaFallback(`state-only/blank-location retry ${delay}ms`);
                        }
                    }, delay);
                });
            }
            if (fields.city) setTimeout(() => queueAutoAreaFallback("post-fast-pass"), 250);
            // State/ZIP Auto must also yield to human edits on this applicant.
            if ((fields.state && !isManualContactLocked("state", stateInput)) ||
                (fields.zipLookup && !isManualContactLocked("zip", zipInput))) {
                setTimeout(() => fillAutoCityStateFromResume({
                    ...fields,
                    city: false,
                    state: Boolean(fields.state) && !isManualContactLocked("state", stateInput),
                    zipLookup: Boolean(fields.zipLookup) && !isManualContactLocked("zip", zipInput)
                }), 0);
            }
            if (fields.zipLookup && !isManualContactLocked("zip", zipInput)) {
                frt7Progress("Working… ZIP lookup", progressRun);
                queueReliableAutoZipLookup("initial Auto pass");

                // v108: Run an independent custom-area recovery watchdog.
                // The earlier v107 path could still miss the case because it depended
                // on the Area button/click path and on timing inside the ZIP watcher.
                // These delayed checks look at the final settled form instead.
                [900, 1500, 1900].forEach(delay => {
                    setTimeout(async () => {
                        const freshZip = document.getElementById("txtZipDataEntry");
                        if (String(freshZip?.value || "").trim()) return;

                        // At 1.4s require WallStJobs' explicit failure message.
                        // Later checks may treat a persistently blank ZIP as settled failure.
                        const allowSettledBlank = delay >= 1500;
                        const recovered = await applyDirectCustomAreaRecovery(
                            `initial Auto watchdog ${delay}ms`,
                            allowSettledBlank
                        );

                        if (!recovered && pageShowsDefinitiveNoZipResult()) {
                            queueReliableAutoZipLookup(`v108 late no-ZIP status ${delay}ms`);
                        }
                    }, delay);
                });
            }
            // v227: The foreground Auto pass is complete as soon as the immediate
            // Name/Email/City/Phone/State/ZIP work above has been issued. Reliability
            // timers (Email repaint, Area/ZIP recovery, canonicalizer) remain exactly
            // as before, but they are background safeguards and must not hold the UI
            // in a fake Working state for another three seconds.
            } catch (error) {
                console.warn("Toolbar AUTO location step failed; Email follow-up remains active.", error);
                frt7Progress("Location needs checking", progressRun);
            } finally {
                if (progressRun === frt7ProgressRun &&
                    frt7ProgressBar?.textContent !== "Location needs checking") {
                    frt7Progress("Done", progressRun);
                }
            }
        }

        if (autoBtn) {
            browser.storage.local.get(AUTO_KEY).then(result => {
                const enabled = Boolean(result[AUTO_KEY]);
                window.__frt7_auto_email_enabled = enabled;
                window.__frt7_auto_name_enabled = enabled;
                window.__frt7_auto_city_enabled = enabled;
                updateAutoButton(enabled);
                if (enabled) {
                    frt7Progress("Working… waiting for page");
                    // Start Auto through the shared v181 true-500ms readiness gate for ALL fields.
                    frt7ScheduleAfterApplicantSettles(() => runAutoFixOnce(), "initial page load");
                } else {
                    frt7Progress("Auto off");
                }
            });

            autoBtn.addEventListener("change", async () => {
                const enabled = Boolean(autoBtn.checked);
                await browser.storage.local.set({ [AUTO_KEY]: enabled });
                window.__frt7_auto_email_enabled = enabled;
                window.__frt7_auto_name_enabled = enabled;
                window.__frt7_auto_city_enabled = enabled;
                updateAutoButton(enabled);
                if (enabled) {
                    frt7BeginProgress("Working… waiting for page");
                    autoRunCompleted = false;
                    frt7ScheduleAfterApplicantSettles(() => runAutoFixOnce(), "Auto switched ON", { settleMs: 120, maxWaitMs: 900 });
                } else {
                    frt7BeginProgress("Auto off");
                    if (delayedEmailClickTimer) {
                        clearTimeout(delayedEmailClickTimer);
                        delayedEmailClickTimer = null;
                    }
                    if (delayedNameClickTimer) {
                        clearTimeout(delayedNameClickTimer);
                        delayedNameClickTimer = null;
                    }
                    if (delayedCityClickTimer) {
                        clearTimeout(delayedCityClickTimer);
                        delayedCityClickTimer = null;
                    }
                    if (frt7AutoZipRetryTimer) {
                        clearTimeout(frt7AutoZipRetryTimer);
                        frt7AutoZipRetryTimer = null;
                    }
                }
            });
        }



        if (nameBtn) nameBtn.addEventListener("click", async () => {
            // Capture Auto context synchronously before the async storage wait.
            // Auto deliberately clicks this same button, so this preserves its
            // Auto-only learning behavior without creating a separate code path.
            const autoClick = window.__frt7_auto_name_click_in_progress === true;
            const firstBeforeInput =
                document.querySelector("#txtFirstNameDataEntry") ||
                document.querySelector("#txtFirstName");
            const lastBeforeInput =
                document.querySelector("#txtLastNameDataEntry") ||
                document.querySelector("#txtLastName");
            const beforeAutoName = autoClick ? {
                first: String(firstBeforeInput?.value || "").trim(),
                last: String(lastBeforeInput?.value || "").trim()
            } : null;

            await rejectedAutoNamesReady;

            // v48: Revert may have happened WHILE this handler was awaiting.
            if (autoClick && window.__frt7_name_reverted === true) {
                console.info("Toolbar NAME v48: cancelled in-flight Auto Name click after Revert.");
                return;
            }

            fillNameFields({ auto: autoClick });
            if (autoClick) scheduleRenderedNameRefinement();

            if (autoClick && beforeAutoName) {
                const firstAfterInput =
                    document.querySelector("#txtFirstNameDataEntry") ||
                    document.querySelector("#txtFirstName");
                const lastAfterInput =
                    document.querySelector("#txtLastNameDataEntry") ||
                    document.querySelector("#txtLastName");
                const afterFirst = String(firstAfterInput?.value || "").trim();
                const afterLast = String(lastAfterInput?.value || "").trim();

                if (beforeAutoName.first !== afterFirst || beforeAutoName.last !== afterLast) {
                    showNameChangedToast();
                }
            }
        });
        if (emailBtn) emailBtn.addEventListener("click", fillEmailField);
        if (phoneBtn) phoneBtn.addEventListener("click", event => {
            // A real click on the toolbar Phone button is an explicit user request
            // and may intentionally replace a previous manual edit. Auto-generated
            // .click() calls are not trusted and therefore never bypass the lock.
            const trustedManualClick = Boolean(event?.isTrusted);
            if (trustedManualClick) window.__frt7_manual_phone_button_click_in_progress = true;
            try {
                fillPhoneField();
            } finally {
                if (trustedManualClick) window.__frt7_manual_phone_button_click_in_progress = false;
            }
        });
        if (locBtn) locBtn.addEventListener("click", event => {
            // v155 AREA HARD STOP AT THE BUTTON ITSELF:
            // A REAL human Area click remains exactly as before and may intentionally
            // override the resume. A synthetic .click() from Auto is only a fallback
            // and MUST re-check the true header before the first write AND every retry.
            const trustedManualClick = Boolean(event?.isTrusted);
            const keyAtClick = getApplicantLifecycleKey();
            const startedAt = Date.now();

            const attempt = () => {
                if (keyAtClick && getApplicantLifecycleKey() !== keyAtClick) return;

                if (!trustedManualClick) {
                    const resumeTextNow = getResumeText();
                    const headerLoc = getAuthoritativeHeaderLocationForAuto(resumeTextNow);
                    const headerState = String(headerLoc?.state || "").trim().toUpperCase();

                    if (headerLoc?.city && /^[A-Z]{2}$/.test(headerState)) {
                        const c = document.getElementById("txtCityDataEntry");
                        const st = document.getElementById("txtStateDataEntry");
                        const z = document.getElementById("txtZipDataEntry");
                        const lookup = document.getElementById("txtZipLookupEntry");

                        if (
                            c && st &&
                            !isManualContactLocked("city", c) &&
                            !isManualContactLocked("state", st)
                        ) {
                            const wantedCity = normalizeContactDisplayCase(headerLoc.city);
                            if (normalizeContactDisplayCase(String(c.value || "").trim()) !== wantedCity) {
                                c.value = wantedCity;
                                triggerEvents(c);
                            }
                            if (String(st.value || "").trim().toUpperCase() !== headerState) {
                                st.value = headerState;
                                triggerEvents(st);
                            }

                            try {
                                frt7SetAuthoritativeHeaderLocation(
                                    { ...headerLoc, city: wantedCity, state: headerState },
                                    "synthetic Area hard stop"
                                );
                            } catch (_) {}

                            if (z && !String(z.value || "").trim() && lookup) {
                                lookup.value = `${wantedCity}, ${headerState}`;
                                runConfirmedZipLookup(
                                    { city: wantedCity, state: headerState },
                                    { zipStatus: "blank" }
                                );
                            }
                        }

                        console.info(
                            `Toolbar AREA v155: synthetic Area click/retry BLOCKED; header wins -> ` +
                            `${normalizeContactDisplayCase(headerLoc.city)}, ${headerState}.`
                        );
                        return;
                    }
                }

                // Human click, or Auto with genuinely no trusted header location.
                // v257: a real human click may intentionally override the half-address guard;
                // every synthetic Auto click remains subject to the final hard stop.
                fillLocationFromPhone(trustedManualClick);

                const sourcePhone = String(getAreaSourcePhone() || "").replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
                const area = sourcePhone.length >= 3 ? sourcePhone.slice(0, 3) : "";
                loadCustomAreaCodes();
                const info = area ? (customAreaCodesCache[area] || AREA_CODE_LOOKUP?.[area]) : null;
                if (info) {
                    const c = document.getElementById("txtCityDataEntry");
                    const st = document.getElementById("txtStateDataEntry");
                    const cityOK = normalizeContactDisplayCase(String(c?.value || "").trim()) === normalizeContactDisplayCase(info.city);
                    const stateOK = String(st?.value || "").trim().toUpperCase() === String(info.state || "").trim().toUpperCase();
                    if (cityOK && stateOK) return;
                }

                if (Date.now() - startedAt < 2000) setTimeout(attempt, 500);
            };
            attempt();
        });
		if (locCityStateBtn) locCityStateBtn.addEventListener("click", runManualCityStateZipLikeAuto);
		if (cityOnlyBtn) cityOnlyBtn.addEventListener("click", () => {
    // v198: Manual City uses the same trusted/saved City resolver as Auto, but STRICTLY
    // writes City only. State, ZIP and ZIP Lookup are deliberately untouched.
    fillCityOnlyFromResume({
        trustedOnly: true,
        manualButton: true,
        cityOnlyStrict: true
    });
});
if (revertNameBtn) revertNameBtn.addEventListener("click", () =>
    revertOriginalValues({ name: true })
);
if (revertEmailBtn) revertEmailBtn.addEventListener("click", () =>
    revertOriginalValues({ email: true })
);


// v353: Expose a closure-safe dispatch to the outer applicant-change handler.
// Reuse the existing Auto settings, name protections, and full unified runner.
frt7RunScopedAuto = async (reason = "applicant changed") => {
    console.info(`Toolbar AUTO v353: scoped dispatch entered (${reason}).`);
    const fields = await getAutoFields();
    console.info(`Toolbar AUTO NAME v353: enabled=${Boolean(fields.name)}; iframeLength=${String(getResumeText() || "").length}; nameButton=${Boolean(document.getElementById("frt7-name-btn"))}.`);
    await runAutoFixOnce();
    console.info("Toolbar AUTO v353: scoped runner returned.");
};

// 📍 Pin toggle
if (pinBtn) {
    pinBtn.addEventListener("click", () => {
        isPinned = !isPinned;
        browser.storage.local.set({ frt7_pinned: isPinned });
        pinBtn.style.opacity = isPinned ? "0.5" : "1";
    });
}



    }




    function resetAutoEditFlagsForNewApplicant() {
        // v48: A Revert lock belongs only to the applicant on which it was pressed.
        // This function is called only after a genuine applicant lifecycle change.
        window.__frt7_name_reverted = false;
        if (window.__frt7_reverted_fields) {
            window.__frt7_reverted_fields.name = false;
        }

        const selectors = [
            "#txtEmail",
            "#txtPhoneDataEntry", "#txtPhone",
            "#txtFirstNameDataEntry", "#txtFirstName",
            "#txtLastNameDataEntry", "#txtLastName",
            "#txtCityDataEntry",
            "#txtStateDataEntry",
            "#txtZipDataEntry"
        ];
        for (const selector of selectors) {
            const el = document.querySelector(selector);
            if (el) {
                delete el.dataset.frt7UserEdited;
                delete el.dataset.frt7UserEditedKey;
            }
        }
        delayedEmailClickSignature = "";
        delayedNameClickSignature = "";
        delayedCityClickSignature = "";
    }

    // AUTO CONTACT LIFECYCLE v17
    //
    // WallStJobs can replace one applicant with another inside the SAME document.
    // Relying only on a partial resume-text fingerprint can miss that transition,
    // which leaves the prior applicant's manual-edit flag/state behind and makes
    // Auto Email appear to "die" until a full refresh.
    //
    // Treat either of these as authoritative evidence of a new applicant:
    //   1) the ?app= applicant ID changes, OR
    //   2) the complete raw-resume fingerprint changes.
    //
    // Then reset per-applicant edit/signature state and queue the SAME literal
    // Name/Email/City toolbar-button clicks used everywhere else.
    // v143 PERFORMANCE-ONLY FINGERPRINT CACHE:
    // Keep the exact full-text FNV fingerprint and therefore the exact applicant-change
    // semantics, but do not hash every character again when the resume text is unchanged.
    let frt7FingerprintCacheRaw = null;
    let frt7FingerprintCacheValue = "";

    function getRawResumeFingerprint() {
        const raw = String(getResumeText() || "");
        if (!raw.trim()) {
            frt7FingerprintCacheRaw = null;
            frt7FingerprintCacheValue = "";
            return "";
        }

        if (raw === frt7FingerprintCacheRaw) return frt7FingerprintCacheValue;

        // Use the full raw text in the fingerprint. A small first/last slice can
        // collide across templated resumes and can also miss in-place updates.
        let hash = 2166136261;
        for (let i = 0; i < raw.length; i++) {
            hash ^= raw.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }

        frt7FingerprintCacheRaw = raw;
        frt7FingerprintCacheValue = `${raw.length}|${hash >>> 0}`;
        return frt7FingerprintCacheValue;
    }

    function getApplicantLifecycleKey() {
        const appId = getCurrentApplicantId();
        const fingerprint = getRawResumeFingerprint();
        if (!appId && !fingerprint) return "";
        return `${appId || "no-app-id"}||${fingerprint || "no-resume"}`;
    }

    let frt7ObservedApplicantId = getCurrentApplicantId();
    // v99 OTHER-ADDON DROPDOWN INTERACTION GUARD:
    // The toolbar has several reliability heartbeats that watch for late WallStJobs
    // repaints. They must NEVER click/change/focus fields while the user is actively
    // using a dropdown (including dropdowns created by another userscript/addon).
    let frt7DropdownQuietUntil = 0;

    function frt7LooksLikeDropdownControl(el) {
        if (!(el instanceof Element)) return false;
        return Boolean(el.closest(
            "select, [role='combobox'], [role='listbox'], [role='menu'], " +
            "[aria-haspopup='listbox'], [aria-haspopup='menu'], [aria-expanded='true']"
        ));
    }

    function frt7OtherAddonDropdownInteractionActive() {
        const active = document.activeElement;
        if (frt7LooksLikeDropdownControl(active)) return true;
        if (Date.now() < frt7DropdownQuietUntil) return true;

        // Also honor an open custom dropdown even when it moves focus to the body.
        const open = document.querySelector(
            "[role='combobox'][aria-expanded='true'], [aria-haspopup='listbox'][aria-expanded='true'], " +
            "[aria-haspopup='menu'][aria-expanded='true'], [role='listbox']:not([hidden]), [role='menu']:not([hidden])"
        );
        return Boolean(open);
    }

    // A trusted interaction with a dropdown gets a short quiet window as insurance
    // against custom menus that briefly remove/recreate their popup DOM.
    for (const type of ["pointerdown", "mousedown", "keydown"]) {
        document.addEventListener(type, event => {
            if (!event.isTrusted || !frt7LooksLikeDropdownControl(event.target)) return;
            frt7DropdownQuietUntil = Date.now() + 3000;
        }, true);
    }

    let frt7ObservedResumeFingerprint = getRawResumeFingerprint();
    let frt7LastLifecycleKey = getApplicantLifecycleKey();

    // v149 PAGE-FIRST AUTO:
    // Let WallStJobs and the resume iframe finish their own paint BEFORE Auto begins.
    // This avoids fighting the site's staged contact-field repaint and also avoids doing
    // expensive city/name/email work during the visible page-load phase.
    //
    // The companion iframe-mask userscript is safe with this: it listens to the same
    // iframe load event for its curtain, while this toolbar waits an additional short
    // settle period before touching contact fields.
    let frt7SettledAutoTimer = null;
    let frt7SettledAutoToken = 0;

    function frt7ScheduleAfterApplicantSettles(callback, reason = "auto", options = {}) {
        frt7BeginProgress("Working… waiting for page");
        const token = ++frt7SettledAutoToken;

        // v216 FAST LOAD (performance-only):
        // Start a short 125ms stability window as soon as the NEW raw resume text and the
        // contact inputs needed by Auto exist. Do NOT wait for document.readyState
        // to become "complete", and do NOT restart the timer when the resume iframe loads.
        //
        // This scheduler is shared by ALL Auto fields:
        // Name, Email, Phone, City, State and ZIP/ZIP Lookup.
        const settleMs = Number(options.settleMs ?? 125);
        const maxWaitMs = Number(options.maxWaitMs || 8000);
        const startedAt = Date.now();

        if (frt7SettledAutoTimer) {
            clearTimeout(frt7SettledAutoTimer);
            frt7SettledAutoTimer = null;
        }

        let readyKey = "";
        let readySince = 0;

        const cleanup = () => {
            if (frt7SettledAutoTimer) {
                clearTimeout(frt7SettledAutoTimer);
                frt7SettledAutoTimer = null;
            }
        };

        const scheduleCheck = delay => {
            if (token !== frt7SettledAutoToken) return;
            if (frt7SettledAutoTimer) clearTimeout(frt7SettledAutoTimer);
            frt7SettledAutoTimer = setTimeout(check, delay);
        };

        const check = () => {
            frt7SettledAutoTimer = null;
            if (token !== frt7SettledAutoToken) return cleanup();

            const raw = String(getResumeText() || "");
            const key = getApplicantLifecycleKey();

            const firstInput =
                document.querySelector("#txtFirstNameDataEntry") ||
                document.querySelector("#txtFirstName");
            const lastInput =
                document.querySelector("#txtLastNameDataEntry") ||
                document.querySelector("#txtLastName");
            const emailInput = document.querySelector("#txtEmail");
            const phoneInput =
                document.querySelector("#txtPhoneDataEntry") ||
                document.querySelector("#txtPhone");
            const cityInput = document.querySelector("#txtCityDataEntry");
            const stateInput = document.querySelector("#txtStateDataEntry");
            const zipInput = document.querySelector("#txtZipDataEntry");

            const fieldsReady = Boolean(
                firstInput &&
                lastInput &&
                emailInput &&
                phoneInput &&
                cityInput &&
                stateInput &&
                zipInput
            );

            const readyNow = Boolean(document.readyState === "complete" && key && raw.trim() && fieldsReady);

            if (!readyNow) {
                readyKey = "";
                readySince = 0;

                if (Date.now() - startedAt >= maxWaitMs) {
                    console.warn(`Toolbar AUTO v181: readiness not reached within ${maxWaitMs}ms (${reason}).`);
                    frt7Progress("Waiting for resume — Auto did not run");
                    cleanup();
                    return;
                }

                scheduleCheck(40);
                return;
            }

            // If the applicant/resume identity changes while we're waiting,
            // restart the short stability window for the NEW content only.
            if (key !== readyKey) {
                readyKey = key;
                readySince = Date.now();
            }

            if (Date.now() - readySince >= settleMs) {
                cleanup();
                window.__frt7_page_first_loaded = true;
                console.info(
                    `Toolbar AUTO v181: raw resume + contact fields ready; ` +
                    `running ALL Auto fields after ${settleMs}ms (${reason}).`
                );
                try { callback(); } catch (error) {
                    console.warn("Toolbar AUTO v181 callback failed.", error);
                }
                return;
            }

            scheduleCheck(40);
        };

        scheduleCheck(0);
    }

    async function handleDetectedApplicantChange(reason) {
        // v181 UNIFIED APPLICANT CHANGE:
        // Full page loads and same-document Next/Prior Sales/etc. now use the EXACT
        // same Auto path. Once the new raw resume + contact fields are present,
        // wait only for the short v216 stability window, reset per-applicant manual locks, and run the full Auto pass.
        //
        // This fixes the old split behavior where same-document transitions skipped
        // Name/Email and only ran a partial City/Phone/State/ZIP path.
        const loadedLastNow = String(
            document.querySelector("#txtLastNameDataEntry")?.value ||
            document.querySelector("#txtLastName")?.value || ""
        ).trim();
        if (loadedLastNow) {
            window.__frt7_initial_loaded_last_name = loadedLastNow;
        }

        frt7ScheduleAfterApplicantSettles(async () => {
            autoRunCompleted = false;
            resetAutoEditFlagsForNewApplicant();

            // v208 LOCATION REVERT BASELINE:
            // Capture City/State/ZIP only AFTER the new applicant's fields have settled,
            // but BEFORE Auto is allowed to change them. Name/Email/Phone behavior is
            // intentionally untouched.
            window.__frt7_original = {
                ...(window.__frt7_original || {}),
                city: document.querySelector("#txtCityDataEntry")?.value || "",
                state: document.querySelector("#txtStateDataEntry")?.value || "",
                zip: document.querySelector("#txtZipDataEntry")?.value || ""
            };

            frt7DiagRecordForCurrent(true);
            frt7DiagAdd(`NEW APPLICANT: ${reason}. Starting unified Auto pass.`);
            console.info(`Toolbar AUTO v181: detected new applicant (${reason}); running unified Auto pass.`);
            // v353: Call the bridge installed by createToolbar, not private
            // functions that are out of scope in this lifecycle callback.
            try {
                if (typeof frt7RunScopedAuto !== "function") {
                    console.warn("Toolbar AUTO v353: scoped runner not ready; retrying after toolbar initialization.");
                    setTimeout(() => {
                        if (typeof frt7RunScopedAuto === "function") {
                            frt7RunScopedAuto("late toolbar initialization").catch(err => console.error("Toolbar AUTO v353: late dispatch failed", err));
                        } else console.error("Toolbar AUTO v353: scoped runner still unavailable.");
                    }, 300);
                } else await frt7RunScopedAuto(reason);
            } catch (err) { console.error("Toolbar AUTO v353: scoped dispatch failed", err); }
        }, reason);
    }

    // v112 PERFORMANCE-ONLY SHARED HEARTBEAT SCHEDULER:
    // Preserve every existing heartbeat's original 750ms / 1000ms cadence and
    // callback logic, but let ONE timeout scheduler wake Firefox for all of them.
    // Jobs that become due together are dispatched together. No decision rules,
    // retry windows, button clicks, or field logic are changed.
    const frt7SharedIntervalJobs = new Set();
    let frt7SharedIntervalTimer = null;

    function frt7ArmSharedIntervalTimer() {
        if (frt7SharedIntervalTimer !== null || !frt7SharedIntervalJobs.size) return;

        const now = performance.now();
        let nextDue = Infinity;
        for (const job of frt7SharedIntervalJobs) {
            if (job.nextDue < nextDue) nextDue = job.nextDue;
        }

        const delay = Math.max(0, nextDue - now);
        frt7SharedIntervalTimer = setTimeout(frt7RunSharedIntervalJobs, delay);
    }

    function frt7RunSharedIntervalJobs() {
        frt7SharedIntervalTimer = null;
        const now = performance.now();

        // v149 PAGE-FIRST PERFORMANCE:
        // During a real navigation, let WallStJobs + resume iframe + the user's mask
        // userscript finish loading before any recurring toolbar heartbeat callbacks run.
        // Once readyState is complete this scheduler behaves exactly as before.
        if (document.readyState !== "complete") {
            for (const job of frt7SharedIntervalJobs) {
                if (job.nextDue <= now + 1) job.nextDue = now + job.intervalMs;
            }
            frt7ArmSharedIntervalTimer();
            return;
        }

        for (const job of frt7SharedIntervalJobs) {
            if (job.nextDue > now + 1) continue;

            // Match setInterval's practical browser behavior after a delayed/busy
            // period: run once, then resume the normal cadence instead of bursting.
            job.nextDue += job.intervalMs;
            if (job.nextDue <= now) job.nextDue = now + job.intervalMs;

            try {
                job.callback();
            } catch (error) {
                console.warn("Toolbar v112 shared heartbeat callback error.", error);
            }
        }

        frt7ArmSharedIntervalTimer();
    }

    function frt7SharedInterval(callback, intervalMs) {
        const job = {
            callback,
            intervalMs,
            nextDue: performance.now() + intervalMs
        };
        frt7SharedIntervalJobs.add(job);

        // A newly registered job may be due before the currently armed timeout.
        if (frt7SharedIntervalTimer !== null) {
            clearTimeout(frt7SharedIntervalTimer);
            frt7SharedIntervalTimer = null;
        }
        frt7ArmSharedIntervalTimer();
        return job;
    }


    // v210 STRICT PHONE FIELD LOAD GUARD:
    // Registered only after the shared scheduler itself is fully initialized.
    // This avoids the startup failure in the v209 draft.
    let frt7StrictPhoneBusyV210 = false;
    let frt7StrictPhoneKeyV210 = "";
    let frt7StrictPhoneStartedAtV210 = 0;

    frt7SharedInterval(() => {
        if (frt7StrictPhoneBusyV210) return;

        const key = getApplicantLifecycleKey();
        if (!key) return;
        if (key !== frt7StrictPhoneKeyV210) {
            frt7StrictPhoneKeyV210 = key;
            frt7StrictPhoneStartedAtV210 = Date.now();
        }

        // Guard only the initial load/repaint window so a late site repaint cannot
        // restore a 7-digit value, while normal human typing later is left alone.
        if (Date.now() - frt7StrictPhoneStartedAtV210 > 2500) return;

        const phoneInput = document.querySelector("#txtPhoneDataEntry") || document.querySelector("#txtPhone");
        if (!phoneInput) return;

        const current = String(phoneInput.value || "").trim();
        if (!current) return;

        let digits = current.replace(/\D/g, "");
        let replacement = null;
        if (digits.length === 11 && digits.startsWith("1")) {
            replacement = digits.slice(1);
        } else if (digits.length !== 10) {
            replacement = "";
        } else {
            return;
        }

        frt7StrictPhoneBusyV210 = true;
        window.__frt7_internal_phone_write_in_progress = true;
        try {
            phoneInput.value = replacement;
            triggerEvents(phoneInput);
            window.__frt7_last_phone = replacement;
            console.info(
                replacement
                    ? `Toolbar PHONE v210: normalized +1 phone to 10 digits (${replacement}).`
                    : `Toolbar PHONE v210: cleared invalid ${digits.length}-digit phone field.`
            );
        } finally {
            window.__frt7_internal_phone_write_in_progress = false;
            frt7StrictPhoneBusyV210 = false;
        }
    }, 250);

    frt7SharedInterval(() => {
        if (frt7OtherAddonDropdownInteractionActive()) return;
        const currentApplicantId = getCurrentApplicantId();
        const currentFingerprint = getRawResumeFingerprint();

        // v145 PERFORMANCE: we already have both pieces. Do not immediately call
        // getApplicantLifecycleKey(), which would read/hash-check the resume again.
        const currentLifecycleKey =
            (currentApplicantId || currentFingerprint)
                ? `${currentApplicantId || "no-app-id"}||${currentFingerprint || "no-resume"}`
                : "";

        const applicantIdChanged = Boolean(
            currentApplicantId &&
            frt7ObservedApplicantId &&
            currentApplicantId !== frt7ObservedApplicantId
        );
        const resumeChanged = Boolean(
            currentFingerprint &&
            currentFingerprint !== frt7ObservedResumeFingerprint
        );

        // Update observations even when one side of the page is still loading.
        if (currentApplicantId) frt7ObservedApplicantId = currentApplicantId;
        if (currentFingerprint) frt7ObservedResumeFingerprint = currentFingerprint;

        if (!applicantIdChanged && !resumeChanged) return;
        if (currentLifecycleKey && currentLifecycleKey === frt7LastLifecycleKey) return;

        frt7LastLifecycleKey = currentLifecycleKey;
        handleDetectedApplicantChange(
            applicantIdChanged && resumeChanged ? "applicant ID + resume changed" :
            applicantIdChanged ? "applicant ID changed" :
            "raw resume changed"
        );
    }, 250);


    // AUTO CONTACT WATCHDOG v18
    //
    // The event-style lifecycle detector above is fast, but WallStJobs sometimes
    // mutates the review page in an order where a transition can be missed. A full
    // browser refresh then appears to "fix" Auto because the userscript starts over.
    //
    // This watchdog does not need to catch the transition. It continuously asks:
    // "Is there a complete applicant/resume here that I have not handled?" Once the
    // same lifecycle key is stable for a short moment, it re-arms Auto for that
    // applicant. This makes Auto self-healing instead of refresh-dependent.
    let frt7WatchdogCandidateKey = "";
    let frt7WatchdogCandidateSince = 0;
    let frt7WatchdogHandledKey = getApplicantLifecycleKey();
    let frt7WatchdogBusy = false;

    frt7SharedInterval(async () => {
        if (frt7OtherAddonDropdownInteractionActive()) return;
        if (frt7WatchdogBusy) return;

        const key = getApplicantLifecycleKey();
        const raw = String(getResumeText() || "");
        if (!key || !raw.trim()) {
            frt7WatchdogCandidateKey = "";
            frt7WatchdogCandidateSince = 0;
            return;
        }

        if (key !== frt7WatchdogCandidateKey) {
            frt7WatchdogCandidateKey = key;
            frt7WatchdogCandidateSince = Date.now();
            return;
        }

        // Give the site a moment to finish replacing its contact fields.
        if (Date.now() - frt7WatchdogCandidateSince < 700) return;
        if (key === frt7WatchdogHandledKey) return;

        frt7WatchdogBusy = true;
        try {
            const state = await browser.storage.local.get(AUTO_KEY);
            if (!Boolean(state[AUTO_KEY])) {
                frt7WatchdogHandledKey = key;
                return;
            }

            // Mark only after Auto has been re-armed for this exact stable key.
            await handleDetectedApplicantChange("persistent watchdog");
            frt7WatchdogHandledKey = key;
            frt7LastLifecycleKey = key;

            // v208: Keep the pre-Auto City/State/ZIP baseline captured by
            // handleDetectedApplicantChange(). The watchdog may still refresh the
            // existing Name/Email/Phone baseline exactly as before, but it must NOT
            // replace location originals with Auto's resulting values.
            window.__frt7_original = {
                ...(window.__frt7_original || {}),
                first: document.querySelector("#txtFirstNameDataEntry")?.value || document.querySelector("#txtFirstName")?.value || "",
                last: document.querySelector("#txtLastNameDataEntry")?.value || document.querySelector("#txtLastName")?.value || "",
                email: document.querySelector("#txtEmail")?.value || "",
                phone: document.querySelector("#txtPhoneDataEntry")?.value || document.querySelector("#txtPhone")?.value || ""
            };
        } catch (error) {
            console.warn("Toolbar AUTO watchdog: recovery pass failed; will retry.", error);
            // Do not mark handled on failure; the next heartbeat gets another try.
        } finally {
            frt7WatchdogBusy = false;
        }
    }, 1000);



    // v39 LEARN CITY/ST THAT WAS ALREADY CORRECT ON LOAD
    //
    // If a resume opens with City + State already filled, and the user leaves that
    // applicant without changing the City/State, treat that existing location as
    // trusted and save it to the SAME learned-city database.
    //
    // We save when the applicant lifecycle key changes, because only then do we
    // know the user truly left the prior City/State alone. This avoids prematurely
    // learning a bad prefilled city that the user corrects a moment later.
    //
    // Capitalization-only changes do not disqualify the city; comparisons are
    // normalized. Auto/manual City replacement DOES disqualify it because the final
    // city will differ from the originally loaded city.
    let frt7LoadedCityLearnKey = "";
    let frt7LoadedCityInitial = null;
    let frt7LoadedCityHumanEdited = false;
    let frt7LoadedStateHumanEdited = false;
    let frt7LoadedCityWatchBoundKey = "";

    function snapshotLoadedCityForLearning(key) {
        const cityInput = document.getElementById("txtCityDataEntry");
        const stateInput = document.getElementById("txtStateDataEntry");

        frt7LoadedCityLearnKey = key || "";
        frt7LoadedCityInitial = {
            city: normalizeContactDisplayCase(String(cityInput?.value || "").trim()),
            state: String(stateInput?.value || "").trim().toUpperCase()
        };
        frt7LoadedCityHumanEdited = false;
        frt7LoadedStateHumanEdited = false;

        if (frt7LoadedCityWatchBoundKey !== key) {
            frt7LoadedCityWatchBoundKey = key;

            cityInput?.addEventListener("input", event => {
                if (event.isTrusted) frt7LoadedCityHumanEdited = true;
            });
            cityInput?.addEventListener("change", event => {
                if (event.isTrusted) frt7LoadedCityHumanEdited = true;
            });

            stateInput?.addEventListener("input", event => {
                if (event.isTrusted) frt7LoadedStateHumanEdited = true;
            });
            stateInput?.addEventListener("change", event => {
                if (event.isTrusted) frt7LoadedStateHumanEdited = true;
            });
        }
    }

    async function learnPreviousLoadedCityIfStillUntouched() {
        if (!frt7LoadedCityInitial?.city) return false;
        if (!/^[A-Z]{2}$/.test(frt7LoadedCityInitial.state || "")) return false;
        if (frt7LoadedCityHumanEdited || frt7LoadedStateHumanEdited) return false;

        const cityInput = document.getElementById("txtCityDataEntry");
        const stateInput = document.getElementById("txtStateDataEntry");

        const currentCity = normalizeContactDisplayCase(String(cityInput?.value || "").trim());
        const currentState = String(stateInput?.value || "").trim().toUpperCase();

        // If any City/ST logic actually replaced the loaded location, don't learn
        // the old website value. Pure case normalization still compares equal.
        if (currentCity !== frt7LoadedCityInitial.city) return false;
        if (currentState !== frt7LoadedCityInitial.state) return false;

        const ok = await learnCity(frt7LoadedCityInitial.city, frt7LoadedCityInitial.state);
        if (ok) {
            console.info(
                `Toolbar trusted cities v39: learned unchanged loaded city ` +
                `"${frt7LoadedCityInitial.city}, ${frt7LoadedCityInitial.state}".`
            );
        }
        return ok;
    }

    frt7SharedInterval(async () => {
        if (frt7OtherAddonDropdownInteractionActive()) return;
        const key = getApplicantLifecycleKey();
        if (!key) return;

        if (!frt7LoadedCityLearnKey) {
            // Let WallStJobs finish painting the contact fields before snapshotting.
            setTimeout(() => {
                if (getApplicantLifecycleKey() === key && !frt7LoadedCityLearnKey) {
                    snapshotLoadedCityForLearning(key);
                }
            }, 500);
            return;
        }

        if (key !== frt7LoadedCityLearnKey) {
            // v46: no transition-time city learning. The final City field is saved
            // synchronously on approved workflow actions instead, including after Revert.

            // Snapshot the NEW applicant after its contact fields settle.
            frt7LoadedCityLearnKey = key;
            frt7LoadedCityInitial = null;
            frt7LoadedCityHumanEdited = false;
            frt7LoadedStateHumanEdited = false;

            setTimeout(() => {
                if (getApplicantLifecycleKey() === key) {
                    snapshotLoadedCityForLearning(key);
                }
            }, 500);
        }
    }, 750);

    // v36 CAPITALIZATION-ONLY RECONCILER
    //
    // This is intentionally independent of the Auto field toggles.
    // Turning City OFF means "do not choose/replace the city"; it does NOT mean
    // "leave ugly capitalization alone." The same rule applies to names/email.
    //
    // This pass ONLY changes letter casing in values already present on the page:
    //   OPA LOCKA -> Opa Locka
    //   DE LA CRUZ -> De La Cruz
    //   NAME@GMAIL.COM -> name@gmail.com
    // It never chooses a different city/name/email and never fills a blank field.
    //
    // Manual edits/Revert protection still wins because locked fields are skipped.
    let frt7CaseOnlyKey = "";
    let frt7CaseOnlyStartedAt = 0;

    function normalizeExistingContactCapitalizationOnly() {
        const firstInput =
            document.querySelector("#txtFirstNameDataEntry") ||
            document.querySelector("#txtFirstName");
        const lastInput =
            document.querySelector("#txtLastNameDataEntry") ||
            document.querySelector("#txtLastName");
        const emailInput = document.querySelector("#txtEmail");
        const cityInput = document.querySelector("#txtCityDataEntry");
        const stateInput = document.querySelector("#txtStateDataEntry");

        const normalizeField = (fieldKey, el, normalizer) => {
            if (!el || isManualContactLocked(fieldKey, el)) return false;

            const original = String(el.value || "").trim();
            if (!original) return false;

            const normalized = normalizer(original);
            if (!normalized || normalized === original) return false;

            el.value = normalized;
            triggerEvents(el);
            console.info(`Toolbar CASE v36: normalized existing ${fieldKey}: "${original}" -> "${normalized}"`);
            return true;
        };

        // v128: The recurring capitalization-only reconciler must use the SAME
        // two-initial rule as the Name pipeline. Otherwise it changes AJ back to Aj
        // a few seconds after Name correctly capitalizes it.
        normalizeField("first", firstInput, value =>
            normalizeFirstNameInitialsCase(normalizeContactDisplayCase(value))
        );
        normalizeField("last", lastInput, normalizeContactDisplayCase);
        // This is an internal normalization, not a popup/manual Email edit.
        if (emailInput && !isManualContactLocked("email", emailInput)) {
            runInternalEmailWrite(() => {
                normalizeField("email", emailInput, value => String(value || "").toLowerCase());
            });
        }
        if (!frt7HumanTouchedLocation()) {
            normalizeField("city", cityInput, normalizeContactDisplayCase);
            normalizeField("state", stateInput, value => String(value || "").toUpperCase());
        }
    }

    frt7SharedInterval(() => {
        if (frt7OtherAddonDropdownInteractionActive()) return;
        const key = getApplicantLifecycleKey();
        if (!key) return;

        if (key !== frt7CaseOnlyKey) {
            frt7CaseOnlyKey = key;
            frt7CaseOnlyStartedAt = Date.now();
        }

        // Retry briefly because WallStJobs sometimes paints contact fields in stages.
        // After 3 seconds the capitalization pass is done for this applicant.
        if (Date.now() - frt7CaseOnlyStartedAt > 2000) return;

        normalizeExistingContactCapitalizationOnly();
    }, 750);

    // AUTO NAME v178:
    // Repeating Name reconciler removed. Name Auto is intentionally one-shot only.
    // The single automatic Name click is issued from runAutoFixOnce() after the
    // normal applicant/page-settle gate. Nothing in this heartbeat section
    // may re-click or re-write First/Last afterward.

    // v419 DISPLAY ONLY: the site's phone-status check sometimes compares the
    // literal punctuation instead of the 10 digits. Correct a false red warning
    // only when the current contact phone matches the resume phone exactly by digits.
    // Never modify the phone field or override a genuine mismatch.
    frt7SharedInterval(() => {
        const status = document.getElementById("divCheckPhoneStatus");
        const phone = document.getElementById("txtPhoneDataEntry") || document.getElementById("txtPhone");
        if (!status || !phone) return;
        const digits = String(phone.value || "").replace(/\D/g, "");
        const raw = String(getResumeText() || "");
        if (!raw.trim() || !isUsableTenDigitPhone(digits)) return;
        const expected = extractPhone(raw);
        if (!expected || digits !== String(expected).replace(/\D/g, "")) return;
        if (/phone\s*#?\s*not found in resume/i.test(status.textContent || "")) {
            status.textContent = "Phone # OK.";
            status.style.color = "rgb(0, 170, 0)";
            console.info("Toolbar PHONE v419: corrected formatting-only false red status; resume and contact phone digits match.");
        }
    }, 750);

    // AUTO PHONE v28 — authoritative new-resume reconciler.
    // Phone previously ran only as a one-shot fill. WallStJobs can repaint the old
    // contact value after that fill, so Auto Phone now waits for the actual new
    // resume to stabilize, compares digits, and presses the SAME Phone button again
    // until the expected raw-resume number sticks.
    let frt7PhoneV28CandidateKey = "";
    let frt7PhoneV28CandidateSince = 0;
    let frt7PhoneV28LastSatisfiedKey = "";
    let frt7PhoneV28Busy = false;

    frt7SharedInterval(async () => {
        frt7FormatPhoneDisplay();
        if (frt7OtherAddonDropdownInteractionActive()) return;
        if (frt7PhoneV28Busy) return;

        const key = getApplicantLifecycleKey();
        const rawText = String(getResumeText() || "");
        const phoneInput = document.querySelector("#txtPhoneDataEntry") || document.querySelector("#txtPhone");
        const phoneBtn = document.getElementById("frt7-phone-btn");

        if (!key || !rawText.trim() || !phoneInput || !phoneBtn) {
            frt7PhoneV28CandidateKey = "";
            frt7PhoneV28CandidateSince = 0;
            return;
        }

        if (key !== frt7PhoneV28CandidateKey) {
            frt7PhoneV28CandidateKey = key;
            frt7PhoneV28CandidateSince = Date.now();
            if (key !== frt7PhoneV28LastSatisfiedKey) {
                delete phoneInput.dataset.frt7UserEdited;
                delete phoneInput.dataset.frt7UserEditedKey;
            }
            return;
        }

        if (Date.now() - frt7PhoneV28CandidateSince < 800) return;
        // v136 PERFORMANCE: do not keep reconciling this applicant after 2 seconds.
        if (Date.now() - frt7PhoneV28CandidateSince > 2000) return;

        frt7PhoneV28Busy = true;
        try {
            const stored = await browser.storage.local.get([AUTO_KEY, AUTO_FIELDS_KEY]);
            const masterEnabled = Boolean(stored[AUTO_KEY]);
            const fields = { ...DEFAULT_AUTO_FIELDS, ...(stored[AUTO_FIELDS_KEY] || {}) };
            const phoneEnabled = masterEnabled && Boolean(fields.phone);
            if (!phoneEnabled) return;

            if (isManualContactLocked("phone", phoneInput)) {
                frt7PhoneV28LastSatisfiedKey = key;
                return;
            }

            const expected = extractPhone(rawText);
            if (!expected) return;

            const actual = String(phoneInput.value || "").replace(/\D/g, "");
            if (actual === expected) {
                frt7PhoneV28LastSatisfiedKey = key;
                return;
            }

            console.info(`Toolbar AUTO PHONE v104: expected ${expected}; clicking the literal Phone button.`);
            phoneBtn.click();
            // Do not mark satisfied yet. The next heartbeat verifies that the site's
            // field retained the new value after any late repaint.
        } catch (error) {
            console.warn("Toolbar AUTO PHONE v28: retryable reconciler error.", error);
        } finally {
            frt7PhoneV28Busy = false;
        }
    }, 750);

    // v213 PERMANENT REFERENCE-PHONE SAFETY GUARD:
    // The ordinary Phone reconciler intentionally stops after the short applicant-load
    // window for performance. Reference numbers are different: they are categorically
    // invalid applicant contact data, so keep one lightweight guard alive for the whole
    // applicant. If WallStJobs repaints a known reference number later, immediately
    // restore the valid non-reference applicant phone, or clear the field if none exists.
    let frt7ReferencePhoneGuardBusy = false;
    frt7SharedInterval(() => {
        if (frt7ReferencePhoneGuardBusy) return;
        const phoneInput = document.querySelector("#txtPhoneDataEntry") || document.querySelector("#txtPhone");
        if (!phoneInput) return;

        let actual = String(phoneInput.value || "").replace(/\D/g, "");
        if (actual.length === 11 && actual.startsWith("1")) actual = actual.slice(1);
        if (actual.length !== 10) return;

        const raw = String(getResumeText() || "");
        if (!raw.trim()) return;
        const referencePhones = frt7CollectReferencePhones(raw);
        if (!referencePhones.has(actual)) return;

        const expected = extractPhone(raw);
        // If the same digits genuinely occur as the applicant's non-reference contact
        // phone too, extractPhone() will return them and they are safe to keep.
        if (expected === actual) return;

        // v285 SAFETY FIX: Never erase an already-populated, valid 10-digit phone just
        // because the reference-phone detector classified it as a reference and the
        // parser could not find a different applicant number.  That combination can be
        // a false positive (as seen with 239-692-7787).  The late guard may REPLACE a
        // reference phone only when extractPhone() has a real non-reference replacement.
        // With no replacement, preserve the site's existing valid phone unchanged.
        if (!expected) {
            console.info(`Toolbar PHONE v285: possible reference phone ${actual}, but no safe replacement exists; preserving existing valid phone.`);
            return;
        }

        frt7ReferencePhoneGuardBusy = true;
        window.__frt7_internal_phone_write_in_progress = true;
        try {
            phoneInput.value = expected;
            triggerEvents(phoneInput);
            window.__frt7_last_phone = expected;
            console.info(
                `Toolbar PHONE v213: removed late reference-phone repaint ${actual}; ` +
                `restored applicant phone ${expected}.`
            );
        } finally {
            window.__frt7_internal_phone_write_in_progress = false;
            frt7ReferencePhoneGuardBusy = false;
        }
    }, 750);


    // AUTO EMAIL v72 — independent trailing-junk field sanitizer
    //
    // This intentionally does NOT depend on the applicant lifecycle reconciler,
    // txtResumeRaw readiness, or whether the normal Auto Email click has already
    // marked an applicant handled. If Auto Email is ON and the currently displayed
    // field contains a complete email followed by underscore + numeric metadata,
    // clean that field directly using the SAME sanitizeEmail() used by the Email button.
    //
    // Example:
    //   kwilliams511@yahoo.com_1675113 -> kwilliams511@yahoo.com
    let frt7EmailV72Busy = false;
    frt7SharedInterval(async () => {
        if (frt7OtherAddonDropdownInteractionActive()) return;
        if (frt7EmailV72Busy) return;

        const emailInput = document.querySelector("#txtEmail");
        if (!emailInput) return;

        const current = String(emailInput.value || "").trim();
        if (!/@/.test(current) || !/_[0-9]+(?:\D.*)?$/i.test(current)) return;

        frt7EmailV72Busy = true;
        try {
            const stored = await browser.storage.local.get([AUTO_KEY, AUTO_FIELDS_KEY]);
            const masterEnabled = Boolean(stored[AUTO_KEY]);
            const fields = { ...DEFAULT_AUTO_FIELDS, ...(stored[AUTO_FIELDS_KEY] || {}) };
            if (!masterEnabled || !fields.email) return;

            // Never fight an intentional human edit on this applicant.
            if (isManualContactLocked("email", emailInput)) return;

            const before = String(emailInput.value || "").trim();
            if (cleanExistingEmailField(emailInput)) {
                const after = String(emailInput.value || "").trim();
                console.info(`Toolbar AUTO EMAIL v72: cleaned trailing metadata "${before}" -> "${after}".`);
            }
        } catch (error) {
            console.warn("Toolbar AUTO EMAIL v72: trailing-junk cleanup retryable error.", error);
        } finally {
            frt7EmailV72Busy = false;
        }
    }, 1000);

    // AUTO EMAIL v180:
    // Repeating Email reconciler removed. Email Auto is intentionally one-shot only.
    // The single automatic Email click is issued from runAutoFixOnce() after the
    // normal applicant/page-settle gate. No Email heartbeat may re-click it.

    // Record navigation actions that lead to another resume. On same-document
    // navigation this directly queues a fresh delayed click. On a normal page
    // navigation the new resume page will queue its own click after loading.
    document.addEventListener("click", event => {
        const control = event.target instanceof Element
            ? event.target.closest("button, input[type='button'], input[type='submit'], a[href]")
            : null;
        if (!control) return;

        // Selecting a resume from any review list.
        if (control.matches("a[href]")) {
            try {
                const url = new URL(control.href, location.href);
                if (
                    url.origin === location.origin &&
                    /\/review\/applicant_review\.asp$/i.test(url.pathname) &&
                    url.searchParams.get("app")
                ) {
                    sessionStorage.setItem("frt7_pending_delayed_contact", String(Date.now()));
                    // v157 PAGE-FIRST: never start Auto work from the outgoing click.
                    // The new-applicant lifecycle detector will start Auto only after the
                    // newly selected resume/contact fields are visibly loaded.
                    return;
                }
            } catch (e) {}
        }

        const rawLabel = control.tagName === "INPUT"
            ? control.value
            : control.textContent;
        const label = String(rawLabel || "")
            .replace(/\s+/g, " ")
            .trim()
            .toUpperCase();

        const workflowActions = new Set([
            "SAVE",
            "NEXT",
            "NEXT ->",
            "PRIOR SALES",
            "NON-SALES",
            "NON SALES",
            "MARK NG",
            "FORMAT ISSUE",
            "NOT IN U.S.",
            "NOT IN US",
            "NO LOCATION",
            "NG TECH"
        ]);

        if (workflowActions.has(label)) {
            sessionStorage.setItem("frt7_pending_delayed_contact", String(Date.now()));
            // v157 PAGE-FIRST / NO CLICK DELAY:
            // Never queue Name/Email/City from the outgoing workflow click.
            // Navigation gets the main thread immediately; the new-applicant lifecycle
            // detector starts Auto only after the next resume is visibly loaded.
        }
    }, true);

    function init() {
        // Only inject on pages that actually have the resume textarea
        if (!document.querySelector("#txtResumeRaw")) return;

        // Capture the page values immediately before the toolbar schedules Auto.
        window.__frt7_original = {
            first: document.querySelector("#txtFirstNameDataEntry")?.value || document.querySelector("#txtFirstName")?.value || "",
            last: document.querySelector("#txtLastNameDataEntry")?.value || document.querySelector("#txtLastName")?.value || "",
            email: document.querySelector("#txtEmail")?.value || "",
            phone: document.querySelector("#txtPhoneDataEntry")?.value || document.querySelector("#txtPhone")?.value || "",
            city: document.querySelector("#txtCityDataEntry")?.value || "",
            state: document.querySelector("#txtStateDataEntry")?.value || "",
            zip: document.querySelector("#txtZipDataEntry")?.value || ""
        };
        window.__frt7_reverted_fields = {};
        window.__frt7_name_reverted = false;
        createToolbar();
        frt7CreateProgressBar();

        // v157: persistence from the PRIOR applicant is deliberately deferred until
        // this new page is already initialized. It never runs in the navigation click.
        setTimeout(() => flushPendingWorkflowLearningV157(), 0);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
// ===== v359 TEAM SYNC BRIDGE: isolated from name/city/ZIP/email/phone rules =====
// All network sync is opt-in. No applicant records or UI preferences are uploaded.
(function installTeamSync() {
    if (window !== window.top) return; // v371: only one sync UI in the top document
    const URL = 'https://iwznzjgvlthyqsnxrbyo.supabase.co';
    const KEY = 'sb_publishable_jD7qGUrlv07T9S4xUEDsrg_i7fMshs3';
    const ROOT = 'frt7_team_sync_v339_';
    const CATEGORIES = {
        rejectedNames: REJECTED_AUTO_NAMES_SINGLE_DB_KEY,
        learnedCities: LEARNED_CITIES_SINGLE_DB_KEY,
        usCityDatabaseOverrides: US_CITY_DB_OVERRIDES_KEY,
        customAreaCodes: CUSTOM_AREA_CODES_KEY,
        safeFirstNames: SAFE_FIRST_NAMES_KEY,
        macLastNameCases: FRT7_MAC_LAST_NAME_CASE_KEY,
        nameCredentials: FRT7_NAME_CREDENTIALS_KEY
    };
    const get = (k, fallback) => GM_getValue(ROOT + k, fallback);
    const set = (k, value) => GM_setValue(ROOT + k, value);
    const parse = x => { try { const v = typeof x === 'string' ? JSON.parse(x || '{}') : x; return v && typeof v === 'object' && !Array.isArray(v) ? v : {}; } catch (_) { return {}; } };
    const stable = x => JSON.stringify(x === undefined ? null : x);
    let busy = false, status = 'Automatic sync status pending', panel;
    function say(message) { status = message; console.info('[Toolbar Team Sync]', message); if (panel) { const el = panel.querySelector('[data-sync-status]'); if (el) el.textContent = message; } }
    function readLocal() { const result = {}; for (const [cat,key] of Object.entries(CATEGORIES)) result[cat] = parse(GM_getValue(key,'{}')); return result; }
    function writeLocal(data) {
        // Keep live Settings lists and lookup caches consistent with downloaded records.
        for (const [cat,key] of Object.entries(CATEGORIES)) GM_setValue(key, JSON.stringify(data[cat] || {}));
        // Team Sync is in a separate closure from the Settings UI.
        // Notify the Settings owner instead of accessing its private variables.
        window.dispatchEvent(new Event('frt7:team-sync-data-updated'));
    }
    function request(method, path, body, token, headers = {}) {
        return new Promise((resolve,reject) => GM_xmlhttpRequest({
            method, url: URL + path, timeout: 30000,
            headers: { apikey: KEY, ...(token ? {Authorization:'Bearer '+token} : {}), ...(body ? {'Content-Type':'application/json'} : {}), ...headers },
            data: body ? JSON.stringify(body) : undefined,
            onload: r => {
                let result; try { result = JSON.parse(r.responseText || 'null'); } catch (_) { result = r.responseText; }
                // Report safe HTTP diagnostics in the Team Sync status itself.
                // Never display authorization headers, passwords, access tokens, or uploaded values.
                const isSharedItems = path.includes('/rest/v1/toolbar_shared_items');
                const responseText = String(r.responseText || '');
                const safeResponse = isSharedItems
                    ? (Array.isArray(result) ? 'JSON array ('+result.length+' rows)'
                       : (result && typeof result === 'object'
                          ? JSON.stringify({code:result.code,message:result.message,details:result.details,hint:result.hint}).slice(0,500)
                          : responseText.slice(0,300)))
                    : '';
                if (r.status < 200 || r.status >= 300) {
                    reject(new Error('HTTP '+r.status+(isSharedItems ? ' from Supabase: '+safeResponse : ': '+JSON.stringify(result).slice(0,250))));
                } else resolve({data:result, headers:r.responseHeaders||'', httpStatus:r.status, responseBytes:responseText.length, safeResponse});
            },
            onerror: () => reject(new Error('Network unavailable')), ontimeout: () => reject(new Error('Network timeout'))
        }));
    }
    async function token() {
        let session = parse(get('session','{}'));
        if (!session.access_token) throw new Error('Sign in first');
        if (session.expires_at && Date.now() > (session.expires_at - 90)*1000) {
            if (!session.refresh_token) throw new Error('Session expired: sign in again');
            const r = await request('POST','/auth/v1/token?grant_type=refresh_token',{refresh_token:session.refresh_token});
            session = {...r.data,expires_at:Math.floor(Date.now()/1000)+(r.data.expires_in||3600)};
            set('session',JSON.stringify(session));
        }
        return session.access_token;
    }
    async function authorized(t) {
        const r = await request('GET','/rest/v1/toolbar_members?select=user_id&limit=1',null,t);
        if (!Array.isArray(r.data) || !r.data.length) throw new Error('This Supabase account is not in toolbar_members');
    }
    async function signIn(email,password) {
        const r = await request('POST','/auth/v1/token?grant_type=password',{email,password});
        const session = {...r.data,expires_at:Math.floor(Date.now()/1000)+(r.data.expires_in||3600)};
        await authorized(session.access_token);
        set('session',JSON.stringify(session)); say('Signed in. Sync remains OFF until enabled.');
    }
    async function fetchRemote(t) {
        const all = new Map();
        for (let offset=0; offset<100000; offset+=500) {
            const r = await request('GET','/rest/v1/toolbar_shared_items?select=category,item_key,item_value,deleted,updated_at&order=category.asc,item_key.asc&limit=500&offset='+offset,null,t);
            const rows = r.data;
            if (!Array.isArray(rows)) throw new Error('Unexpected database response');
            for (const row of rows) all.set(row.category+'\u0000'+row.item_key,row);
            if (rows.length < 500) return all;
        }
        throw new Error('Remote row safety limit exceeded');
    }
    function flatten(data) {
        const out = new Map();
        for (const cat of Object.keys(CATEGORIES)) for (const [k,v] of Object.entries(data[cat]||{})) out.set(cat+'\u0000'+k,{category:cat,item_key:k,item_value:v,deleted:v?.deleted===true});
        return out;
    }
    function unflatten(map) {
        const out = {}; for (const cat of Object.keys(CATEGORIES)) out[cat] = {};
        for (const [id,row] of map) if (out[row.category] && !row.__absent) out[row.category][row.item_key] = row.item_value;
        return out;
    }
    async function upload(t,rows,seedOnly=false) {
        // v343: Probe ONE record first. Never send an entire backup until we
        // independently confirm that the first row exists in the database.
        // Supabase/PostgREST can return HTTP 201 with [] even when the client
        // requested a representation; response length alone is not proof.
        const batches = [];
        if (seedOnly && rows.length) {
            batches.push(rows.slice(0,1));
            for (let i=1; i<rows.length; i+=80) batches.push(rows.slice(i,i+80));
        } else {
            for (let i=0; i<rows.length; i+=80) batches.push(rows.slice(i,i+80));
        }
        let completed=0;
        for (let batch=0; batch<batches.length; batch++) {
            const chunk=batches[batch];
            const uploadPath=seedOnly
                ? '/rest/v1/toolbar_shared_items?select=category,item_key'
                : '/rest/v1/toolbar_shared_items?on_conflict=category,item_key&select=category,item_key';
            const prefer=seedOnly ? 'return=representation' : 'resolution=merge-duplicates,return=representation';
            const payload = seedOnly && batch===0 ? chunk[0] : chunk;
            const response=await request('POST',uploadPath,payload,t,{'Prefer':prefer});
            // Independently read the database. This distinguishes a harmless
            // empty representation from a request that stored nothing.
            const remote=await fetchRemote(t);
            let missing=chunk.filter(row=>!remote.has(row.category+'\u0000'+row.item_key));
            if (missing.length && chunk.length > 1) {
                // v345: This project's PostgREST endpoint responds HTTP 201 [] to
                // array inserts without persisting rows. A single JSON object was
                // independently verified. Fall back ONLY for missing entries.
                say('Batch '+(batch+1)+' did not persist '+missing.length+' entries; retrying individually (verified method). '+completed+' / '+rows.length+' confirmed.');
                const toRetry=missing;
                // Keep concurrency low to avoid overloading Supabase. Each request
                // is a separate object; never treat HTTP 201 alone as success.
                for (let i=0; i<toRetry.length; i+=4) {
                    const group=toRetry.slice(i,i+4);
                    await Promise.all(group.map(async row => {
                        const singlePath=seedOnly
                            ? '/rest/v1/toolbar_shared_items?select=category,item_key'
                            : '/rest/v1/toolbar_shared_items?on_conflict=category,item_key&select=category,item_key';
                        await request('POST',singlePath,row,t,{'Prefer':prefer});
                    }));
                }
                const after=await fetchRemote(t);
                missing=chunk.filter(row=>!after.has(row.category+'\u0000'+row.item_key));
            }
            if (missing.length) {
                const prefix=seedOnly && batch===0 ? 'Single-record probe failed' : 'Upload readback failed at batch '+(batch+1);
                throw new Error(prefix+': HTTP '+response.httpStatus+', sent '+chunk.length+
                    ', response '+response.safeResponse+', database missing '+missing.length+
                    ' of '+chunk.length+' entries after individual retry. Stopped safely; automatic sync remains OFF.');
            }
            completed+=chunk.length;
            say((seedOnly && batch===0 ? 'Single-record probe verified. ' : '')+
                'Database confirmed '+completed+' / '+rows.length+' uploaded entries.');
        }
    }
    // v359: Compare meaningful record content, not bookkeeping timestamps.
    // Keep the existing full baseline format for backward compatibility.
    const SYNC_METADATA_KEYS = new Set(['learnedAt','updatedAt','createdAt','deletedAt','lastSeen','lastSeenAt','lastUpdated','timestamp','syncedAt','sourceUpdatedAt']);
    function meaningful(value) {
        if (Array.isArray(value)) return value.map(meaningful);
        if (value && typeof value === 'object') {
            const out = {};
            for (const key of Object.keys(value).sort()) {
                if (!SYNC_METADATA_KEYS.has(key)) out[key] = meaningful(value[key]);
            }
            return out;
        }
        return value;
    }
    function sameMeaning(a,b) { return stable(meaningful(a)) === stable(meaningful(b)); }
    function baselineRow(value) { try { return JSON.parse(value); } catch (_) { return null; } }
    function diffReport(rows, metadataOnly, remote) {
        const counts = {};
        for (const row of rows) {
            const cat=row.category;
            if (!counts[cat]) counts[cat]={new:0,edited:0,removed:0};
            counts[cat][row._reason||'edited']++;
        }
        const details = Object.entries(counts).map(([cat,c])=>cat+': '+c.new+' new, '+c.edited+' edited, '+c.removed+' removed').join('; ');
        return 'Changes by category: '+(details||'none')+'. Metadata-only differences ignored: '+metadataOnly+'. Remote entries read: '+remote.size+'.';
    }
    function rowFor(row,uid) { return {category:row.category,item_key:row.item_key,item_value:row.item_value,deleted:!!row.deleted,updated_by:uid}; }
    function identity() { const s=parse(get('session','{}')); return s.user?.id || ''; }
    async function seedBackup(file) {
        if (busy) return;
        busy=true;
        try {
            const t=await token(); await authorized(t);
            const existing=await fetchRemote(t);
            const backup=JSON.parse(await file.text());
            if (backup.format!=='ContactInfoToolbarBackup'||!backup.data) throw new Error('Not a Contact Info Toolbar backup');
            const entries=[...flatten(backup.data).values()];
            if (!entries.length) throw new Error('Backup contains no shared data');
            // Resume only if existing records are a subset of the selected backup.
            // Never overwrite a remote row from a prior successful upload.
            const desired=flatten(backup.data);
            for (const [id,remoteRow] of existing) {
                if (!desired.has(id)) throw new Error('Database has a shared entry not in this backup. Seed resume stopped to protect data.');
                const localRow=desired.get(id);
                if (stable(remoteRow.item_value)!==stable(localRow.item_value) || !!remoteRow.deleted!==!!localRow.deleted)
                    throw new Error('A remote shared entry differs from this backup. Seed resume stopped to protect data.');
            }
            const remaining=entries.filter(x=>!existing.has(x.category+'\u0000'+x.item_key));
            if (!confirm('Initialize shared data: '+existing.size+' records already verified; upload '+remaining.length+' remaining of '+entries.length+' from your PRIVATE backup?')) return;
            if (remaining.length) await upload(t,remaining.map(x=>rowFor(x,identity())),true);
            const verified=await fetchRemote(t);
            if (verified.size !== entries.length) {
                throw new Error('Final verification failed: expected '+entries.length+' records but Supabase returned '+verified.size+'. Do NOT seed again until this is investigated.');
            }
            // Do not assume local storage is identical to the selected backup.
            set('baseline',JSON.stringify({}));
            say('Seed verified: '+verified.size+' records confirmed in Supabase. Click Sync Now; leave Auto Sync OFF until checked.');
        } catch(e) { say('Seed error: '+e.message); } finally { busy=false; }
    }
    async function syncNow() {
        if (busy) return;
        busy=true;
        try {
            const t=await token(); await authorized(t);
            const remote=await fetchRemote(t);
            if (!remote.size) throw new Error('Remote database is empty. Seed your backup first.');
            const current=flatten(readLocal());
            const old=parse(get('baseline','{}'));
            const first=!get('baseline',null);
            const writes=[];
            const diagnosticRows=[];
            let metadataOnly=0;
            const merged=new Map();
            // Remote wins for existing keys on FIRST connection; unique local keys are added.
            // Thereafter, only keys changed locally since the last successful sync are uploaded.
            for (const [id,row] of remote) merged.set(id,{...row});
            for (const [id,row] of current) {
                const before=old[id];
                const beforeRow=before===undefined ? null : baselineRow(before);
                const rawChanged=!first && before!==undefined && before!==stable(row);
                const changed=rawChanged && (!beforeRow || !sameMeaning(beforeRow.item_value,row.item_value) || !!beforeRow.deleted!==!!row.deleted);
                if (rawChanged && !changed) metadataOnly++;
                if (!remote.has(id) || changed) {
                    const uploadRow=rowFor(row,identity()); writes.push(uploadRow); merged.set(id,uploadRow);
                    diagnosticRows.push({...uploadRow,_reason:remote.has(id)?'edited':'new'});
                }
            }
            // Explicit local removal since the last sync becomes a remote tombstone.
            if (!first) for (const id of Object.keys(old)) if (!current.has(id)) {
                const remoteRow=remote.get(id); if (!remoteRow) continue;
                const tomb={...remoteRow,deleted:true,item_value:{...(remoteRow.item_value||{}),deleted:true,deletedAt:Date.now()}};
                writes.push(rowFor(tomb,identity())); merged.set(id,tomb);
                diagnosticRows.push({...tomb,_reason:'removed'});
            }
            // v347 SAFETY GUARD: local cache rewrites/migrations can look like thousands
            // of edits. Never send a bulk change during routine synchronization.
            // Preserve all local data and the previous baseline on this path.
            const MAX_ROUTINE_WRITES = 25;
            if (writes.length > MAX_ROUTINE_WRITES) {
                set('enabled',false);
                if (panel?.isConnected) {
                    const autoBox=panel.querySelector('[data-auto]');
                    if (autoBox) autoBox.checked=false;
                }
                throw new Error('SAFETY STOP: '+writes.length+' meaningful local differences. No entries uploaded or overwritten. Auto sync OFF. '+diffReport(diagnosticRows,metadataOnly,remote)+' Export a backup before making further changes.');
            }
            if (writes.length) await upload(t,writes);
            // No writes to local until all remote operations succeed.
            const result=unflatten(merged);
            const after=flatten(result);
            const baseline={}; for (const [id,row] of after) baseline[id]=stable({category:row.category,item_key:row.item_key,item_value:row.item_value,deleted:row.deleted});
            writeLocal(result);
            set('baseline',JSON.stringify(baseline));
            set('last_success',new Date().toISOString());
            say('Synced '+merged.size+' shared entries ('+writes.length+' uploaded; '+metadataOnly+' metadata-only differences ignored). Reload the page to refresh toolbar caches.');
        } catch(e) { say('Sync error: '+e.message); } finally { busy=false; }
    }

    // v364: Read-only comparison. No remote writes, no local writes, no baseline changes.
    async function compareAndDownload() {
        if (busy) return;
        busy=true;
        try {
            const t=await token(); await authorized(t);
            const remote=await fetchRemote(t);
            const local=flatten(readLocal());
            const old=parse(get('baseline','{}'));
            const ids=new Set([...local.keys(),...remote.keys()]);
            const differences=[];
            for (const id of ids) {
                const localRow=local.get(id), remoteRow=remote.get(id);
                if (localRow && remoteRow && sameMeaning(localRow.item_value,remoteRow.item_value) && !!localRow.deleted===!!remoteRow.deleted) continue;
                const category=(localRow||remoteRow).category, key=(localRow||remoteRow).item_key;
                const status=!localRow?'remote-only':!remoteRow?'local-only':'conflict';
                differences.push({category,key,status,localValue:localRow?.item_value??null,remoteValue:remoteRow?.item_value??null,localDeleted:localRow?.deleted??null,remoteDeleted:remoteRow?.deleted??null,previousBaseline:old[id]??null});
            }
            const report={generatedAt:new Date().toISOString(),remoteCount:remote.size,localCount:local.size,counts:differences.reduce((o,x)=>{o[x.category]??={};o[x.category][x.status]=(o[x.category][x.status]||0)+1;return o;},{}),differences};
            const blob=new Blob([JSON.stringify(report,null,2)],{type:'application/json'});
            const link=document.createElement('a');link.href=window.URL.createObjectURL(blob);link.download='contact-toolbar-sync-comparison-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>window.URL.revokeObjectURL(link.href),30000);
            say('Comparison saved: '+differences.length+' differences. No local or remote entries changed. Report contains learned data; keep it private.');
        } catch(e) {say('Comparison error: '+e.message);} finally {busy=false;}
    }
    // v363: Download only keys absent locally. Never overwrite local values,
    // propagate deletions, upload anything, or reset the sync baseline.
    async function downloadMissingOnly() {
        if (busy) return;
        busy=true;
        try {
            const t=await token(); await authorized(t);
            const remote=await fetchRemote(t);
            const data=readLocal(); const local=flatten(data);
            let added=0, conflicts=0, deletedSkipped=0;
            for (const [id,row] of remote) {
                if (local.has(id)) {
                    const here=local.get(id);
                    if (!sameMeaning(here.item_value,row.item_value)||!!here.deleted!==!!row.deleted) {
                        conflicts++;
                        noteConflict(id,row,
                            !!here.deleted!==!!row.deleted
                                ? 'Deletion status differs between computers; neither version overwritten.'
                                : 'Same entry exists on both computers with different saved data; local version preserved.');
                    }
                    continue;
                }
                if (row.deleted || row.item_value?.deleted===true) {deletedSkipped++;continue;}
                if (!Object.prototype.hasOwnProperty.call(CATEGORIES,row.category)) continue;
                data[row.category][row.item_key]=row.item_value;
                added++;
            }
            if (added) writeLocal(data);
            say('Download-only: '+added+' missing entries added locally; '+conflicts+' conflicting entries left untouched; '+deletedSkipped+' remote deletions skipped. Zero uploads. Reload to refresh toolbar caches. Baseline unchanged.');
        } catch(e) {say('Download-only error: '+e.message);} finally {busy=false;}
    }
    // v364: Explicitly reviewed, CREATE-ONLY uploads. Existing remote rows are
    // NEVER updated, and deleted/tombstoned rows are NEVER resurrected.
    // Baseline remains unchanged so routine Sync Now cannot silently adopt edits.
    const REVIEW_BATCH_LIMIT = 10;
    const REVIEW_FLAGGED = new Set(['CALGARY||MT','SACRAMENTO||ND']);
    let reviewSnapshot = null;
    function reviewId(row) { return row.category+'\u0000'+row.item_key; }
    function reviewFlag(row) {
        const value=row.item_value||{};
        const cityKey=String(row.item_key||'').toUpperCase();
        if (row.category==='learnedCities' && (REVIEW_FLAGGED.has(cityKey) ||
            !/^[A-Z]{2}$/.test(String(value.state||'')))) return 'CHECK LOCATION';
        if (row.category==='rejectedNames' && String(row.item_key||'').length<3) return 'CHECK NAME';
        return '';
    }
    async function openUploadReview() {
        if (busy) return;
        busy=true;
        try {
            const t=await token(); await authorized(t);
            const remote=await fetchRemote(t);
            const local=flatten(readLocal());
            const candidates=[]; let conflicts=0, tombstones=0;
            for (const [id,row] of local) {
                if (remote.has(id)) { if (!sameMeaning(row.item_value,remote.get(id).item_value) || !!row.deleted!==!!remote.get(id).deleted) conflicts++; continue; }
                if (row.deleted || row.item_value?.deleted===true) {tombstones++;continue;}
                candidates.push(row);
            }
            candidates.sort((a,b)=>a.category.localeCompare(b.category)||a.item_key.localeCompare(b.item_key));
            reviewSnapshot={candidates,remoteCount:remote.size};
            const host=panel?.querySelector('[data-review]');
            if (!host) throw new Error('Reopen the Team Sync panel and retry.');
            host.replaceChildren();
            const heading=document.createElement('p');
            heading.textContent=candidates.length+' local-only entries available. '+conflicts+' existing-key conflicts excluded; '+tombstones+' deleted entries excluded. Select at most '+REVIEW_BATCH_LIMIT+' to CREATE remotely. No overwrites.';
            host.appendChild(heading);
            const list=document.createElement('div');list.style.cssText='height:210px;max-height:35vh;overflow-y:auto;overscroll-behavior:contain;border:1px solid #789;padding:6px;background:#223246';
            for (const row of candidates) {
                const line=document.createElement('label');line.style.cssText='display:block;padding:4px;border-bottom:1px solid #456;cursor:pointer';
                const cb=document.createElement('input');cb.type='checkbox';cb.dataset.reviewId=reviewId(row);cb.style.marginRight='6px';
                const flag=reviewFlag(row); if(flag) { cb.disabled=true; line.title='Flagged entry requires separate manual review; cannot upload from this tool.'; }
                line.appendChild(cb);line.appendChild(document.createTextNode(row.category+': '+row.item_key+(flag?' — '+flag+' (blocked)':'')));
                list.appendChild(line);
            }
            host.appendChild(list);
            const btn=document.createElement('button');btn.textContent='Upload selected NEW entries (max '+REVIEW_BATCH_LIMIT+')';
            btn.style.cssText='margin-top:8px;position:sticky;bottom:0;z-index:2;padding:8px;background:#e8f3ff;color:#142336;font-weight:bold;border:2px solid #6da9e5;border-radius:5px';btn.onclick=uploadReviewedSelection;host.appendChild(btn);
            say('Review loaded: '+candidates.length+' new entries; '+conflicts+' conflicts protected. Select up to '+REVIEW_BATCH_LIMIT+' and verify before uploading.');
        } catch(e) {say('Review error: '+e.message);} finally {busy=false;}
    }
    async function uploadReviewedSelection() {
        if (busy) return;
        const ids=[...(panel?.querySelectorAll('[data-review-id]:checked')||[])].map(el=>el.dataset.reviewId);
        if (!ids.length) {say('Select one or more unflagged NEW entries first.');return;}
        if (ids.length>REVIEW_BATCH_LIMIT) {say('Safety stop: select at most '+REVIEW_BATCH_LIMIT+' entries per batch.');return;}
        const snapshot=reviewSnapshot;
        if (!snapshot) {say('Review has expired; reopen review.');return;}
        const chosen=ids.map(id=>snapshot.candidates.find(row=>reviewId(row)===id));
        if (chosen.some(row=>!row||reviewFlag(row)||row.deleted||row.item_value?.deleted===true)) {say('Safety stop: selection includes an invalid or flagged entry.');return;}
        if (!confirm('CREATE '+chosen.length+' selected NEW entries in Supabase? No existing records will be overwritten. Auto Sync stays OFF.')) return;
        busy=true;
        set('enabled',false);
        
        let uploaded=0;
        try {
            const t=await token();await authorized(t);
            // Re-fetch immediately before writing: reject keys added by the other computer.
            let remote=await fetchRemote(t);
            const current=flatten(readLocal());
            for (const row of chosen) {
                const id=reviewId(row), latest=current.get(id);
                if (remote.has(id)) throw new Error('Remote key appeared since review: '+row.item_key+'. Stopped.');
                if (!latest || latest.deleted || !sameMeaning(latest.item_value,row.item_value)) throw new Error('Local entry changed since review: '+row.item_key+'. Stopped.');
            }
            for (const row of chosen) {
                // No upsert or merge-duplicates. Prefer return=representation, but
                // independently verify stored content before proceeding.
                await request('POST','/rest/v1/toolbar_shared_items?select=category,item_key',rowFor(row,identity()),t,{'Prefer':'return=representation'});
                remote=await fetchRemote(t);
                const stored=remote.get(reviewId(row));
                if (!stored || !sameMeaning(stored.item_value,row.item_value) || !!stored.deleted!==!!row.deleted)
                    throw new Error('Readback verification failed for '+row.item_key+'. '+uploaded+' prior entries verified; stop and export comparison.');
                uploaded++;
                say('Verified '+uploaded+' / '+chosen.length+' new entries. Zero overwrites.');
            }
            say('Reviewed upload complete: '+uploaded+' new entries verified. Zero overwrites; baseline unchanged; Auto Sync OFF. Reopen review for another batch.');
            reviewSnapshot=null;
            const host=panel?.querySelector('[data-review]');if(host)host.replaceChildren();
        } catch(e) {say('Reviewed upload stopped after '+uploaded+' verified entries: '+e.message+' Auto Sync OFF.');}
        finally {busy=false;}
    }
    // v375: Opt-in safe new-entry sync plus explicit name/town tombstone transitions. It never invokes
    // legacy syncNow(); deletion PATCHes are conditional and limited to 10 per cycle.
    // Initial snapshot deliberately excludes the pre-existing migration backlog.
    const AUTO_NEW_SEEN_KEY = 'auto_new_seen_v366';
    const AUTO_NEW_ENABLED_KEY = 'auto_new_enabled_v366';
    const AUTO_NEW_LIMIT = 10;
    // v375: explicit deletion transitions only; never infer deletion from a missing key.
    // First run establishes a baseline, so historical deletions cannot be replayed.
    const DELETE_SNAPSHOT_KEY = 'safe_delete_snapshot_v375';
    const DELETE_CATEGORIES = new Set(['rejectedNames','learnedCities','customAreaCodes']);
    const MAX_DELETE_WRITES = 10;
    const isDeleted = row => !!(row?.deleted || row?.item_value?.deleted);
    const snapshotLocal = local => {
        const out = {};
        for (const [id,row] of local) if (DELETE_CATEGORIES.has(row.category))
            out[id] = {deleted:isDeleted(row),value:row.item_value};
        return out;
    };
    const activeMeaning = value => {
        if (!value || typeof value !== 'object') return value;
        const copy={...value}; delete copy.deleted; delete copy.deletedAt;
        return copy;
    };
    // Optimistic concurrency: update ONLY the row read with the same updated_at.
    // A concurrent change is a conflict, not permission to overwrite.
    async function publishDeletion(t, remoteRow, localRow) {
        const tomb={...remoteRow.item_value,deleted:true,deletedAt:localRow.item_value.deletedAt||Date.now()};
        const path='/rest/v1/toolbar_shared_items?category=eq.'+
            encodeURIComponent(remoteRow.category)+'&item_key=eq.'+
            encodeURIComponent(remoteRow.item_key)+'&deleted=eq.false&updated_at=eq.'+
            encodeURIComponent(remoteRow.updated_at)+'&select=category,item_key,deleted';
        await request('PATCH',path,{deleted:true,item_value:tomb,updated_by:identity()},t,
            {'Prefer':'return=representation'});
        const after=await fetchRemote(t), verified=after.get(remoteRow.category+'\u0000'+remoteRow.item_key);
        if (!verified?.deleted || !verified.item_value?.deleted)
            throw new Error('Deletion readback failed or changed concurrently for '+remoteRow.item_key);
    }
    // v383: Dedicated Supabase audit table. No learned-data tables are modified.
    const ACTIVITY_TABLE='/rest/v1/toolbar_sync_activity';
    const DEVICE_KEY='shared_activity_device_v379';
    const DEVICE_LABEL_KEY='shared_activity_label_v379';
    let deviceId=get(DEVICE_KEY,'');
    if (!deviceId) {
        deviceId='PC-'+(typeof crypto!=='undefined' && crypto.randomUUID
            ? crypto.randomUUID().slice(0,8) : Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,6));
        set(DEVICE_KEY,deviceId);
    }
    const deviceLabel=()=>String(get(DEVICE_LABEL_KEY,deviceId)||deviceId).slice(0,60);
    const ACTIVITY_PENDING_KEY='shared_activity_pending_v382';
    const ACTIVITY_ERROR_KEY='shared_activity_error_v382';
    let activityFlushing=false;
    function pendingActivity() {
        const raw=parse(get(ACTIVITY_PENDING_KEY,'{}'));
        return raw && typeof raw==='object' && !Array.isArray(raw) ? raw : {};
    }
    function activityUUID() {
        if (typeof crypto!=='undefined' && crypto.randomUUID) return crypto.randomUUID();
        // UUID v4 fallback for Firefox userscript environments without crypto.randomUUID.
        const bytes=new Uint8Array(16); crypto.getRandomValues(bytes);
        bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;
        const h=Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
        return h.slice(0,8)+'-'+h.slice(8,12)+'-'+h.slice(12,16)+'-'+h.slice(16,20)+'-'+h.slice(20);
    }
    async function flushActivity(t) {
        if (activityFlushing) return;
        activityFlushing=true;
        try {
            const pending=pendingActivity();
            for (const [key,original] of Object.entries(pending).slice(0,20)) {
                // Upgrade queued v382 records in place so failed events are not lost.
                const event={...original};
                if (!event._audit_id) {
                    event._audit_id=activityUUID();
                    const latest=pendingActivity();
                    if (latest[key]) {latest[key]=event;set(ACTIVITY_PENDING_KEY,JSON.stringify(latest));}
                }
                const path=ACTIVITY_TABLE+'?id=eq.'+encodeURIComponent(event._audit_id)+'&select=id';
                let found=await request('GET',path,null,t);
                if (!Array.isArray(found.data)) throw new Error('Audit readback returned unexpected data');
                if (!found.data.length) {
                    const row={id:event._audit_id,created_at:event.time||new Date().toISOString(),
                        device_id:event.deviceId||deviceId,device_name:event.device||deviceLabel(),
                        action:event.action||'Unknown',category:event.category||'Unknown',
                        entry_key:event.entry||'',details:event.detail||null};
                    await request('POST',ACTIVITY_TABLE,row,t,{'Prefer':'return=representation'});
                    found=await request('GET',path,null,t);
                }
                if (!Array.isArray(found.data) || !found.data.some(r=>r.id===event._audit_id))
                    throw new Error('Activity event was not visible in Supabase after upload');
                const latest=pendingActivity();
                if (latest[key]?._audit_id===event._audit_id) {
                    delete latest[key];set(ACTIVITY_PENDING_KEY,JSON.stringify(latest));
                }
            }
            set(ACTIVITY_ERROR_KEY,'');
        } catch(error) {
            const message=String(error.message||error);
            set(ACTIVITY_ERROR_KEY,message);
            console.warn('[Team Sync activity] Audit pending; will retry:',message);
        } finally {activityFlushing=false;}
    }
    async function recordActivity(t,action,row,detail='') {
        if (!row || !row.category || !row.item_key) return;
        const id=activityUUID();
        const item_value={_audit_id:id,time:new Date().toISOString(),device:deviceLabel(),
            deviceId,action,category:row.category,entry:row.item_key,
            detail:String(detail).slice(0,160),result:'Success'};
        const pending=pendingActivity();
        pending[id]=item_value;
        set(ACTIVITY_PENDING_KEY,JSON.stringify(pending));
        await flushActivity(t);
    }
    async function showSharedActivity() {
        const container=panel?.querySelector('[data-activity]');
        if (!container) return;
        container.hidden=false;
        container.textContent='Loading shared activity...';
        try {
            const t=await token();await authorized(t);
            await flushActivity(t);
            const path=ACTIVITY_TABLE+
                '?select=created_at,device_name,action,category,entry_key,details'+
                '&order=created_at.desc&limit=100';
            const response=await request('GET',path,null,t);
            if (!Array.isArray(response.data)) throw new Error('Unexpected log response');
            container.replaceChildren();
            const pendingCount=Object.keys(pendingActivity()).length;
            const lastError=get(ACTIVITY_ERROR_KEY,'');
            const diag=document.createElement('p');
            diag.style.color=pendingCount||lastError?'#ffd58a':'#a9e6bd';
            diag.textContent=pendingCount
                ? pendingCount+' log event(s) awaiting verified upload.'+(lastError?' Last error: '+lastError:'')
                : 'All locally recorded log events uploaded and verified.';
            container.appendChild(diag);
            const heading=document.createElement('div');
            heading.textContent='Shared activity — newest 100 events (local time)';
            heading.style.fontWeight='bold';container.appendChild(heading);
            if (!response.data.length) {
                const empty=document.createElement('p');
                empty.textContent='No shared activity recorded yet. New events and queued v382 events appear here.';
                container.appendChild(empty);
            }
            for (const e of response.data) {
                const item=document.createElement('div');item.className='activity-row';
                const time=Date.parse(e.created_at);
                const stamp=Number.isFinite(time)?new Date(time).toLocaleString():e.created_at;
                item.textContent=stamp+' | '+(e.device_name||'Unknown')+' | '+(e.action||'Unknown')+
                    ' | '+(e.category||'')+': '+(e.entry_key||'')+(e.details?' | '+e.details:'');
                container.appendChild(item);
            }
        } catch(error) {container.textContent='Could not load shared log: '+error.message;}
    }
    let autoNewBusy = false;
    async function enableAutoNew() {
        if (busy || autoNewBusy) return;
        busy=true;
        try {
            const t=await token(); await authorized(t);
            const remote=await fetchRemote(t);
            if (!remote.size) throw new Error('Remote database is empty');
            const local=flatten(readLocal());
            const seen={};
            for (const id of local.keys()) seen[id]=true;
            // A key present remotely but absent locally must not be interpreted as
            // a newly created local key after the first background download.
            for (const id of remote.keys()) seen[id]=true;
            set(AUTO_NEW_SEEN_KEY,JSON.stringify(seen));
            if (get(DELETE_SNAPSHOT_KEY,null)===null) set(DELETE_SNAPSHOT_KEY,JSON.stringify(snapshotLocal(local)));
            set(AUTO_NEW_ENABLED_KEY,true);
            if (get(AUTO_BASELINE_KEY,null)===null) set(AUTO_BASELINE_KEY,JSON.stringify(autoSnapshot()));
            set('enabled',false); // legacy sync remains disabled
            say('Safe automatic sync ON: current '+local.size+' local entries are the starting snapshot. Existing backlog and conflicts stay protected. Only future explicit name/town/area-code deletions sync; new entries and safe downloads continue every 30 seconds.');
        } catch(e) {set(AUTO_NEW_ENABLED_KEY,false);say('Safe automatic sync not enabled: '+e.message);}
        finally {busy=false;}
    }
    // v386: Per-computer conflict diagnostics. Read-only; never resolves or overwrites.
    const CONFLICT_REPORT_KEY='safe_sync_conflict_report_v386';
    const MAX_CONFLICT_REPORT=200;
    function storeConflictReport(items) {
        const report={time:new Date().toISOString(),items:items.slice(0,MAX_CONFLICT_REPORT),
            total:items.length,truncated:items.length>MAX_CONFLICT_REPORT};
        set(CONFLICT_REPORT_KEY,JSON.stringify(report));
        const visible=panel?.querySelector('[data-conflict-report]');
        if (!visible || visible.hidden) renderConflictReport();
        else {
            const button=panel.querySelector('[data-conflicts-open]');
            if (button) button.textContent='View Sync Conflicts ('+items.length+')';
        }
    }
    async function restoreSharedAreaCode(area) {
        if (busy || autoNewBusy) {say('Wait for the current sync to finish, then retry.');return;}
        const localRow=flatten(readLocal()).get('customAreaCodes'+'\u0000'+area);
        if (!localRow || isDeleted(localRow)) {say('The area code must be active locally before restoring.');return;}
        const city=String(localRow.item_value?.city||'').trim();
        const state=String(localRow.item_value?.state||'').trim();
        if (!city || !/^[A-Z]{2}$/.test(state)) {say('Local area-code entry is incomplete; restoration canceled.');return;}
        if (!window.confirm('Restore area code '+area+' → '+city+', '+state+' to the shared database?\n\nThis reverses its earlier shared deletion. It will be available to the other computer on its next sync.')) return;
        busy=true;
        try {
            const t=await token();await authorized(t);
            const id='customAreaCodes'+'\u0000'+area;
            const before=(await fetchRemote(t)).get(id);
            if (!before || !isDeleted(before)) throw new Error('Shared entry is no longer deleted. Nothing restored.');
            const path='/rest/v1/toolbar_shared_items?category=eq.customAreaCodes&item_key=eq.'+
                encodeURIComponent(area)+'&deleted=eq.true&updated_at=eq.'+
                encodeURIComponent(before.updated_at)+'&select=category,item_key,deleted';
            await request('PATCH',path,{item_value:localRow.item_value,deleted:false,updated_by:identity()},t,{'Prefer':'return=representation'});
            const verified=(await fetchRemote(t)).get(id);
            if (!verified || isDeleted(verified) || !sameMeaning(verified.item_value,localRow.item_value))
                throw new Error('Restoration could not be verified. No further changes attempted.');
            await recordActivity(t,'Restored (approved manually)',localRow);
            const pending=parse(get('pending_explicit_deletes_v376','{}'));
            if (pending[id]) {delete pending[id];set('pending_explicit_deletes_v376',JSON.stringify(pending));}
            say('Verified shared restoration of '+area+' → '+city+', '+state+'.');
            void autoNewTick();
        } catch(error) {say('Area-code restoration stopped: '+error.message);}
        finally {busy=false;}
    }
    // v390: Build a fresh read-only report from both data sets when requested.
    // This does not depend on cached diagnostic entries or change sync state.
    // v393: Field-level, read-only comparison of actual local and shared values.
    function fieldDifferences(localValue, sharedValue) {
        const differences=[];
        const isObj=v=>v!==null && typeof v==='object' && !Array.isArray(v);
        const show=v=>v===undefined?'(not present)':v===null?'null':
            typeof v==='string'?v:JSON.stringify(v);
        function walk(a,b,path,depth=0) {
            if (differences.length>=80) return;
            if (depth>8 || Array.isArray(a) || Array.isArray(b) ||
                (!isObj(a) && !isObj(b))) {
                if (stable(a)!==stable(b)) differences.push({
                    field:path||'(value)',local:show(a),shared:show(b)});
                return;
            }
            const keys=new Set([...Object.keys(isObj(a)?a:{}),...Object.keys(isObj(b)?b:{})]);
            for (const key of [...keys].sort()) {
                if (SYNC_METADATA_KEYS.has(key)) continue;
                walk(isObj(a)?a[key]:undefined,isObj(b)?b[key]:undefined,
                    path?path+'.'+key:key,depth+1);
            }
        }
        walk(meaningful(localValue),meaningful(sharedValue),'');
        return differences;
    }
    let conflictInspectionBusy=false;
    async function inspectSyncConflicts() {
        const target=panel?.querySelector('[data-conflict-report]');
        if (!target || conflictInspectionBusy) return;
        conflictInspectionBusy=true;
        target.hidden=false;
        target.textContent='Checking this computer against shared records...';
        try {
            const t=await token();await authorized(t);
            const remote=await fetchRemote(t);
            const local=flatten(readLocal());
            const found=new Map();
            const note=(id,row,reason)=>{
                const localRow=local.get(id), sharedRow=remote.get(id);
                found.set(id+'|'+reason,{category:row.category,item_key:row.item_key,
                    key:row.item_key,reason,
                    differences:localRow && sharedRow
                        ? fieldDifferences(localRow.item_value,sharedRow.item_value):[],
                    localDeleted:localRow?isDeleted(localRow):null,
                    sharedDeleted:sharedRow?isDeleted(sharedRow):null});
            };
            for (const [id,shared] of remote) {
                const here=local.get(id);
                if (!here) continue;
                if (sameMeaning(here.item_value,shared.item_value) &&
                    !!here.deleted===!!shared.deleted) continue;
                const localDeleted=isDeleted(here), remoteDeleted=isDeleted(shared);
                const reason=localDeleted!==remoteDeleted
                    ? (remoteDeleted
                        ? 'Shared entry is DELETED, but this computer has an active entry. Re-adding requires explicit restoration.'
                        : 'Local entry is DELETED but shared entry is active; protected.')
                    : 'Different saved values on both computers; local version preserved.';
                note(id,shared,reason);
            }
            const pending=parse(get('pending_explicit_deletes_v376','{}'));
            for (const [id,entry] of Object.entries(pending)) {
                if (!DELETE_CATEGORIES.has(entry.category)) continue;
                const here=local.get(id), shared=remote.get(id);
                if (!here || !isDeleted(here))
                    note(id,entry,'Pending deletion not confirmed in local storage; no deletion sent.');
                else if (!shared)
                    note(id,entry,'Pending deletion has no matching shared record; no deletion sent.');
                else if (!isDeleted(shared) &&
                    !sameMeaning(activeMeaning(here.item_value),activeMeaning(shared.item_value)))
                    note(id,here,'Pending deletion differs from shared entry; no deletion sent.');
            }
            const inspected=[...found.values()];
            // Keep the inspection visible and independent of the background
            // sync's separately generated snapshot.
            renderConflictReport({time:new Date().toISOString(),
                items:inspected,total:inspected.length,truncated:false},true);
        } catch(error) {
            target.textContent='Could not inspect conflicts: '+String(error.message||error);
        } finally {conflictInspectionBusy=false;}
    }
    function renderConflictReport(explicitReport=null,liveInspection=false) {
        if (!panel?.isConnected) return;
        const target=panel.querySelector('[data-conflict-report]');
        const button=panel.querySelector('[data-conflicts-open]');
        if (!target || !button) return;
        // The shared parse() helper deliberately rejects arrays. Conflict
        // details are an array, so read this report with JSON.parse directly.
        // Otherwise the counter survives while every detail row vanishes.
        let report={};
        try {
            const raw=get(CONFLICT_REPORT_KEY,'{}');
            report=typeof raw==='string'?JSON.parse(raw):raw;
            if (!report || typeof report!=='object') report={};
        } catch(error) {
            report={};
            console.warn('[Team Sync] Conflict report could not be decoded:',error);
        }
        if (explicitReport && typeof explicitReport==='object') report=explicitReport;
        const items=Array.isArray(report.items)?report.items:[];
        const total=Number(report.total)||0;
        button.textContent='View Sync Conflicts ('+total+')';
        target.replaceChildren();
        const stamp=document.createElement('div');
        stamp.textContent=report.time
            ? (liveInspection?'Live inspection: ':'Last completed check: ')+new Date(report.time).toLocaleString()
            : 'No completed sync check recorded yet.';
        target.appendChild(stamp);
        const summary=document.createElement('div');
        summary.style.margin='8px 0';
        summary.textContent=total+' protected conflict entr'+(total===1?'y':'ies')+
            ' in last report; '+items.length+' detail row(s) saved.';
        target.appendChild(summary);
        const rerun=document.createElement('button');
        rerun.type='button';rerun.textContent='Refresh conflict details now';
        rerun.style.margin='8px 0';
        rerun.addEventListener('click',()=>void inspectSyncConflicts());
        target.appendChild(rerun);
        if (total && !items.length) {
            const warning=document.createElement('p');
            warning.textContent='The saved conflict details are missing. Click View Sync Conflicts again to rebuild the list.';
            target.appendChild(warning);
        }
        if (!total) {
            const empty=document.createElement('p');
            empty.textContent='No conflicts in the last completed sync check.';
            target.appendChild(empty);
            return;
        }
        for (const entry of items) {
            const line=document.createElement('div');
            line.className='activity-row';
            const title=document.createElement('strong');
            title.textContent=entry.category+' — '+entry.key;
            const explanation=document.createElement('div');
            explanation.textContent=entry.reason;
            line.append(title,explanation);
            if (Array.isArray(entry.differences)) {
                const details=document.createElement('details');
                details.style.marginTop='7px';
                details.open=true; // v395: always show actual differences by default
                const summary=document.createElement('summary');
                summary.style.cursor='pointer';
                summary.textContent='Actual differences — '+entry.differences.length+
                    ' content field'+(entry.differences.length===1?'':'s')+' different';
                details.appendChild(summary);
                if (entry.localDeleted!==null && entry.sharedDeleted!==null &&
                    entry.localDeleted!==entry.sharedDeleted) {
                    const status=document.createElement('div');
                    status.textContent='Deletion status — This computer: '+
                        (entry.localDeleted?'Deleted':'Active')+
                        ' | Shared: '+(entry.sharedDeleted?'Deleted':'Active');
                    status.style.padding='6px 0';
                    details.appendChild(status);
                }
                if (!entry.differences.length) {
                    const none=document.createElement('p');
                    none.textContent=entry.localDeleted!==entry.sharedDeleted
                        ? 'The deletion status differs (shown above). No other meaningful fields differ.'
                        : 'No differing content fields after ignoring bookkeeping timestamps. The conflict may be due to record-level flags or metadata; neither copy was changed.';
                    details.appendChild(none);
                }
                for (const diff of entry.differences) {
                    const field=document.createElement('div');
                    field.style.cssText='padding:8px 0;border-top:1px solid #42546b;overflow-wrap:anywhere;';
                    const name=document.createElement('strong');
                    name.textContent='Different field: '+diff.field;
                    const localLine=document.createElement('div');
                    localLine.textContent='This computer: '+diff.local;
                    const sharedLine=document.createElement('div');
                    sharedLine.textContent='Shared database: '+diff.shared;
                    localLine.style.marginTop='3px';
                    sharedLine.style.marginTop='3px';
                    field.append(name,localLine,sharedLine);
                    details.appendChild(field);
                }
                line.appendChild(details);
            }
            if (entry.category==='customAreaCodes' &&
                entry.reason.includes('Shared entry is DELETED')) {
                const button=document.createElement('button');
                button.type='button';button.textContent='Restore this area code to shared database';
                button.style.marginTop='7px';
                button.addEventListener('click',()=>void restoreSharedAreaCode(entry.key));
                line.appendChild(button);
            }
            target.appendChild(line);
        }
        if (report.truncated) {
            const notice=document.createElement('p');
            notice.textContent='Showing first '+items.length+' of '+total+' conflicts.';
            target.appendChild(notice);
        }
    }
    // v388: Last successful automatic sync is persisted per browser and
    // displayed live while the Team Sync dialog remains open.
    const LAST_AUTO_SYNC_KEY = 'last_auto_sync_success_v388';
    const LAST_AUTO_SYNC_ERROR_KEY = 'last_auto_sync_error_v388';
    function renderLastAutoSync() {
        if (!panel?.isConnected) return;
        const el=panel.querySelector('[data-last-auto-sync]');
        if (!el) return;
        const enabled=!!get(AUTO_NEW_ENABLED_KEY,false);
        const stamp=Number(get(LAST_AUTO_SYNC_KEY,0));
        let line='Last successful auto sync: Never on this computer';
        if (Number.isFinite(stamp) && stamp>0) {
            const elapsed=Math.max(0,Math.floor((Date.now()-stamp)/1000));
            const ago=elapsed<60?elapsed+'s ago':elapsed<3600?Math.floor(elapsed/60)+'m ago':Math.floor(elapsed/3600)+'h ago';
            line='Last successful auto sync: '+new Date(stamp).toLocaleTimeString()+' ('+ago+')';
        }
        const problem=String(get(LAST_AUTO_SYNC_ERROR_KEY,'')||'');
        el.textContent=line+(autoNewBusy?' · Syncing now…':enabled?' · Auto sync ON':' · Auto sync OFF')+
            (problem?' · Last error: '+problem:'');
        el.style.color=problem?'#ffd58a':'#bde8c8';
    }
    setInterval(renderLastAutoSync,1000);
    // v394: automatic two-way synchronization of deliberate local changes.
    // The first observation is a baseline, not an instruction to delete or
    // overwrite old data. Subsequent changes persist in a local outbox.
    const AUTO_BASELINE_KEY='automatic_baseline_v394';
    const AUTO_OUTBOX_KEY='automatic_outbox_v394';
    const AUTO_MAX_WRITES=10;
    function autoSnapshot() {
        const snapshot={};
        for (const [id,row] of flatten(readLocal())) snapshot[id]=row.item_value;
        return snapshot;
    }
    function observeLocalChanges() {
        if (!get(AUTO_NEW_ENABLED_KEY,false) || busy || autoNewBusy) return;
        const now=autoSnapshot();
        const saved=get(AUTO_BASELINE_KEY,null);
        if (saved===null) {set(AUTO_BASELINE_KEY,JSON.stringify(now));return;}
        const before=parse(saved),pending=parse(get(AUTO_OUTBOX_KEY,'{}'));
        let changed=false;
        for (const id of new Set([...Object.keys(before),...Object.keys(now)])) {
            if (stable(before[id])===stable(now[id])) continue;
            const split=id.indexOf('\u0000');
            if (split<0) continue;
            const category=id.slice(0,split),item_key=id.slice(split+1);
            if (!Object.prototype.hasOwnProperty.call(CATEGORIES,category)) continue;
            // A physically removed entry is an explicit deletion only when
            // it existed in the previous live baseline.
            const value=Object.prototype.hasOwnProperty.call(now,id)
                ? now[id]
                : {...(before[id] && typeof before[id]==='object'?before[id]:{}),deleted:true,deletedAt:Date.now()};
            pending[id]={category,item_key,item_value:value,deleted:!!value?.deleted,
                changedAt:new Date().toISOString()};
            changed=true;
        }
        if (changed) {
            set(AUTO_OUTBOX_KEY,JSON.stringify(pending));
            set(AUTO_BASELINE_KEY,JSON.stringify(now));
        }
    }
    async function autoNewTick() {
        if (busy || autoNewBusy || !get(AUTO_NEW_ENABLED_KEY,false)) return;
        observeLocalChanges();
        autoNewBusy=true;busy=true;
        try {
            const t=await token();await authorized(t);
            let remote=await fetchRemote(t);
            await flushActivity(t);
            if (!remote.size) throw new Error('Remote database is empty');
            const pending=parse(get(AUTO_OUTBOX_KEY,'{}'));
            const changes=Object.entries(pending).slice(0,AUTO_MAX_WRITES);
            let uploaded=0,deletesUploaded=0,downloaded=0,deletesDownloaded=0,skipped=0;
            const conflicts=[];
            for (const [id,change] of changes) {
                // Never write if the user has edited the same entry again since
                // this outbox event was captured; the next observer will queue it.
                const live=flatten(readLocal()).get(id);
                if (live && !sameMeaning(live.item_value,change.item_value)) continue;
                const existing=remote.get(id);
                if (existing && existing.updated_at &&
                    Date.parse(existing.updated_at)>Date.parse(change.changedAt)) {
                    // A newer shared edit wins. Discard the older pending edit.
                    delete pending[id];set(AUTO_OUTBOX_KEY,JSON.stringify(pending));
                    skipped++;
                    continue;
                }
                const payload={category:change.category,item_key:change.item_key,
                    item_value:change.item_value,deleted:!!change.deleted,
                    updated_by:identity(),updated_at:new Date().toISOString()};
                if (existing) {
                    const path='/rest/v1/toolbar_shared_items?category=eq.'+
                        encodeURIComponent(change.category)+'&item_key=eq.'+
                        encodeURIComponent(change.item_key)+'&updated_at=eq.'+
                        encodeURIComponent(existing.updated_at)+'&select=category,item_key';
                    await request('PATCH',path,payload,t,{'Prefer':'return=representation'});
                } else {
                    await request('POST','/rest/v1/toolbar_shared_items?select=category,item_key',
                        payload,t,{'Prefer':'return=representation'});
                }
                remote=await fetchRemote(t);
                const confirmed=remote.get(id);
                if (!confirmed || !sameMeaning(confirmed.item_value,payload.item_value) ||
                    isDeleted(confirmed)!==!!payload.deleted)
                    throw new Error('Shared write did not verify for '+change.item_key);
                delete pending[id];set(AUTO_OUTBOX_KEY,JSON.stringify(pending));
                if (change.deleted) deletesUploaded++;else uploaded++;
                await recordActivity(t,change.deleted?'Deleted (uploaded)':'Added/updated (uploaded)',change);
            }
            // Shared database is authoritative for entries without a pending
            // local edit. This includes restoring a formerly deleted entry.
            const data=readLocal(),local=flatten(data);
            for (const [id,row] of remote) {
                if (!Object.prototype.hasOwnProperty.call(CATEGORIES,row.category)) continue;
                if (Object.prototype.hasOwnProperty.call(pending,id)) {
                    conflicts.push({category:row.category,key:row.item_key,
                        reason:'Local edit is queued for a later sync cycle.'});
                    continue;
                }
                const here=local.get(id);
                if (here && sameMeaning(here.item_value,row.item_value) &&
                    isDeleted(here)===isDeleted(row)) continue;
                data[row.category][row.item_key]=row.item_value;
                if (isDeleted(row)) deletesDownloaded++;else downloaded++;
                await recordActivity(t,isDeleted(row)?'Deletion received':'Added/updated (downloaded)',row);
            }
            if (downloaded || deletesDownloaded) {
                writeLocal(data);
                // Do not re-queue changes that came from Supabase.
                set(AUTO_BASELINE_KEY,JSON.stringify(autoSnapshot()));
            }
            storeConflictReport(conflicts);
            set(LAST_AUTO_SYNC_KEY,Date.now());
            set(LAST_AUTO_SYNC_ERROR_KEY,'');renderLastAutoSync();
            say('Auto sync: '+uploaded+' additions/updates uploaded, '+deletesUploaded+
                ' deletions uploaded, '+downloaded+' additions/updates received, '+
                deletesDownloaded+' deletions received, '+skipped+
                ' older local edits superseded; '+Object.keys(pending).length+
                ' pending changes. Last completed successfully.');
        } catch(e) {
            set(LAST_AUTO_SYNC_ERROR_KEY,String(e.message||e));renderLastAutoSync();
            say('Automatic sync error (will retry): '+e.message);
        } finally {busy=false;autoNewBusy=false;}
    }
    // v377: review only exact, named tombstones; no anonymous confirmations.
    async function reviewPriorDeletions() {
        if (busy || autoNewBusy) return;
        busy=true;
        try {
            const t=await token(); await authorized(t);
            const remote=await fetchRemote(t),local=flatten(readLocal());
            const choices=[...local].filter(([id,row])=>
                DELETE_CATEGORIES.has(row.category) && isDeleted(row) &&
                remote.has(id) && !isDeleted(remote.get(id)) &&
                sameMeaning(activeMeaning(row.item_value),activeMeaning(remote.get(id).item_value)));
            if (!choices.length) {
                say('No matching historical deletions awaiting review. They may already be published, or have conflicting values.');
                return;
            }
            let approved=0, skipped=0;
            for (const [id,row] of choices.slice(0,10)) {
                const val=row.item_value || {};
                const label=row.category==='learnedCities'
                    ? [val.city,val.state].filter(Boolean).join(', ')
                    : String(val.name || '').trim();
                // An unnamed record is NEVER offered for deletion.
                if (!label || label.length<2) {skipped++;continue;}
                const type=row.category==='learnedCities'?'CITY':'NAME';
                const answer=window.confirm(
                    'Confirm shared deletion of '+type+':\n\n'+label+
                    '\n\nExact storage key: '+row.item_key+
                    '\n\nOK = delete this entry on synced computers.\nCancel = keep it.');
                if (!answer) {skipped++;continue;}
                const latest=await fetchRemote(t),existing=latest.get(id);
                if (!existing || isDeleted(existing) ||
                    !sameMeaning(activeMeaning(existing.item_value),activeMeaning(row.item_value))) {
                    skipped++;continue;
                }
                await publishDeletion(t,existing,row);
                await recordActivity(t,'Deleted (approved manually)',row);
                const pending=parse(get('pending_explicit_deletes_v376','{}'));
                if (pending[id]) {delete pending[id];set('pending_explicit_deletes_v376',JSON.stringify(pending));}
                approved++;
            }
            say('Historical deletion review: '+approved+' named deletions published; '+skipped+
                ' skipped or canceled. Other entries unchanged.');
        } catch(e){say('Deletion review stopped: '+e.message);}
        finally{busy=false;}
    }
    // v371: isolated, top-frame-only dialog; no host-page CSS or nested iframe panels.
    const SYNC_HOST_ID = 'contact-toolbar-sync-v371-host';
    // v374: The page patches Element.remove(); bypass that override with the
    // native Node removal method, and never attempt to remove a detached node.
    function detachSyncElement(el) {
        if (!el || !el.parentNode) return;
        try { Node.prototype.removeChild.call(el.parentNode, el); }
        catch (error) { console.warn('[Toolbar Team Sync] Could not detach old panel:', error); }
    }
    function removeSyncPanels() {
        // Remove all previously installed Team Sync dialogs, including v369/v370.
        document.querySelectorAll('#'+SYNC_HOST_ID+',#contact-toolbar-team-sync-panel,[data-contact-toolbar-team-sync]').forEach(detachSyncElement);
        for (const el of document.querySelectorAll('body > div, html > div')) {
            if (el.style.position !== 'fixed') continue;
            if (el.textContent?.includes('Contact Toolbar — Team Sync') && el.querySelector('[data-close]')) detachSyncElement(el);
        }
        panel = null;
    }
    function openPanel() {
        removeSyncPanels();
        const host = document.createElement('div');
        host.id = SYNC_HOST_ID;
        host.style.cssText = 'all:initial!important;position:fixed!important;right:16px!important;top:16px!important;z-index:2147483647!important;display:block!important;pointer-events:auto!important;';
        const shadow = host.attachShadow({mode:'open'});
        const style = document.createElement('style');
        style.textContent = `
            :host { all:initial; color-scheme:dark; }
            *, *::before, *::after { box-sizing:border-box; }
            .dialog { width:390px;max-width:calc(100vw - 32px);max-height:calc(100vh - 32px);overflow:auto;
                background:#172332;color:#f6f8ff;border:1px solid #74a8da;border-radius:12px;
                box-shadow:0 12px 40px #0009;padding:18px;font:13px/1.45 Arial,sans-serif;pointer-events:auto; }
            .heading { display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px; }
            h2 {font:700 17px Arial;margin:0;color:white;}
            .close {font-size:20px;font-weight:bold;min-width:38px;min-height:36px;cursor:pointer;
                background:#344a64;color:white;border:1px solid #8ca9c7;border-radius:7px;}
            .close:hover {background:#567393;}
            .field {display:block;margin:12px 0;font-weight:bold;}
            .field input {display:block;width:100%;padding:8px;margin-top:5px;border-radius:5px;border:1px solid #9aafc8;
                background:#fff;color:#111;font:14px Arial;}
            .actions {display:flex;gap:7px;flex-wrap:wrap;margin:10px 0;}
            button:not(.close) {padding:7px 10px;background:#30465e;color:white;border:1px solid #8ca9c7;
                border-radius:6px;cursor:pointer;font:13px Arial;}
            button:not(.close):hover {background:#466584;}
            hr {border:0;border-top:1px solid #536478;margin:16px 0;}
            .note {font-size:12px;color:#cbd7e7;margin-top:12px;}
            .toggle {display:flex;gap:8px;align-items:flex-start;margin-top:14px;}
            .toggle input {margin-top:3px;}
            .status {font-size:12px;color:#c9e2ff;min-height:18px;}
            .activity {border:1px solid #536478;border-radius:6px;padding:10px;
                max-height:290px;overflow:auto;margin:8px 0;font-size:12px;}
            .activity-row {padding:7px 0;border-bottom:1px solid #42546b;overflow-wrap:anywhere;}
            .activity-row:last-child {border-bottom:0;}
            .advanced {margin-top:16px;border-top:1px solid #536478;padding-top:12px;}
            .advanced summary {cursor:pointer;font-weight:700;padding:8px 0;color:#d9e9ff;}
            .advanced[open] summary {margin-bottom:8px;}
            [data-review] {max-height:250px;overflow:auto;}
        `;
        shadow.appendChild(style);
        panel = document.createElement('section');
        panel.className = 'dialog';
        panel.setAttribute('role','dialog');
        panel.setAttribute('aria-label','Contact Toolbar Team Sync');
        panel.innerHTML = `
          <div class="heading"><h2>Contact Toolbar — Team Sync</h2><button class="close" type="button" data-close aria-label="Close Team Sync">×</button></div>
          <div class="status" data-sync-status></div>
          <div class="status" data-last-auto-sync aria-live="off" style="margin-top:8px;font-weight:bold;"></div>
          <hr>
          <label class="toggle"><input data-auto-new type="checkbox"><b>Automatic two-way sync (every 30 seconds)</b></label>
          <div class="actions"><button data-conflicts-open type="button">View Sync Conflicts</button><button data-activity-open>View Shared Activity Log</button></div>
          <div class="activity" data-conflict-report hidden></div>
          <label class="field">This computer's log name (future entries)<input data-device-label type="text" maxlength="60" placeholder="e.g. Main PC"></label>
          <div class="status" data-device-save-status aria-live="polite"></div>
          <div class="activity" data-activity hidden></div>
          <details class="advanced">
            <summary>Advanced sync tools &amp; recovery</summary>
            <p class="note">You normally remain signed in. Use these fields only if your session expires or you want to sign out.</p>
            <label class="field">Email<input data-email type="email" autocomplete="username"></label>
            <label class="field">Password<input data-pass type="password" autocomplete="current-password"></label>
            <div class="actions"><button data-login>Sign in</button><button data-logout>Sign out</button></div>
            <hr>
            <p class="note">Use the remaining tools only when reviewing older changes, troubleshooting, or restoring an empty database.</p>
            <div class="actions"><button data-download>Download Missing Only (safe)</button><button data-compare>Export Comparison</button></div>
            <div class="actions"><button data-review-open>Review NEW Uploads (max 10 per batch)</button><button data-review-deletes>Review Previous Deletions</button></div>
            <div data-review></div>
            <div class="actions"><button data-now>Sync Now (legacy; may overwrite)</button></div>
            <label class="field">Seed empty database from backup:<input data-file type="file" accept=".json,application/json"></label>
            <div class="actions"><button data-seed>Upload backup (once)</button></div>
          </details>
          <p class="note">New additions, edits, and deletions sync automatically. The newest saved change takes precedence; the first observation does not treat missing data as a deletion.</p>
        `;
        shadow.appendChild(panel);
        document.documentElement.appendChild(host);
        // v373: event listeners are scoped to this opening and removed on close.
        const closeButton = panel.querySelector('[data-close]');
        const listeners = new AbortController();
        const closePanel = event => {
            event?.preventDefault();
            event?.stopPropagation();
            const pendingName=panel?.querySelector('[data-device-label]');
            if (pendingName) set(DEVICE_LABEL_KEY,pendingName.value.trim().slice(0,60)||deviceId);
            listeners.abort();
            host.style.setProperty('display','none','important');
            detachSyncElement(host);
            if (panel && !panel.isConnected) panel = null;
        };
        const coordinateClose = event => {
            if (!host.isConnected) return;
            const rect = closeButton.getBoundingClientRect();
            if (event.clientX >= rect.left && event.clientX <= rect.right &&
                event.clientY >= rect.top && event.clientY <= rect.bottom) closePanel(event);
        };
        window.addEventListener('pointerdown', coordinateClose, {capture:true,signal:listeners.signal});
        closeButton.addEventListener('click', closePanel);
        shadow.addEventListener('keydown', event => {
            if (event.key === 'Escape') closePanel(event);
        });
        // The legacy manual-sync status is not the automatic-sync state.
        // Do not show its stale 'Sync OFF' message while auto sync is enabled.
        const autoEnabledOnOpen=!!get(AUTO_NEW_ENABLED_KEY,false);
        const oldOffStatus=/^Sync OFF \(local data only\)$/.test(status);
        panel.querySelector('[data-sync-status]').textContent=
            autoEnabledOnOpen && (oldOffStatus || status==='Automatic sync status pending')
                ? 'Automatic sync ON — waiting for the next completed check.'
                : !autoEnabledOnOpen && (oldOffStatus || status==='Automatic sync status pending')
                    ? 'Automatic sync OFF (local data only)'
                    : status;
        renderLastAutoSync();
        panel.querySelector('[data-auto-new]').checked=!!get(AUTO_NEW_ENABLED_KEY,false);
        panel.querySelector('[data-login]').onclick=async()=>{try{await signIn(panel.querySelector('[data-email]').value.trim(),panel.querySelector('[data-pass]').value);panel.querySelector('[data-pass]').value='';}catch(e){say('Login error: '+e.message);}};
        panel.querySelector('[data-logout]').onclick=()=>{set('enabled',false);set(AUTO_NEW_ENABLED_KEY,false);set('session','{}');panel.querySelector('[data-auto-new]').checked=false;say('Signed out; auto sync OFF');};
        panel.querySelector('[data-seed]').onclick=()=>{const f=panel.querySelector('[data-file]').files?.[0];if(!f){say('Choose your exported backup JSON first');return;}seedBackup(f);};
        panel.querySelector('[data-now]').onclick=syncNow;
        panel.querySelector('[data-download]').onclick=downloadMissingOnly;
        panel.querySelector('[data-compare]').onclick=compareAndDownload;
        panel.querySelector('[data-review-open]').onclick=openUploadReview;
        panel.querySelector('[data-review-deletes]').onclick=()=>void reviewPriorDeletions();
        panel.querySelector('[data-conflicts-open]').onclick=()=>{
            const report=panel.querySelector('[data-conflict-report]');
            void inspectSyncConflicts();
        };
        renderConflictReport();
        panel.querySelector('[data-activity-open]').onclick=()=>void showSharedActivity();
        const labelInput=panel.querySelector('[data-device-label]');
        labelInput.value=deviceLabel();
        const labelStatus=panel.querySelector('[data-device-save-status]');
        let labelSaveTimer=null;
        const saveDeviceLabel=()=>{
            if (labelSaveTimer!==null) {clearTimeout(labelSaveTimer);labelSaveTimer=null;}
            const name=labelInput.value.trim().slice(0,60)||deviceId;
            set(DEVICE_LABEL_KEY,name);
            labelStatus.textContent='Saved as: '+name+' (this computer)';
        };
        // Save as the user types, not only on change/blur. Closing the panel
        // or clicking elsewhere must not lose the name.
        labelInput.addEventListener('input',()=>{
            labelStatus.textContent='Saving...';
            if (labelSaveTimer!==null) clearTimeout(labelSaveTimer);
            labelSaveTimer=setTimeout(saveDeviceLabel,300);
        });
        labelInput.addEventListener('blur',saveDeviceLabel);
        labelInput.addEventListener('change',saveDeviceLabel);
        labelStatus.textContent='Current name: '+deviceLabel();
        panel.querySelector('[data-auto-new]').onchange=e=>{if(e.target.checked){e.target.checked=false;void enableAutoNew().then(()=>{if(panel?.isConnected){panel.querySelector('[data-auto-new]').checked=!!get(AUTO_NEW_ENABLED_KEY,false);renderLastAutoSync();}});}else{set(AUTO_NEW_ENABLED_KEY,false);say('Safe automatic sync OFF');renderLastAutoSync();}};
    }
    GM_registerMenuCommand('Contact Toolbar — Team Sync',()=>setTimeout(openPanel,0));
    // v366: Never run the legacy overwrite-capable sync on a timer.
    set('enabled',false);
    // Observe explicit local edits promptly, including while Firefox is offline.
    if (get(AUTO_NEW_ENABLED_KEY,false) && get(AUTO_BASELINE_KEY,null)===null)
        set(AUTO_BASELINE_KEY,JSON.stringify(autoSnapshot()));
    setInterval(observeLocalChanges,1000);
    setInterval(()=>{if(get(AUTO_NEW_ENABLED_KEY,false))void autoNewTick();},30000);
    console.info('Toolbar v363 team sync available via Tampermonkey menu (OFF by default).');
})();
// ===== END TEAM SYNC BRIDGE =====

})();


// --- Location Patch (Safe Version - Option A) ---

// v79: Area must not depend on the visible Phone field finishing its repaint.
// WallStJobs can expose txtResumeRaw first, so read a usable 10-digit phone
// directly from the resume when the form Phone field/cache is still blank.
function getAreaSourcePhone() {
    const inp =
        document.getElementById("txtPhoneDataEntry") ||
        document.getElementById("txtPhone");

    let phone = inp ? String(inp.value || "").trim() : "";
    if (phone) return phone;

    phone = String(window.__frt7_last_phone || "").trim();
    if (phone) return phone;

    // v115 AREA SCOPE FIX:
    // This helper is outside the main toolbar IIFE, so it must not depend on the
    // IIFE-private getResumeText(). Read txtResumeRaw directly, with an iframe fallback.
    let rawSource = String(document.getElementById("txtResumeRaw")?.value || "");
    if (!rawSource) {
        try {
            const iframe = document.querySelector("#divResumeContainer iframe");
            const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
            rawSource = String(
                doc?.querySelector(".Section1")?.innerText ||
                doc?.body?.innerText ||
                ""
            );
        } catch (_) {}
    }

    const raw = rawSource
        .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212\uFE58\uFE63\uFF0D]/g, "-")
        .replace(/[\u00A0\u2007\u202F]/g, " ");

    if (!raw) return "";

    // v213: Area-code fallback must obey the exact same never-use-reference-phone rule.
    const areaPhoneIsReference = matchIndex => {
        const before = raw.slice(Math.max(0, matchIndex - 700), matchIndex).replace(/\s+/g, " ");
        if (/\b(?:professional\s+|personal\s+|employment\s+)?references?\b[^\n]{0,260}$/i.test(before)) return true;
        if (/\bref(?:erence)?\s*[:#-][^\n]{0,260}$/i.test(before)) return true;
        const upper = before.toUpperCase();
        const refs = [...upper.matchAll(/\bREFERENCES?\b/g)];
        const lastRef = refs.length ? refs[refs.length - 1].index : -1;
        if (lastRef >= 0) {
            const afterRef = upper.slice(lastRef);
            const laterSection = /\b(?:EXPERIENCE|WORK EXPERIENCE|PROFESSIONAL EXPERIENCE|EMPLOYMENT HISTORY|EDUCATION|SKILLS|SUMMARY|OBJECTIVE|CERTIFICATIONS?|LICENSES?|PROJECTS?|VOLUNTEER|AWARDS?)\b/.exec(afterRef.slice(10));
            if (!laterSection) return true;
        }
        return false;
    };

    // Prefer explicitly labeled cell/mobile numbers, matching the Phone button's policy.
    const mobileRe = /(?:^|[\s|,;])(?:cell\s*phone|mobile\s*phone|cellular|mobile|cell|mob|c|m)(?:\s*(?:phone|number|no\.?|#))?\s*[:=#-]?\s*(?:\+?1[\s().\/-]*)?(\d{3})[\s().\/-]*(\d{3})[\s.\/-]*(\d{4})(?!\d)/ig;
    let m;
    while ((m = mobileRe.exec(raw))) {
        const digits = `${m[1]}${m[2]}${m[3]}`;
        if (areaPhoneIsReference(m.index)) continue;
        if (!/^(\d)\1{9}$/.test(digits) && !digits.startsWith("000") && digits.slice(3, 6) !== "000") {
            return digits;
        }
    }

    const phoneRe = /(?:^|[^\d])(?:\+?1[\s().\/-]*)?(\d{3})[\s().\/-]*(\d{3})[\s.\/-]*(\d{4})(?!\d)/g;
    while ((m = phoneRe.exec(raw))) {
        const digits = `${m[1]}${m[2]}${m[3]}`;
        if (areaPhoneIsReference(m.index)) continue;
        if (!/^(\d)\1{9}$/.test(digits) && !digits.startsWith("000") && digits.slice(3, 6) !== "000") {
            return digits;
        }
    }

    return "";
}

function fillLocationFromPhone(allowHalfAddressOverride = false) {

    // v257 FINAL AUTO-AREA GATE: this sits at the actual writer, not just one
    // upstream fallback branch, so no automatic Area path can bypass it.
    if (!allowHalfAddressOverride) {
        try {
            if (window.__frt7_should_block_auto_area_for_half_address?.()) {
                console.info("Toolbar AREA v257: Auto Area BLOCKED because resume header has a street address but no trusted/learned City+State.");
                return false;
            }
        } catch (_) {}
    }

    console.log("Area Code button clicked");

    // --------------------------------------------
    // Load area codes ON DEMAND
    // --------------------------------------------
    if (!AREA_CODE_LOOKUP) {
        console.log("Requesting area codes from background…");

        browser.runtime.sendMessage({ action: "getAreaCodes" })
            .then(map => {
                if (!map || !Object.keys(map).length) {
                    console.warn("Area codes still not ready.");
                    return;
                }

                AREA_CODE_LOOKUP = map;
                console.log("Area codes received:", Object.keys(map).length);

                // 🔁 Retry now that data exists
                fillLocationFromPhone(allowHalfAddressOverride);
            })
            .catch(err => {
                console.warn("Failed to receive area codes", err);
            });

        return;
    }

    // --------------------------------------------
    // Normal lookup logic
    // --------------------------------------------
    // v66: The CURRENT applicant's visible Phone field is authoritative.
    // __frt7_last_phone can briefly still contain the prior applicant's number
    // during same-page navigation, which previously made Area use stale data and
    // leave the current City untouched.
    const phone = getAreaSourcePhone();
    if (!phone) {
        console.info("Toolbar AREA v79: no usable phone yet; Area will be retried by Auto recovery if enabled.");
        return false;
    }

    let digits = phone.replace(/\D/g, "");
    if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
    if (digits.length < 3) return;

    const area = digits.slice(0, 3);

    // v115 AREA SCOPE FIX:
    // fillLocationFromPhone() lives outside the main toolbar IIFE, so it cannot
    // directly call loadCustomAreaCodes() or read customAreaCodesCache.
    // Read the same saved custom-area database directly here, then fall back to
    // the built-in table.
    let directCustomAreaCodes = {};
    try {
        const rawCustom = GM_getValue("frt7_custom_area_codes_v105", "{}");
        const parsedCustom = typeof rawCustom === "string"
            ? JSON.parse(rawCustom || "{}")
            : rawCustom;
        if (parsedCustom && typeof parsedCustom === "object") {
            directCustomAreaCodes = parsedCustom;
        }
    } catch (_) {
        directCustomAreaCodes = {};
    }

    const customInfo = directCustomAreaCodes[area];
    const info = (customInfo && customInfo.deleted !== true ? customInfo : null) || AREA_CODE_LOOKUP[area];
    if (!info) return false;

    const c = document.getElementById("txtCityDataEntry");
    const s = document.getElementById("txtStateDataEntry");
    const z = document.getElementById("txtZipDataEntry");
    const l = document.getElementById("txtZipLookupEntry");

    // v51: Area lookup ALWAYS writes the mapped CITY when an area code matches.
    // Trigger the same field events WallStJobs sees for normal edits so the city
    // cannot remain visually filled but internally stale.
    if (c) {
        c.value = normalizeContactDisplayCase(info.city);
        try { triggerEvents(c); } catch (_) {}
    }
    if (s) {
        s.value = String(info.state || "").trim().toUpperCase();
        try { triggerEvents(s); } catch (_) {}
    }
    if (z) {
        z.value = "";
        try { triggerEvents(z); } catch (_) {}
    }
    if (l) {
        const lookupValue =
            normalizeContactDisplayCase(info.city) + ", " +
            String(info.state || "").trim().toUpperCase();

        // v69: WallStJobs can finish processing the City/State change a fraction
        // after Area writes it. A single immediate Enter can therefore be ignored.
        // Re-assert the lookup value and retry Enter while ZIP is still blank.
        const runAreaZipLookup = () => {
            const freshCity = document.getElementById("txtCityDataEntry");
            const freshState = document.getElementById("txtStateDataEntry");
            const freshZip = document.getElementById("txtZipDataEntry");
            const freshLookup = document.getElementById("txtZipLookupEntry");
            if (!freshLookup) return;

            // v300 AREA ZIP VALIDATION:
            // WallStJobs can occasionally populate a five-digit ZIP that belongs to
            // the wrong state after Area changes City/State (for example KY -> 20000).
            // A nonblank ZIP is only allowed to stop Area's retry loop when it maps
            // back to the Area-derived state. Otherwise clear it and continue the
            // existing bounded lookup retries; if the site never returns a valid ZIP,
            // leaving ZIP blank is safer than preserving a known-wrong ZIP.
            const expectedCity = normalizeContactDisplayCase(info.city);
            const expectedState = String(info.state || "").trim().toUpperCase();
            const populatedZipV300 = String(freshZip?.value || "").trim();
            if (populatedZipV300) {
                const populatedZipStateV300 = /^\d{5}$/.test(populatedZipV300)
                    ? (typeof window.__frt7_state_from_zip_v306 === "function"
                        ? window.__frt7_state_from_zip_v306(populatedZipV300)
                        : "")
                    : "";
                if (populatedZipStateV300 === expectedState) return;

                if (freshZip) {
                    freshZip.value = "";
                    try { triggerEvents(freshZip); } catch (_) {}
                }
                console.info(
                    `Toolbar AREA v300: rejected ZIP ${populatedZipV300} after Area -> ` +
                    `${expectedCity}, ${expectedState}; ZIP maps to ` +
                    `${populatedZipStateV300 || "unknown state"}. Retrying lookup.`
                );
            }

            // Only retry while this is still the same Area-derived location.
            if (normalizeContactDisplayCase(String(freshCity?.value || "").trim()) !== expectedCity) return;
            if (String(freshState?.value || "").trim().toUpperCase() !== expectedState) return;

            freshLookup.value = lookupValue;
            try { triggerEvents(freshLookup); } catch (_) {}
            // Fire the ZIP lookup Enter sequence directly here. Keeping this local
            // avoids the editor/linter warning on the helper call while preserving
            // the exact same lookup behavior.
            for (const type of ["input", "change"]) {
                freshLookup.dispatchEvent(new Event(type, { bubbles: true }));
            }
            for (const type of ["keydown", "keypress", "keyup"]) {
                freshLookup.dispatchEvent(new KeyboardEvent(type, {
                    bubbles: true,
                    cancelable: true,
                    key: "Enter",
                    code: "Enter",
                    which: 13,
                    keyCode: 13
                }));
            }
            console.info(`Toolbar AREA v69: requested ZIP lookup for ${lookupValue}.`);
        };

        // Immediate attempt plus retries after the site has accepted City/State.
        [0, 150, 450, 900, 1600].forEach(delay => {
            setTimeout(runAreaZipLookup, delay);
        });
    }
}


// v426: Display-only verification for resumes whose raw textarea is empty/tiny.
// The site's own validation reads txtResumeRaw and can falsely report no phone/ZIP
// even though the same-origin Word preview contains both. Never change contact fields.
(function frt426IframeValidationDisplay() {
    if (window !== window.top) return;
    const phoneBad = /No obvious phone #s in resume!/i;
    const zipBad = /No zips found in resume, so double check this zip\./i;
    const nameBad = /(?:Last name not found in resume\.|First name not found in resume\.|Names? not found in resume\.)/i;
    const emailBad = /Email address not found in resume\./i;
    const phoneOk = /^\s*Phone # is OK!\s*$/i;
    const zipOk = /^\s*ZIP is OK!\s*$/i;
    const originalText = new WeakMap();
    // Site validation can repaint the warning red after our initial green pass.
    // Keep a scoped, high-priority rule for verified messages only.
    const style = document.createElement('style');
    style.textContent = '[data-frt428-verified="phone"], [data-frt428-verified="phone"] *,' +
        '[data-frt428-verified="zip"], [data-frt428-verified="zip"] *,' +
        '[data-frt428-verified="name"], [data-frt428-verified="name"] *,' +
        '[data-frt428-verified="email"], [data-frt428-verified="email"] * { color: #008000 !important; }';
    (document.head || document.documentElement).appendChild(style);
    let running = false;
    function update() {
        if (running) return;
        running = true;
        try {
            const raw = String(document.getElementById('txtResumeRaw')?.value || '').trim();
            if (raw.length >= 100) return;
            const frame = document.querySelector('iframe[src*="displayresumetext.asp"]') ||
                          document.querySelector('#divResumeContainer iframe');
            let doc;
            try { doc = frame?.contentDocument || frame?.contentWindow?.document; } catch (_) {}
            const resume = String(doc?.querySelector('.Section1')?.innerText ||
                                  doc?.body?.innerText || doc?.body?.textContent || '')
                .replace(/[\u00a0\u2007\u202f]/g, ' ');
            if (resume.length < 150) return;
            const phoneInput = document.getElementById('txtPhoneDataEntry') || document.getElementById('txtPhone');
            let phone = String(phoneInput?.value || '').replace(/\D/g, '');
            if (phone.length === 11 && phone[0] === '1') phone = phone.slice(1);
            const phoneMatches = phone.length === 10 && [...resume.matchAll(/(?:^|\D)(?:\+?1[\s().-]*)?(\d{3})[\s().-]*(\d{3})[\s().-]*(\d{4})(?!\d)/g)]
                .some(m => m[1] + m[2] + m[3] === phone);
            const zip = String(document.getElementById('txtZipDataEntry')?.value || '').trim();
            const zipMatches = /^\d{5}$/.test(zip) && new RegExp('(^|\\D)' + zip + '(?!\\d)').test(resume);
            const first = String((document.getElementById('txtFirstNameDataEntry') || document.getElementById('txtFirstName'))?.value || '').trim();
            const last = String((document.getElementById('txtLastNameDataEntry') || document.getElementById('txtLastName'))?.value || '').trim();
            const escapeRegex = v => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const nameMatches = !!(first && last && new RegExp('(^|[^\\p{L}\\p{N}])' + escapeRegex(first) + '\\s+' + escapeRegex(last) + '(?![\\p{L}\\p{N}])', 'iu').test(resume));
            const email = String(document.getElementById('txtEmail')?.value || '').trim();
            const emailMatches = !!(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
                new RegExp('(^|[^a-z0-9._%+\\-])' + escapeRegex(email) + '(?![a-z0-9._%+\\-])', 'i').test(resume));
            // Only touch text nodes containing the exact site's false-negative messages.
            // Do not alter the original site validation or suppress real mismatches.
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            const nodes = [];
            while (walker.nextNode()) {
                const n = walker.currentNode;
                if (n.parentElement?.closest('script,style,textarea,input,option')) continue;
                if (phoneBad.test(n.nodeValue || '') || zipBad.test(n.nodeValue || '') || nameBad.test(n.nodeValue || '') || emailBad.test(n.nodeValue || '') || originalText.has(n) || phoneOk.test(n.nodeValue || '') || zipOk.test(n.nodeValue || '')) nodes.push(n);
            }
            for (const n of nodes) {
                const current = n.nodeValue || '';
                if (!originalText.has(n) && (phoneBad.test(current) || zipBad.test(current) || nameBad.test(current) || emailBad.test(current))) originalText.set(n, current);
                const source = originalText.get(n) || current;
                let replacement = source;
                if (phoneMatches) replacement = replacement.replace(phoneBad, 'Phone # is OK!');
                if (zipMatches) replacement = replacement.replace(zipBad, 'ZIP is OK!');
                if (nameMatches) replacement = replacement.replace(nameBad, 'Names are OK.');
                if (emailMatches) replacement = replacement.replace(emailBad, 'Email address found in resume.');
                if (replacement !== current) n.nodeValue = replacement;
                const parent = n.parentElement;
                if (parent && (replacement !== source || (phoneMatches && phoneOk.test(replacement)) || (zipMatches && zipOk.test(replacement)) || (nameMatches && replacement.includes('Names are OK.')) || (emailMatches && replacement.includes('Email address found in resume.')))) {
                    if (phoneMatches && phoneOk.test(replacement)) parent.setAttribute('data-frt428-verified', 'phone');
                    else if (zipMatches && zipOk.test(replacement)) parent.setAttribute('data-frt428-verified', 'zip');
                    else if (nameMatches && replacement.includes('Names are OK.')) parent.setAttribute('data-frt428-verified', 'name');
                    else if (emailMatches && replacement.includes('Email address found in resume.')) parent.setAttribute('data-frt428-verified', 'email');
                    parent.style.setProperty('color', '#008000', 'important');
                    // Site validation often colors the message itself or a nested span red.
                    // Style the exact text-bearing element, not unrelated sibling warnings.
                    if (parent.matches('span,div,p,b,strong,font,label')) {
                        parent.style.setProperty('color', '#008000', 'important');
                        parent.querySelectorAll('span,b,strong,font').forEach(el => el.style.setProperty('color', '#008000', 'important'));
                    }
                } else if (parent && originalText.has(n)) {
                    parent.removeAttribute('data-frt428-verified');
                    parent.style.removeProperty('color');
                }
            }
        } finally { running = false; }
    }
    // v431: React to actual site changes rather than repainting every 250ms.
    // The previous polling caused visible color oscillation when site validation
    // and our verification happened at different points in the timer cycle.
    let queued = false;
    const schedule = () => {
        if (queued) return;
        queued = true;
        queueMicrotask(() => { queued = false; update(); });
    };
    const observer = new MutationObserver(mutations => {
        // Ignore changes to our own verification attributes/style/text; only
        // site changes to validation content need another pass.
        if (running) return;
        if (mutations.some(m => m.type === 'childList' ||
            (m.type === 'characterData' &&
             (phoneBad.test(m.target.nodeValue || '') || zipBad.test(m.target.nodeValue || '') || nameBad.test(m.target.nodeValue || '') || emailBad.test(m.target.nodeValue || ''))))) schedule();
    });
    observer.observe(document.body, { subtree: true, childList: true, characterData: true });
    setTimeout(update, 100);
    setTimeout(update, 500);
    setTimeout(update, 1200);
})();
