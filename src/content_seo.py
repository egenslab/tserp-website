"""SEO content for feature and solution detail pages: overview paragraphs and FAQs (bilingual)."""
from content import T

# slug -> dict(overview=[T, T], faqs=[(T question, T answer), ...], keywords="...")
FEATURE_SEO = {
    "flights": dict(
        keywords="flight booking software, airline ticketing system, GDS booking engine, travel agency ticketing software",
        overview=[
            T("TravelSuite ERP's flight booking software connects your agency to GDS, NDC and low-cost carrier content and puts search, booking and ticketing on one screen. Counter staff, online customers and B2B agents all book from the same fares, with your markup applied automatically.",
              "TravelSuite ERP-এর ফ্লাইট বুকিং সফটওয়্যার আপনার এজেন্সিকে GDS, NDC ও লো-কস্ট এয়ারলাইনের ভাড়ার সাথে যুক্ত করে এবং খোঁজা, বুকিং ও টিকিটিং এক স্ক্রিনে আনে। কাউন্টার স্টাফ, অনলাইন কাস্টমার ও B2B এজেন্ট সবাই একই ভাড়া থেকে বুক করেন, আপনার মার্কআপ অটোমেটিক যুক্ত হয়।"),
            T("Because ticketing is part of the ERP, every issue, reissue, refund and void updates the passenger record, the agent ledger and your supplier payable instantly. Month-end BSP reconciliation becomes a report, not a spreadsheet exercise.",
              "টিকিটিং ERP-এর অংশ হওয়ায় প্রতিটি ইস্যু, রিইস্যু, রিফান্ড ও ভয়েড সাথে সাথে যাত্রীর রেকর্ড, এজেন্ট লেজার ও সাপ্লায়ার দেনা আপডেট করে। মাস শেষের BSP মিলানো তখন স্প্রেডশিটের কাজ নয়, একটি রিপোর্ট মাত্র।"),
        ],
        faqs=[
            (T("Which airline content can I sell?", "কোন এয়ারলাইনের ভাড়া বিক্রি করতে পারব?"),
             T("You can connect Amadeus, Sabre, Travelport, airline NDC APIs and aggregators such as Duffel using your own supplier credentials.", "নিজের সাপ্লায়ার অ্যাকাউন্ট দিয়ে Amadeus, Sabre, Travelport, এয়ারলাইন NDC API এবং Duffel-এর মতো অ্যাগ্রিগেটর যুক্ত করতে পারবেন।")),
            (T("Can B2B agents issue tickets themselves?", "B2B এজেন্টরা কি নিজেরাই টিকিট ইস্যু করতে পারবেন?"),
             T("Yes. Agents book and issue from their portal using their wallet or credit limit, and you control which airlines and fares they see.", "হ্যাঁ। এজেন্টরা ওয়ালেট বা ক্রেডিট লিমিট দিয়ে নিজের পোর্টাল থেকে বুক ও ইস্যু করেন, আর কোন এয়ারলাইন ও ভাড়া দেখবেন তা আপনি ঠিক করেন।")),
            (T("Does it handle refunds and reissues?", "রিফান্ড ও রিইস্যু কি করা যায়?"),
             T("Yes. Refunds, reissues and voids are processed from the booking, with penalties and service fees posted to accounts automatically.", "হ্যাঁ। বুকিং থেকেই রিফান্ড, রিইস্যু ও ভয়েড করা যায়, জরিমানা ও সার্ভিস ফি অটোমেটিক হিসাবে পোস্ট হয়।")),
        ]),
    "hotels": dict(
        keywords="hotel booking software, hotel reservation system for travel agencies, hotel contracting software, bedbank integration",
        overview=[
            T("Sell hotels from your own contracts and from bedbanks in one search. TravelSuite ERP manages room types, rate plans, allotments, meal plans and cancellation policies so your team quotes the right price every time.",
              "নিজের চুক্তি ও বেডব্যাংক — দুই উৎসের হোটেল এক সার্চে বিক্রি করুন। TravelSuite ERP রুমের ধরন, রেট প্ল্যান, অ্যালটমেন্ট, খাবারের প্ল্যান ও বাতিলের নীতি সামলায়, তাই আপনার টিম প্রতিবার সঠিক মূল্য দেয়।"),
            T("Direct contracts usually carry better margins, and the allotment control stops the same room being sold twice. Vouchers, invoices and supplier payables are created with the booking.",
              "সরাসরি চুক্তিতে সাধারণত মুনাফা বেশি, আর অ্যালটমেন্ট নিয়ন্ত্রণ একই রুম দুবার বিক্রি হওয়া ঠেকায়। বুকিংয়ের সাথেই ভাউচার, ইনভয়েস ও সাপ্লায়ার দেনা তৈরি হয়।"),
        ],
        faqs=[
            (T("Can I load my own hotel contracts?", "নিজের হোটেল চুক্তি কি যোগ করা যায়?"),
             T("Yes. Add hotels, room types, seasons and rates, then sell them alone or next to supplier inventory.", "হ্যাঁ। হোটেল, রুমের ধরন, মৌসুম ও রেট যোগ করে আলাদাভাবে বা সাপ্লায়ার ইনভেন্টরির পাশে বিক্রি করুন।")),
            (T("Which bedbanks are supported?", "কোন বেডব্যাংক সাপোর্ট করে?"),
             T("Hotelbeds, Expedia Rapid, WebBeds, TBO and RateHawk, among others, using your own agreements.", "আপনার নিজস্ব চুক্তিতে Hotelbeds, Expedia Rapid, WebBeds, TBO ও RateHawk-সহ আরও অনেক।")),
            (T("Are Makkah and Madinah hotels supported?", "মক্কা ও মদিনার হোটেল কি সাপোর্ট করে?"),
             T("Yes. They can be sold on their own or inside Hajj and Umrah packages.", "হ্যাঁ। আলাদাভাবে বা হজ ও উমরাহ প্যাকেজের ভেতরে বিক্রি করা যায়।")),
        ]),
    "hajj": dict(
        keywords="Hajj management software, Umrah software, Hajj and Umrah agency system, pilgrim management software",
        overview=[
            T("TravelSuite ERP includes a complete Hajj and Umrah management system: pilgrim registration, package building, group and room allocation, visa tracking and instalment collection, all linked to your accounts.",
              "TravelSuite ERP-এ আছে পূর্ণ হজ ও উমরাহ ব্যবস্থাপনা সিস্টেম: হাজি রেজিস্ট্রেশন, প্যাকেজ তৈরি, গ্রুপ ও রুম বণ্টন, ভিসা ট্র্যাকিং ও কিস্তি আদায় — সব আপনার হিসাবের সাথে যুক্ত।"),
            T("Agencies in Bangladesh, Malaysia and the GCC use it to run busy seasons without spreadsheets. Every pilgrim file shows documents, payments and status, so nothing is missing on departure day.",
              "বাংলাদেশ, মালয়েশিয়া ও GCC-র এজেন্সিগুলো স্প্রেডশিট ছাড়াই ব্যস্ত মৌসুম চালাতে এটি ব্যবহার করে। প্রতিটি হাজির ফাইলে ডকুমেন্ট, পেমেন্ট ও স্ট্যাটাস দেখা যায়, তাই যাত্রার দিন কিছু বাদ পড়ে না।"),
        ],
        faqs=[
            (T("Can pilgrims pay in instalments?", "হাজিরা কি কিস্তিতে পরিশোধ করতে পারবেন?"),
             T("Yes. Set a payment schedule per pilgrim, record each instalment and send automatic reminders before due dates.", "হ্যাঁ। প্রতি হাজির জন্য পেমেন্ট সূচি ঠিক করুন, প্রতিটি কিস্তি রেকর্ড করুন এবং নির্ধারিত তারিখের আগে অটোমেটিক রিমাইন্ডার পাঠান।")),
            (T("Does it support both Hajj and Umrah?", "হজ ও উমরাহ দুটোই কি সাপোর্ট করে?"),
             T("Yes. Run Hajj seasons and year-round Umrah departures with separate packages, groups and reports.", "হ্যাঁ। আলাদা প্যাকেজ, গ্রুপ ও রিপোর্টসহ হজ মৌসুম এবং সারা বছরের উমরাহ চালান।")),
            (T("Can I share pilgrim lists with service providers?", "সার্ভিস প্রোভাইডারদের সাথে কি হাজির তালিকা শেয়ার করা যায়?"),
             T("Yes. Export group, room and flight lists to Excel or PDF for hotels, transport and guides.", "হ্যাঁ। হোটেল, ট্রান্সপোর্ট ও গাইডের জন্য গ্রুপ, রুম ও ফ্লাইটের তালিকা Excel বা PDF-এ এক্সপোর্ট করুন।")),
        ]),
    "visa": dict(
        keywords="visa processing software, visa application management system, visa agency software, visa tracking system",
        overview=[
            T("Visa processing software that turns every application into a tracked file. Requirements by country and visa type, document checklists, submission dates and responsible staff are all in one place.",
              "ভিসা প্রসেসিং সফটওয়্যার, যা প্রতিটি আবেদনকে ট্র্যাক করা ফাইলে রূপ দেয়। দেশ ও ভিসার ধরন অনুযায়ী শর্ত, ডকুমেন্ট চেকলিস্ট, জমার তারিখ ও দায়িত্বপ্রাপ্ত স্টাফ — সব এক জায়গায়।"),
            T("Applicants receive SMS, email or WhatsApp updates at each stage, which cuts status calls. Visa fees, service charges and profit are recorded per file.",
              "প্রতিটি ধাপে আবেদনকারী SMS, ইমেইল বা WhatsApp-এ আপডেট পান, ফলে স্ট্যাটাস জানতে ফোন কমে। প্রতি ফাইলে ভিসা ফি, সার্ভিস চার্জ ও মুনাফা রেকর্ড হয়।"),
        ],
        faqs=[
            (T("Can I set different checklists for each country?", "প্রতিটি দেশের জন্য কি আলাদা চেকলিস্ট রাখা যায়?"),
             T("Yes. Create requirement lists per country and visa type; they are copied into each new application.", "হ্যাঁ। দেশ ও ভিসার ধরন অনুযায়ী শর্তের তালিকা তৈরি করুন; প্রতিটি নতুন আবেদনে তা যুক্ত হয়ে যায়।")),
            (T("Can customers upload documents online?", "কাস্টমার কি অনলাইনে ডকুমেন্ট আপলোড করতে পারবেন?"),
             T("Yes. Applicants can upload documents through your website or send them on WhatsApp for your team to attach.", "হ্যাঁ। আবেদনকারী ওয়েবসাইটে আপলোড করতে পারেন অথবা WhatsApp-এ পাঠালে আপনার টিম যুক্ত করে দেয়।")),
            (T("Is visa processing linked to accounts?", "ভিসা প্রসেসিং কি হিসাবের সাথে যুক্ত?"),
             T("Yes. Fees, embassy charges and service income post to your ledger automatically.", "হ্যাঁ। ফি, দূতাবাসের চার্জ ও সার্ভিস আয় অটোমেটিক লেজারে পোস্ট হয়।")),
        ]),
    "tours": dict(
        keywords="tour package software, tour operator software, itinerary builder, holiday package booking system",
        overview=[
            T("Build tour packages with day-by-day itineraries, photos, inclusions and pricing for adults, children and groups. Publish them on your website, share them with agents and send PDF brochures on WhatsApp.",
              "দিনভিত্তিক ভ্রমণসূচি, ছবি, অন্তর্ভুক্তি এবং প্রাপ্তবয়স্ক, শিশু ও গ্রুপের মূল্যসহ ট্যুর প্যাকেজ তৈরি করুন। ওয়েবসাইটে প্রকাশ করুন, এজেন্টদের সাথে শেয়ার করুন আর WhatsApp-এ PDF ব্রোশিওর পাঠান।"),
            T("Fixed departures keep seat counts accurate, and supplier costing shows your margin before you sell. After the trip, expenses and payables close out the package profit.",
              "নির্দিষ্ট ডিপারচার সিটের হিসাব সঠিক রাখে, আর সাপ্লায়ার খরচ বিক্রির আগেই মুনাফা দেখায়। ট্রিপ শেষে খরচ ও দেনা মিলিয়ে প্যাকেজের মুনাফা চূড়ান্ত হয়।"),
        ],
        faqs=[
            (T("Can I sell the same package to customers and agents?", "একই প্যাকেজ কি কাস্টমার ও এজেন্ট দুজনকেই বিক্রি করা যায়?"),
             T("Yes. Set a public price for your website and net prices or commission for agents.", "হ্যাঁ। ওয়েবসাইটের জন্য পাবলিক মূল্য আর এজেন্টদের জন্য নেট মূল্য বা কমিশন ঠিক করুন।")),
            (T("Does it support group departures?", "গ্রুপ ডিপারচার কি সাপোর্ট করে?"),
             T("Yes. Create departures with seat limits, and bookings reduce availability automatically.", "হ্যাঁ। সিট লিমিটসহ ডিপারচার তৈরি করুন, বুকিংয়ের সাথে সাথে খালি সিট অটোমেটিক কমে।")),
            (T("Can AI help write itineraries?", "AI কি ভ্রমণসূচি লিখতে সাহায্য করে?"),
             T("Yes. The AI trip planner drafts an itinerary that your team can edit before publishing.", "হ্যাঁ। AI ট্রিপ প্ল্যানার খসড়া তৈরি করে, প্রকাশের আগে আপনার টিম তা সম্পাদনা করে।")),
        ]),
    "transport": dict(
        keywords="transport booking software, airport transfer software, fleet and driver management, car rental booking system",
        overview=[
            T("Manage airport transfers, intercity transport and rentals with your own fleet or hired vehicles. Pricing by zone or route, driver assignment and trip sheets keep operations smooth.",
              "নিজের গাড়ি বা ভাড়া করা গাড়ি দিয়ে এয়ারপোর্ট ট্রান্সফার, আন্তঃনগর ট্রান্সপোর্ট ও ভাড়া পরিচালনা করুন। জোন বা রুটভিত্তিক মূল্য, ড্রাইভার নির্ধারণ ও ট্রিপ শিট কাজ সহজ রাখে।"),
            T("Transport can be sold alone or added to any flight, hotel, tour or Hajj package, and vendor bills for hired vehicles are matched to actual trips.",
              "ট্রান্সপোর্ট আলাদাভাবে বা যেকোনো ফ্লাইট, হোটেল, ট্যুর বা হজ প্যাকেজের সাথে বিক্রি করা যায়, আর ভাড়া করা গাড়ির বিল আসল ট্রিপের সাথে মিলিয়ে দেখা হয়।"),
        ],
        faqs=[
            (T("Can drivers see their trips?", "ড্রাইভাররা কি তাদের ট্রিপ দেখতে পান?"),
             T("Yes. Trip sheets with pick-up times and passenger details can be sent by SMS or WhatsApp.", "হ্যাঁ। পিক-আপের সময় ও যাত্রীর তথ্যসহ ট্রিপ শিট SMS বা WhatsApp-এ পাঠানো যায়।")),
            (T("Can I price by route or zone?", "রুট বা জোন অনুযায়ী কি মূল্য ঠিক করা যায়?"),
             T("Yes. Set prices per route, zone or vehicle type, with separate prices for agents.", "হ্যাঁ। রুট, জোন বা গাড়ির ধরন অনুযায়ী মূল্য ঠিক করুন, এজেন্টদের জন্য আলাদা মূল্যসহ।")),
            (T("Does it track hired vehicles?", "ভাড়া করা গাড়ি কি ট্র্যাক করা যায়?"),
             T("Yes. Hired vehicles are linked to vendors, and their bills post as payables.", "হ্যাঁ। ভাড়া করা গাড়ি ভেন্ডরের সাথে যুক্ত থাকে, আর তাদের বিল দেনা হিসেবে পোস্ট হয়।")),
        ]),
    "crm": dict(
        keywords="travel CRM, CRM for travel agencies, travel lead management, customer management software for travel",
        overview=[
            T("A travel CRM built into your booking system. Every customer profile holds passports, travel history, bookings, payments and conversations, so any staff member can help any customer.",
              "বুকিং সিস্টেমের ভেতরেই ট্রাভেল CRM। প্রতিটি কাস্টমার প্রোফাইলে পাসপোর্ট, ভ্রমণ ইতিহাস, বুকিং, পেমেন্ট ও কথোপকথন থাকে, তাই যেকোনো স্টাফ যেকোনো কাস্টমারকে সাহায্য করতে পারেন।"),
            T("Leads from your website, WhatsApp, Facebook and walk-ins enter one pipeline, with reminders that make sure every inquiry is followed up.",
              "ওয়েবসাইট, WhatsApp, Facebook ও সরাসরি আসা লিড একই পাইপলাইনে আসে, আর রিমাইন্ডার নিশ্চিত করে প্রতিটি ইনকোয়ারির ফলো-আপ হয়।"),
        ],
        faqs=[
            (T("Where do leads come from?", "লিড কোথা থেকে আসে?"),
             T("Website forms, WhatsApp, Messenger, Instagram, phone and walk-in customers can all be captured as leads.", "ওয়েবসাইট ফর্ম, WhatsApp, Messenger, Instagram, ফোন ও সরাসরি আসা কাস্টমার — সব থেকে লিড সংগ্রহ করা যায়।")),
            (T("Can I send offers to customer groups?", "কাস্টমার গ্রুপে কি অফার পাঠানো যায়?"),
             T("Yes. Segment customers by destination, spend or travel history and send targeted offers.", "হ্যাঁ। গন্তব্য, খরচ বা ভ্রমণ ইতিহাস অনুযায়ী কাস্টমার ভাগ করে নির্দিষ্ট অফার পাঠান।")),
            (T("Is the CRM separate from bookings?", "CRM কি বুকিং থেকে আলাদা?"),
             T("No. It is the same database, so a lead converts into a booking without retyping anything.", "না। একই ডেটাবেস, তাই কিছু আবার না লিখেই লিড বুকিংয়ে রূপান্তরিত হয়।")),
        ]),
    "sales": dict(
        keywords="travel sales management, travel quotation software, sales target tracking, travel agency sales software",
        overview=[
            T("Create professional quotations with multiple options, follow them to confirmation and convert to a booking in one click. Sales managers see targets, conversion and discounts for every person and branch.",
              "একাধিক অপশনসহ পেশাদার কোটেশন তৈরি করুন, কনফার্মেশন পর্যন্ত ফলো করুন এবং এক ক্লিকে বুকিংয়ে রূপ দিন। সেলস ম্যানেজার প্রতিটি ব্যক্তি ও শাখার টার্গেট, কনভার্সন ও ডিসকাউন্ট দেখেন।"),
            T("Discount approval rules protect margins, and commissions for sales staff are calculated from confirmed bookings.",
              "ডিসকাউন্ট অনুমোদনের নিয়ম মুনাফা রক্ষা করে, আর কনফার্মড বুকিং থেকে সেলস স্টাফের কমিশন হিসাব হয়।"),
        ],
        faqs=[
            (T("Can a quotation include several options?", "একটি কোটেশনে কি একাধিক অপশন রাখা যায়?"),
             T("Yes. Offer different hotels, airlines or packages in one quotation and let the customer choose.", "হ্যাঁ। এক কোটেশনে ভিন্ন হোটেল, এয়ারলাইন বা প্যাকেজ দিন, কাস্টমার বেছে নেবেন।")),
            (T("How are sales targets tracked?", "সেলস টার্গেট কীভাবে ট্র্যাক হয়?"),
             T("Targets are set per staff member and branch, and progress updates as bookings are confirmed.", "প্রতি স্টাফ ও শাখার টার্গেট ঠিক করা হয়, আর বুকিং কনফার্ম হলে অগ্রগতি আপডেট হয়।")),
            (T("Can I limit discounts?", "ডিসকাউন্ট কি সীমিত করা যায়?"),
             T("Yes. Discounts above a set level need a manager's approval.", "হ্যাঁ। নির্দিষ্ট সীমার বেশি ডিসকাউন্টে ম্যানেজারের অনুমোদন লাগে।")),
        ]),
    "finance": dict(
        keywords="travel accounting software, travel agency accounting, double-entry accounting for travel, BSP reconciliation",
        overview=[
            T("Travel agency accounting software with full double-entry bookkeeping. Every booking, payment, refund and supplier bill posts automatically to the right ledgers, so your books are always current.",
              "পূর্ণ ডাবল-এন্ট্রি হিসাবসহ ট্রাভেল এজেন্সি অ্যাকাউন্টিং সফটওয়্যার। প্রতিটি বুকিং, পেমেন্ট, রিফান্ড ও সাপ্লায়ার বিল অটোমেটিক সঠিক লেজারে পোস্ট হয়, তাই হিসাব সবসময় হালনাগাদ।"),
            T("Customer, agent and supplier balances, bank and wallet accounts, multi-currency gains and losses and branch P&L are available at any time, ready for your auditor.",
              "কাস্টমার, এজেন্ট ও সাপ্লায়ার ব্যালান্স, ব্যাংক ও ওয়ালেট অ্যাকাউন্ট, বহু মুদ্রার লাভ-ক্ষতি এবং শাখার লাভ-ক্ষতি যেকোনো সময় দেখা যায়, অডিটরের জন্য প্রস্তুত।"),
        ],
        faqs=[
            (T("Do I still need separate accounting software?", "আলাদা অ্যাকাউন্টিং সফটওয়্যার কি এখনও লাগবে?"),
             T("No. TravelSuite ERP includes the ledger, balance sheet and P&L. You can still export to QuickBooks or Xero if your accountant prefers.", "না। TravelSuite ERP-এ লেজার, ব্যালান্স শিট ও লাভ-ক্ষতি আছে। চাইলে QuickBooks বা Xero-তে এক্সপোর্টও করা যায়।")),
            (T("Does it support multiple currencies?", "বহু মুদ্রা কি সাপোর্ট করে?"),
             T("Yes. Sell and buy in USD, SAR, AED, MYR, BDT and more, with exchange gains and losses recorded.", "হ্যাঁ। USD, SAR, AED, MYR, BDT-সহ আরও মুদ্রায় কেনাবেচা করুন, বিনিময় লাভ-ক্ষতি রেকর্ড হয়।")),
            (T("Can I see profit per booking?", "প্রতি বুকিংয়ের মুনাফা কি দেখা যায়?"),
             T("Yes. Cost, selling price, fees and margin are stored on every booking.", "হ্যাঁ। প্রতিটি বুকিংয়ে খরচ, বিক্রয়মূল্য, ফি ও মুনাফা সংরক্ষিত থাকে।")),
        ]),
    "hr": dict(
        keywords="HR software for travel agencies, payroll software, staff attendance system, HRM for travel business",
        overview=[
            T("HR and payroll inside the same system your team works in. Employee records, attendance, leave, payroll and permissions are managed together with branches and departments.",
              "আপনার টিম যে সিস্টেমে কাজ করে, তার ভেতরেই HR ও বেতন। কর্মীর তথ্য, হাজিরা, ছুটি, বেতন ও পারমিশন শাখা ও বিভাগের সাথে একসাথে পরিচালিত হয়।"),
            T("Incentives can be calculated from real sales, and role-based access keeps sensitive financial data visible only to the right people.",
              "আসল বিক্রি থেকে ইনসেনটিভ হিসাব করা যায়, আর রোলভিত্তিক অ্যাক্সেস সংবেদনশীল আর্থিক তথ্য শুধু সঠিক ব্যক্তিদের দেখায়।"),
        ],
        faqs=[
            (T("Can staff have different access levels?", "স্টাফদের কি ভিন্ন অ্যাক্সেস দেওয়া যায়?"),
             T("Yes. Create roles such as counter, accounts or manager and control what each can see and do.", "হ্যাঁ। কাউন্টার, অ্যাকাউন্টস বা ম্যানেজারের মতো রোল তৈরি করে কে কী দেখবে ও করবে নিয়ন্ত্রণ করুন।")),
            (T("Does payroll post to accounts?", "বেতন কি হিসাবে পোস্ট হয়?"),
             T("Yes. Salaries, allowances and deductions post to the ledger when payroll is approved.", "হ্যাঁ। বেতন অনুমোদনের পর বেতন, ভাতা ও কর্তন লেজারে পোস্ট হয়।")),
            (T("Can I manage multiple branches?", "একাধিক শাখা কি পরিচালনা করা যায়?"),
             T("Yes. Staff, attendance and costs are tracked per branch and department.", "হ্যাঁ। শাখা ও বিভাগ অনুযায়ী স্টাফ, হাজিরা ও খরচ ট্র্যাক হয়।")),
        ]),
    "helpdesk": dict(
        keywords="travel help desk software, customer support ticketing, travel agency support system",
        overview=[
            T("A help desk designed for travel: every complaint, change request or question becomes a ticket linked to the customer and the booking, with priority and response targets.",
              "ট্রাভেলের জন্য তৈরি হেল্প ডেস্ক: প্রতিটি অভিযোগ, পরিবর্তনের অনুরোধ বা প্রশ্ন কাস্টমার ও বুকিংয়ের সাথে যুক্ত টিকিট হয়, অগ্রাধিকার ও উত্তরের লক্ষ্যসহ।"),
            T("Tickets can be opened from email, WhatsApp, the website or by staff, and the full history stays with the customer for next time.",
              "ইমেইল, WhatsApp, ওয়েবসাইট বা স্টাফ — যেকোনো জায়গা থেকে টিকিট খোলা যায়, আর পরের বারের জন্য পূর্ণ ইতিহাস কাস্টমারের সাথে থাকে।"),
        ],
        faqs=[
            (T("Can tickets be created from WhatsApp?", "WhatsApp থেকে কি টিকিট তৈরি করা যায়?"),
             T("Yes. Turn any conversation in the omnichannel inbox into a support ticket.", "হ্যাঁ। অমনিচ্যানেল ইনবক্সের যেকোনো কথোপকথনকে সাপোর্ট টিকিটে রূপ দিন।")),
            (T("Can I measure support quality?", "সাপোর্টের মান কি মাপা যায়?"),
             T("Yes. Track response and resolution times and collect customer feedback after each ticket.", "হ্যাঁ। উত্তর ও সমাধানের সময় ট্র্যাক করুন এবং প্রতিটি টিকিটের পরে কাস্টমারের মতামত নিন।")),
            (T("Are tickets linked to bookings?", "টিকিট কি বুকিংয়ের সাথে যুক্ত?"),
             T("Yes. Staff see the related booking, payments and documents inside the ticket.", "হ্যাঁ। টিকিটের ভেতরেই স্টাফ সংশ্লিষ্ট বুকিং, পেমেন্ট ও ডকুমেন্ট দেখেন।")),
        ]),
    "expenses": dict(
        keywords="expense management software, travel agency expense tracking, trip expense management",
        overview=[
            T("Track office and trip expenses with categories, budgets, receipts and approvals. Approved expenses post to accounts automatically, so you always know the true cost of running each branch and trip.",
              "খাত, বাজেট, রসিদ ও অনুমোদনসহ অফিস ও ট্রিপের খরচ ট্র্যাক করুন। অনুমোদিত খরচ অটোমেটিক হিসাবে পোস্ট হয়, তাই প্রতিটি শাখা ও ট্রিপের আসল খরচ সবসময় জানা থাকে।"),
            T("Group tours and Hajj seasons often involve many small cash expenses; recording them against the trip shows the real profit of every package.",
              "গ্রুপ ট্যুর ও হজ মৌসুমে অনেক ছোট নগদ খরচ হয়; সেগুলো ট্রিপের সাথে রেকর্ড করলে প্রতিটি প্যাকেজের আসল মুনাফা দেখা যায়।"),
        ],
        faqs=[
            (T("Can staff submit expenses from their phone?", "স্টাফ কি ফোন থেকে খরচ জমা দিতে পারবেন?"),
             T("Yes. Take a photo of the receipt and submit it for approval.", "হ্যাঁ। রসিদের ছবি তুলে অনুমোদনের জন্য জমা দিন।")),
            (T("Can I set budgets?", "বাজেট কি ঠিক করা যায়?"),
             T("Yes. Set budgets per category or branch and see spending against them.", "হ্যাঁ। খাত বা শাখা অনুযায়ী বাজেট ঠিক করে তার বিপরীতে খরচ দেখুন।")),
            (T("Are expenses linked to trips?", "খরচ কি ট্রিপের সাথে যুক্ত?"),
             T("Yes. Expenses can be assigned to a tour, group or Hajj package.", "হ্যাঁ। খরচ ট্যুর, গ্রুপ বা হজ প্যাকেজে বরাদ্দ করা যায়।")),
        ]),
    "invoices": dict(
        keywords="travel invoicing software, travel agency billing, online payment links, invoice and receipt software",
        overview=[
            T("Branded invoices and money receipts are created with every booking. Accept full, partial or instalment payments by card, PayPal, Stripe, Apple Pay, bank transfer or local wallets.",
              "প্রতিটি বুকিংয়ের সাথে ব্র্যান্ডেড ইনভয়েস ও মানি রিসিট তৈরি হয়। কার্ড, PayPal, Stripe, Apple Pay, ব্যাংক ট্রান্সফার বা স্থানীয় ওয়ালেটে পূর্ণ, আংশিক বা কিস্তিতে পেমেন্ট নিন।"),
            T("Payment links can be sent on WhatsApp or email, and overdue reminders follow up automatically until the balance is settled.",
              "পেমেন্ট লিংক WhatsApp বা ইমেইলে পাঠানো যায়, আর বকেয়া পরিশোধ না হওয়া পর্যন্ত রিমাইন্ডার অটোমেটিক ফলো-আপ করে।"),
        ],
        faqs=[
            (T("Which payment methods can customers use?", "কাস্টমাররা কোন পেমেন্ট মাধ্যম ব্যবহার করতে পারবেন?"),
             T("Visa, Mastercard, American Express, PayPal, Stripe, Apple Pay and Google Pay, plus bank transfer and regional wallets.", "Visa, Mastercard, American Express, PayPal, Stripe, Apple Pay ও Google Pay, সাথে ব্যাংক ট্রান্সফার ও আঞ্চলিক ওয়ালেট।")),
            (T("Can I issue invoices in different currencies?", "ভিন্ন মুদ্রায় কি ইনভয়েস দেওয়া যায়?"),
             T("Yes. Invoice in the customer's currency while your books stay in your base currency.", "হ্যাঁ। কাস্টমারের মুদ্রায় ইনভয়েস দিন, আর আপনার হিসাব থাকবে মূল মুদ্রায়।")),
            (T("How are refunds handled?", "রিফান্ড কীভাবে হয়?"),
             T("Refunds and credit notes are linked to the original invoice and post to accounts automatically.", "রিফান্ড ও ক্রেডিট নোট মূল ইনভয়েসের সাথে যুক্ত থাকে এবং অটোমেটিক হিসাবে পোস্ট হয়।")),
        ]),
    "reports": dict(
        keywords="travel agency reports, travel business analytics, sales and profit reports, receivables aging",
        overview=[
            T("Ready-made reports show sales, profit, receivables, payables and cash flow across services, branches, staff and agents. Filter by any date range and export to Excel or PDF.",
              "তৈরি রিপোর্টে সার্ভিস, শাখা, স্টাফ ও এজেন্ট অনুযায়ী সেলস, মুনাফা, প্রাপ্য, দেনা ও ক্যাশ ফ্লো দেখা যায়। যেকোনো সময়সীমা দিয়ে ফিল্টার করে Excel বা PDF-এ এক্সপোর্ট করুন।"),
            T("Owners use these reports to spot unprofitable services, follow up on aging dues and compare branch performance without waiting for month-end.",
              "মালিকরা এই রিপোর্ট দিয়ে লোকসানি সার্ভিস খুঁজে বের করেন, পুরনো বকেয়া ফলো-আপ করেন এবং মাস শেষের অপেক্ষা ছাড়াই শাখার পারফরম্যান্স তুলনা করেন।"),
        ],
        faqs=[
            (T("Are reports real time?", "রিপোর্ট কি রিয়েল টাইম?"),
             T("Yes. Reports read live data, so they reflect bookings and payments as they happen.", "হ্যাঁ। রিপোর্ট লাইভ ডেটা থেকে তৈরি হয়, তাই বুকিং ও পেমেন্টের সাথে সাথে আপডেট হয়।")),
            (T("Can I export reports?", "রিপোর্ট কি এক্সপোর্ট করা যায়?"),
             T("Yes. Every report exports to Excel and PDF.", "হ্যাঁ। প্রতিটি রিপোর্ট Excel ও PDF-এ এক্সপোর্ট করা যায়।")),
            (T("Can branch managers see only their branch?", "শাখা ম্যানেজার কি শুধু নিজের শাখা দেখবেন?"),
             T("Yes. Permissions limit reports to the branches a user manages.", "হ্যাঁ। পারমিশন দিয়ে রিপোর্ট শুধু ব্যবহারকারীর শাখায় সীমিত রাখা যায়।")),
        ]),
    "tasks": dict(
        keywords="travel workflow automation, task management for travel agencies, operations checklist software",
        overview=[
            T("Assign tasks linked to bookings and customers, set deadlines and let routine work create itself: a new visa file can create its checklist, and a confirmed booking can assign ticketing to the right person.",
              "বুকিং ও কাস্টমারের সাথে যুক্ত টাস্ক দিন, ডেডলাইন ঠিক করুন, আর নিয়মিত কাজ নিজে তৈরি হতে দিন: নতুন ভিসা ফাইল নিজের চেকলিস্ট তৈরি করে, কনফার্মড বুকিং সঠিক ব্যক্তিকে টিকিটিংয়ের দায়িত্ব দেয়।"),
            T("Team boards and reminders make ownership clear, so files do not stall when staff are busy or away.",
              "টিম বোর্ড ও রিমাইন্ডার দায়িত্ব স্পষ্ট রাখে, তাই স্টাফ ব্যস্ত বা অনুপস্থিত থাকলেও ফাইল আটকে থাকে না।"),
        ],
        faqs=[
            (T("Can tasks be created automatically?", "টাস্ক কি অটোমেটিক তৈরি হয়?"),
             T("Yes. Rules create tasks on events such as a new booking, a payment or a visa stage change.", "হ্যাঁ। নতুন বুকিং, পেমেন্ট বা ভিসার ধাপ বদলের মতো ঘটনায় নিয়ম অনুযায়ী টাস্ক তৈরি হয়।")),
            (T("Can I use checklists?", "চেকলিস্ট কি ব্যবহার করা যায়?"),
             T("Yes. Use standard checklists for visa, Hajj and group files.", "হ্যাঁ। ভিসা, হজ ও গ্রুপ ফাইলের জন্য নির্দিষ্ট চেকলিস্ট ব্যবহার করুন।")),
            (T("Will staff get reminders?", "স্টাফ কি রিমাইন্ডার পাবেন?"),
             T("Yes. Reminders arrive before deadlines by notification and email.", "হ্যাঁ। ডেডলাইনের আগে নোটিফিকেশন ও ইমেইলে রিমাইন্ডার আসে।")),
        ]),
    "b2b": dict(
        keywords="B2B travel portal, B2C booking engine, travel agent portal, white-label travel booking",
        overview=[
            T("Run a B2C booking website and a B2B agent portal from one inventory. Travellers book and pay online, while registered agents get net fares, credit limits, deposit wallets and their own markup.",
              "একই ইনভেন্টরি থেকে B2C বুকিং ওয়েবসাইট ও B2B এজেন্ট পোর্টাল চালান। যাত্রীরা অনলাইনে বুক ও পেমেন্ট করেন, আর নিবন্ধিত এজেন্টরা পান নেট ভাড়া, ক্রেডিট লিমিট, ডিপোজিট ওয়ালেট ও নিজস্ব মার্কআপ।"),
            T("Sub-agent hierarchies, white-label agent sites and automatic statements let consolidators in Bangladesh, Malaysia and the Gulf grow their networks without growing the back office.",
              "সাব-এজেন্ট কাঠামো, হোয়াইট-লেবেল এজেন্ট সাইট ও অটোমেটিক স্টেটমেন্টের কারণে বাংলাদেশ, মালয়েশিয়া ও উপসাগরীয় অঞ্চলের কনসোলিডেটররা ব্যাক অফিস না বাড়িয়েই নেটওয়ার্ক বাড়াতে পারেন।"),
        ],
        faqs=[
            (T("Can agents have their own branded website?", "এজেন্টরা কি নিজের ব্র্যান্ডের ওয়েবসাইট পাবেন?"),
             T("Yes. Agents can get white-label sites that sell your inventory with their own markup.", "হ্যাঁ। এজেন্টরা হোয়াইট-লেবেল সাইট পান, যা তাদের মার্কআপে আপনার ইনভেন্টরি বিক্রি করে।")),
            (T("How do agent deposits work?", "এজেন্ট ডিপোজিট কীভাবে কাজ করে?"),
             T("Agents top up their wallet by card, bank or local wallet, and bookings deduct from the balance instantly.", "এজেন্টরা কার্ড, ব্যাংক বা স্থানীয় ওয়ালেটে টাকা যোগ করেন, আর বুকিংয়ের সাথে সাথে ব্যালান্স থেকে কাটা হয়।")),
            (T("Can customers pay online on the B2C site?", "B2C সাইটে কি কাস্টমার অনলাইনে পেমেন্ট করতে পারবেন?"),
             T("Yes. Accept cards, PayPal, Stripe, Apple Pay and Google Pay at checkout.", "হ্যাঁ। চেকআউটে কার্ড, PayPal, Stripe, Apple Pay ও Google Pay নিন।")),
        ]),
    "website": dict(
        keywords="travel agency website, travel website builder, SEO travel website, booking website for travel agency",
        overview=[
            T("A fast, SEO-friendly travel agency website on your own domain, connected directly to your ERP. Showcase packages, take bookings and inquiries, and send every lead straight to your CRM.",
              "নিজের ডোমেইনে দ্রুত, SEO-বান্ধব ট্রাভেল এজেন্সি ওয়েবসাইট, সরাসরি ERP-এর সাথে যুক্ত। প্যাকেজ প্রদর্শন করুন, বুকিং ও ইনকোয়ারি নিন এবং প্রতিটি লিড সরাসরি CRM-এ পাঠান।"),
            T("The built-in CMS lets your team publish offers, landing pages and blog posts in several languages, with meta tags and clean URLs that help you rank on Google.",
              "বিল্ট-ইন CMS দিয়ে আপনার টিম একাধিক ভাষায় অফার, ল্যান্ডিং পেজ ও ব্লগ পোস্ট প্রকাশ করতে পারে, মেটা ট্যাগ ও পরিষ্কার URL-সহ, যা Google-এ র‍্যাঙ্ক করতে সাহায্য করে।"),
        ],
        faqs=[
            (T("Can I use my own domain?", "নিজের ডোমেইন কি ব্যবহার করা যাবে?"),
             T("Yes. The website runs on your domain with a free SSL certificate.", "হ্যাঁ। ফ্রি SSL সার্টিফিকেটসহ ওয়েবসাইট আপনার ডোমেইনে চলে।")),
            (T("Is the website SEO-friendly?", "ওয়েবসাইট কি SEO-বান্ধব?"),
             T("Yes. Pages load fast, work on mobile and include editable titles, descriptions and structured data.", "হ্যাঁ। পেজ দ্রুত লোড হয়, মোবাইলে চলে এবং সম্পাদনযোগ্য টাইটেল, বিবরণ ও স্ট্রাকচার্ড ডেটা থাকে।")),
            (T("Can the website be multilingual?", "ওয়েবসাইট কি বহুভাষিক হতে পারে?"),
             T("Yes. Publish content in English, Arabic, Bangla, Malay and other languages.", "হ্যাঁ। ইংরেজি, আরবি, বাংলা, মালয়সহ অন্যান্য ভাষায় কনটেন্ট প্রকাশ করুন।")),
        ]),
    "ai": dict(
        keywords="AI for travel agencies, AI trip planner, travel chatbot, AI lead qualification",
        overview=[
            T("AI agents answer common customer questions, draft itineraries, qualify leads by budget and dates and follow up automatically, across your website and messaging channels.",
              "AI এজেন্ট ওয়েবসাইট ও মেসেজিং চ্যানেলজুড়ে কাস্টমারের সাধারণ প্রশ্নের উত্তর দেয়, ভ্রমণসূচির খসড়া করে, বাজেট ও তারিখ দিয়ে লিড যাচাই করে এবং অটোমেটিক ফলো-আপ করে।"),
            T("Your consultants stay in control: AI prepares the first draft and hands warm leads to the team, so people spend their time on customers who are ready to book.",
              "নিয়ন্ত্রণ থাকে আপনার কনসালট্যান্টদের হাতে: AI প্রথম খসড়া প্রস্তুত করে আগ্রহী লিড টিমের কাছে দেয়, তাই মানুষ বুক করতে প্রস্তুত কাস্টমারদের দিকে মন দেন।"),
        ],
        faqs=[
            (T("Will AI reply to customers on WhatsApp?", "AI কি WhatsApp-এ কাস্টমারকে উত্তর দেবে?"),
             T("Yes, if you enable it. You choose which questions AI answers and when a person takes over.", "হ্যাঁ, আপনি চালু করলে। AI কোন প্রশ্নের উত্তর দেবে এবং কখন মানুষ দায়িত্ব নেবে তা আপনি ঠিক করেন।")),
            (T("Does AI know my packages and prices?", "AI কি আমার প্যাকেজ ও মূল্য জানে?"),
             T("Yes. It uses the products and content in your TravelSuite ERP account.", "হ্যাঁ। এটি আপনার TravelSuite ERP অ্যাকাউন্টের প্রোডাক্ট ও কনটেন্ট ব্যবহার করে।")),
            (T("Can AI work in several languages?", "AI কি একাধিক ভাষায় কাজ করে?"),
             T("Yes. It can reply in English, Arabic, Bangla, Malay and more.", "হ্যাঁ। ইংরেজি, আরবি, বাংলা, মালয়সহ আরও ভাষায় উত্তর দিতে পারে।")),
        ]),
    "omnichannel": dict(
        keywords="WhatsApp for travel agencies, omnichannel inbox, WhatsApp Business API travel, shared inbox",
        overview=[
            T("Bring WhatsApp, Messenger and Instagram conversations into one shared inbox. Assign chats to team members, use saved replies and see every message in the customer's history.",
              "WhatsApp, Messenger ও Instagram-এর কথোপকথন একটি শেয়ার্ড ইনবক্সে আনুন। টিম মেম্বারদের চ্যাট দিন, সংরক্ষিত রিপ্লাই ব্যবহার করুন এবং কাস্টমারের ইতিহাসে প্রতিটি মেসেজ দেখুন।"),
            T("Any chat can become a CRM lead or support ticket in one click, so conversations turn into bookings instead of getting lost in personal phones.",
              "যেকোনো চ্যাট এক ক্লিকে CRM লিড বা সাপোর্ট টিকিট হতে পারে, তাই ব্যক্তিগত ফোনে হারিয়ে না গিয়ে কথোপকথন বুকিংয়ে পরিণত হয়।"),
        ],
        faqs=[
            (T("Do I need the WhatsApp Business API?", "WhatsApp Business API কি লাগবে?"),
             T("Yes. We help you set up the official WhatsApp Business Platform for your number.", "হ্যাঁ। আপনার নম্বরের জন্য অফিসিয়াল WhatsApp Business Platform সেটআপে আমরা সাহায্য করি।")),
            (T("Can several staff use one number?", "একাধিক স্টাফ কি একটি নম্বর ব্যবহার করতে পারবেন?"),
             T("Yes. The whole team works from one shared inbox with assignments.", "হ্যাঁ। পুরো টিম দায়িত্ব ভাগ করে একটি শেয়ার্ড ইনবক্স থেকে কাজ করে।")),
            (T("Are conversations saved?", "কথোপকথন কি সংরক্ষিত থাকে?"),
             T("Yes. Every conversation is stored on the customer's profile.", "হ্যাঁ। প্রতিটি কথোপকথন কাস্টমারের প্রোফাইলে সংরক্ষিত থাকে।")),
        ]),
}

SOLUTION_SEO = {
    "travel-agencies": dict(
        keywords="travel agency software, travel agency management system, travel ERP for agencies",
        overview=[
            T("TravelSuite ERP is travel agency software that combines ticketing, hotels, visas, tours, CRM and accounting. Your team serves walk-in, phone and online customers from one system, and the accounts update as they work.",
              "TravelSuite ERP এমন ট্রাভেল এজেন্সি সফটওয়্যার, যা টিকিটিং, হোটেল, ভিসা, ট্যুর, CRM ও অ্যাকাউন্টিং একসাথে আনে। আপনার টিম সরাসরি, ফোনে ও অনলাইনে আসা কাস্টমারদের এক সিস্টেম থেকে সেবা দেয়, আর কাজের সাথে সাথে হিসাব আপডেট হয়।"),
            T("Agencies across Bangladesh, Malaysia and the GCC use it to replace separate booking tools, spreadsheets and accounting software with one platform.",
              "বাংলাদেশ, মালয়েশিয়া ও GCC-র এজেন্সিগুলো আলাদা বুকিং টুল, স্প্রেডশিট ও অ্যাকাউন্টিং সফটওয়্যারের বদলে একটি প্ল্যাটফর্ম হিসেবে এটি ব্যবহার করে।"),
        ],
        faqs=[
            (T("Is TravelSuite ERP suitable for small agencies?", "ছোট এজেন্সির জন্য কি TravelSuite ERP উপযুক্ত?"),
             T("Yes. Start with the Starter plan and the services you sell, then add modules as you grow.", "হ্যাঁ। স্টার্টার প্ল্যান ও আপনার সার্ভিস দিয়ে শুরু করুন, ব্যবসা বাড়লে মডিউল যোগ করুন।")),
            (T("Can we keep our existing customer data?", "আমাদের বর্তমান কাস্টমার ডেটা কি রাখা যাবে?"),
             T("Yes. We import customers, agents and opening balances from Excel during setup.", "হ্যাঁ। সেটআপের সময় Excel থেকে কাস্টমার, এজেন্ট ও শুরুর ব্যালান্স ইমপোর্ট করি।")),
            (T("How long does setup take?", "সেটআপে কত সময় লাগে?"),
             T("Most agencies go live in 7 to 14 days.", "বেশিরভাগ এজেন্সি ৭ থেকে ১৪ দিনে চালু হয়।")),
        ]),
    "hajj-umrah": dict(
        keywords="Hajj software, Umrah management system, Hajj agency software Bangladesh, Umrah software Malaysia",
        overview=[
            T("Purpose-built Hajj and Umrah software for agencies in Bangladesh, Malaysia, Saudi Arabia and the wider GCC. Register pilgrims, build packages with Makkah and Madinah hotels, allocate groups and rooms, and collect instalments on time.",
              "বাংলাদেশ, মালয়েশিয়া, সৌদি আরব ও GCC-র এজেন্সির জন্য বিশেষভাবে তৈরি হজ ও উমরাহ সফটওয়্যার। হাজি রেজিস্ট্রেশন করুন, মক্কা ও মদিনার হোটেলসহ প্যাকেজ তৈরি করুন, গ্রুপ ও রুম বণ্টন করুন এবং সময়মতো কিস্তি আদায় করুন।"),
            T("Because packages, visas and payments share one database, managers see every pilgrim's status and the season's profit at a glance.",
              "প্যাকেজ, ভিসা ও পেমেন্ট একই ডেটাবেসে থাকায় ম্যানেজার এক নজরে প্রতিটি হাজির স্ট্যাটাস ও মৌসুমের মুনাফা দেখেন।"),
        ],
        faqs=[
            (T("Can we manage several Umrah groups at once?", "একসাথে কি কয়েকটি উমরাহ গ্রুপ পরিচালনা করা যায়?"),
             T("Yes. Each group has its own departure, hotels, transport and pilgrim list.", "হ্যাঁ। প্রতিটি গ্রুপের নিজস্ব যাত্রা, হোটেল, ট্রান্সপোর্ট ও হাজির তালিকা থাকে।")),
            (T("Does it send payment reminders to pilgrims?", "হাজিদের কি পেমেন্ট রিমাইন্ডার পাঠায়?"),
             T("Yes. Reminders go out by SMS and WhatsApp before each instalment is due.", "হ্যাঁ। প্রতিটি কিস্তির আগে SMS ও WhatsApp-এ রিমাইন্ডার যায়।")),
            (T("Can agents sell our Umrah packages?", "এজেন্টরা কি আমাদের উমরাহ প্যাকেজ বিক্রি করতে পারবেন?"),
             T("Yes. Publish packages on the B2B portal with agent commission.", "হ্যাঁ। এজেন্ট কমিশনসহ B2B পোর্টালে প্যাকেজ প্রকাশ করুন।")),
        ]),
    "b2b-consolidators": dict(
        keywords="B2B travel portal, travel consolidator software, sub-agent management, agent credit limit software",
        overview=[
            T("Consolidator software with a self-service B2B portal. Sub-agents search, book and issue on their own, while you control fares, markups, credit limits and deposits.",
              "নিজে বুক করার B2B পোর্টালসহ কনসোলিডেটর সফটওয়্যার। সাব-এজেন্টরা নিজেরাই খোঁজেন, বুক ও ইস্যু করেন, আর ভাড়া, মার্কআপ, ক্রেডিট লিমিট ও ডিপোজিট আপনার নিয়ন্ত্রণে থাকে।"),
            T("Agent ledgers update with every ticket, and aging reports show who owes what, protecting your cash flow as the network grows.",
              "প্রতিটি টিকিটের সাথে এজেন্ট লেজার আপডেট হয়, আর এজিং রিপোর্ট দেখায় কার কাছে কত পাওনা, ফলে নেটওয়ার্ক বাড়লেও ক্যাশ ফ্লো সুরক্ষিত থাকে।"),
        ],
        faqs=[
            (T("Can I set different markups for each agent?", "প্রতিটি এজেন্টের জন্য কি আলাদা মার্কআপ রাখা যায়?"),
             T("Yes. Set markups by agent, agent group, airline or route.", "হ্যাঁ। এজেন্ট, এজেন্ট গ্রুপ, এয়ারলাইন বা রুট অনুযায়ী মার্কআপ ঠিক করুন।")),
            (T("What happens when an agent reaches the credit limit?", "এজেন্ট ক্রেডিট লিমিটে পৌঁছালে কী হয়?"),
             T("New bookings are blocked until they pay or top up their wallet.", "পরিশোধ বা ওয়ালেটে টাকা যোগ না করা পর্যন্ত নতুন বুকিং বন্ধ থাকে।")),
            (T("Can agents download their statements?", "এজেন্টরা কি স্টেটমেন্ট ডাউনলোড করতে পারবেন?"),
             T("Yes. Statements are available in the portal at any time.", "হ্যাঁ। পোর্টালে যেকোনো সময় স্টেটমেন্ট পাওয়া যায়।")),
        ]),
    "tour-operators": dict(
        keywords="tour operator software, DMC software, tour package booking system, itinerary software",
        overview=[
            T("Tour operator and DMC software for designing packages, managing departures and suppliers, and selling through your website, agents and WhatsApp.",
              "প্যাকেজ তৈরি, ডিপারচার ও সাপ্লায়ার ব্যবস্থাপনা এবং ওয়েবসাইট, এজেন্ট ও WhatsApp-এ বিক্রির জন্য ট্যুর অপারেটর ও DMC সফটওয়্যার।"),
            T("Costing, seat inventory and expenses are tracked per departure, so you know each package's real profit before and after the trip.",
              "প্রতিটি ডিপারচারের খরচ, সিট ইনভেন্টরি ও ব্যয় ট্র্যাক হয়, তাই ট্রিপের আগে ও পরে প্রতিটি প্যাকেজের আসল মুনাফা জানা যায়।"),
        ],
        faqs=[
            (T("Can I publish packages on my website?", "ওয়েবসাইটে কি প্যাকেজ প্রকাশ করা যায়?"),
             T("Yes. Packages appear on your site with photos, itinerary and online booking.", "হ্যাঁ। ছবি, ভ্রমণসূচি ও অনলাইন বুকিংসহ আপনার সাইটে প্যাকেজ দেখা যায়।")),
            (T("Can I manage local suppliers?", "স্থানীয় সাপ্লায়ার কি পরিচালনা করা যায়?"),
             T("Yes. Hotels, transport and guides are managed as suppliers with payables.", "হ্যাঁ। হোটেল, ট্রান্সপোর্ট ও গাইড দেনাসহ সাপ্লায়ার হিসেবে পরিচালিত হয়।")),
            (T("Can AI draft itineraries?", "AI কি ভ্রমণসূচির খসড়া করতে পারে?"),
             T("Yes. The AI trip planner prepares a draft your team can refine.", "হ্যাঁ। AI ট্রিপ প্ল্যানার খসড়া তৈরি করে, আপনার টিম তা ঠিকঠাক করে।")),
        ]),
    "online-travel-agencies": dict(
        keywords="OTA software, online travel agency platform, white-label booking engine, travel booking website",
        overview=[
            T("Launch an online travel agency on your own domain with flights, hotels, packages and online payment. Customers can pay with cards, PayPal, Stripe, Apple Pay or Google Pay.",
              "ফ্লাইট, হোটেল, প্যাকেজ ও অনলাইন পেমেন্টসহ নিজের ডোমেইনে অনলাইন ট্রাভেল এজেন্সি চালু করুন। কাস্টমাররা কার্ড, PayPal, Stripe, Apple Pay বা Google Pay দিয়ে পরিশোধ করতে পারেন।"),
            T("Behind the website, the same ERP handles fulfilment, customer service and accounting, and AI answers questions around the clock.",
              "ওয়েবসাইটের পেছনে একই ERP সেবা প্রদান, কাস্টমার সার্ভিস ও হিসাব সামলায়, আর AI সারাক্ষণ প্রশ্নের উত্তর দেয়।"),
        ],
        faqs=[
            (T("Which payment gateways can my OTA use?", "আমার OTA কোন পেমেন্ট গেটওয়ে ব্যবহার করতে পারবে?"),
             T("Stripe, PayPal, Apple Pay, Google Pay and card processors, plus regional gateways on request.", "Stripe, PayPal, Apple Pay, Google Pay ও কার্ড প্রসেসর, সাথে অনুরোধে আঞ্চলিক গেটওয়ে।")),
            (T("Can customers manage their own bookings?", "কাস্টমাররা কি নিজের বুকিং পরিচালনা করতে পারবেন?"),
             T("Yes. Customers log in to view bookings, download tickets and make payments.", "হ্যাঁ। কাস্টমার লগইন করে বুকিং দেখতে, টিকিট ডাউনলোড ও পেমেন্ট করতে পারেন।")),
            (T("Is the booking site mobile friendly?", "বুকিং সাইট কি মোবাইল-বান্ধব?"),
             T("Yes. The site is responsive, and branded mobile apps are available as an add-on.", "হ্যাঁ। সাইটটি রেসপন্সিভ, আর অ্যাড-অন হিসেবে ব্র্যান্ডেড মোবাইল অ্যাপও আছে।")),
        ]),
    "corporate-travel": dict(
        keywords="corporate travel management software, business travel booking, travel approval workflow",
        overview=[
            T("Corporate travel management software for agencies serving companies. Book within travel policy, collect manager approvals and bill each client once a month.",
              "কোম্পানিকে সেবা দেওয়া এজেন্সির জন্য কর্পোরেট ট্রাভেল ম্যানেজমেন্ট সফটওয়্যার। ট্রাভেল পলিসি মেনে বুক করুন, ম্যানেজারের অনুমোদন নিন এবং প্রতিটি ক্লায়েন্টকে মাসে একবার বিল দিন।"),
            T("Spend reports by department, traveller and cost centre help your corporate clients control budgets and keep coming back.",
              "বিভাগ, যাত্রী ও কস্ট সেন্টার অনুযায়ী খরচের রিপোর্ট আপনার কর্পোরেট ক্লায়েন্টদের বাজেট নিয়ন্ত্রণে সাহায্য করে এবং তারা বারবার ফিরে আসেন।"),
        ],
        faqs=[
            (T("Can companies approve trips online?", "কোম্পানি কি অনলাইনে ট্রিপ অনুমোদন দিতে পারে?"),
             T("Yes. Managers approve or reject requests by email or in the portal.", "হ্যাঁ। ম্যানেজাররা ইমেইলে বা পোর্টালে অনুরোধ অনুমোদন বা বাতিল করেন।")),
            (T("Can I invoice companies monthly?", "কোম্পানিকে কি মাসিক ইনভয়েস দেওয়া যায়?"),
             T("Yes. Bookings are collected on one monthly invoice per company.", "হ্যাঁ। প্রতিটি কোম্পানির বুকিং একটি মাসিক ইনভয়েসে একত্রিত হয়।")),
            (T("Can clients see their travel spend?", "ক্লায়েন্টরা কি তাদের ভ্রমণ খরচ দেখতে পারেন?"),
             T("Yes. Share spend reports by department, traveller or cost centre.", "হ্যাঁ। বিভাগ, যাত্রী বা কস্ট সেন্টার অনুযায়ী খরচের রিপোর্ট শেয়ার করুন।")),
        ]),
}
