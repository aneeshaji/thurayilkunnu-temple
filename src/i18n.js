import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
const resources = {
    en: {
        translation: {
            navbar: {
                home: "Home",
                about: "About",
                deities: "Deities",
                festivals: "Festivals",
                offerings: "Offerings",
                contact: "Contact",
                gallery: "Gallery",
                vazhipadu: "Vazhipadus",
                online_pooja: "Online Pooja"
            },
            home: {
                welcome_subtitle: "Since Generations",
                welcome_title: "Thurayilkunnu Sree Subramanya Swami Temple",
                welcome_desc1: "Thurayilkunnu Sree Subramanya Swami Temple is a haven of peace and spirituality, attracting devotees from all walks of life. Dedicated to Lord Subramanya, the temple is a beacon of serenity and heritage, offering a sanctuary for those seeking blessings and inner strength.",
                welcome_desc2: "Experience the divine presence through our sacred rituals and long-standing traditions that have blessed families for decades.",
                learn_more: "Learn More About Us",
                location_chip: "Karunagappally, Kerala",
                stats: {
                    heritage: "Years of Heritage",
                    devotees: "Daily Devotees",
                    festivals: "Annual Festivals",
                    established: "Established"
                },
                timings: {
                    title: "Temple Timings",
                    card_badge: "Temple Timings",
                    morning: "Morning",
                    evening: "Evening"
                },
                quote: {
                    mantra: "Om Saravana Bhava",
                    blessing: "May Lord Subramanya bless you with health, wealth, and prosperity."
                },
                offerings: {
                    section_label: "What We Offer",
                    subtitle: "Sacred Offerings",
                    title: "Temple Offerings",
                    desc: "Participate in the divine rituals of the temple.",
                    view_all: "View All Offerings",
                    ganapathy_homam: "Ganapathy Homam",
                    ganapathy_homam_desc: "Sacred fire ritual invoking divine blessings of Lord Ganapathy for prosperity and obstacle removal.",
                    vazhipadu: "Vazhipadu",
                    vazhipadu_desc: "Devotional offerings made to the deity as an act of gratitude and surrender to the divine.",
                    thulabharam: "Thulabharam",
                    thulabharam_desc: "A ritual of weighing a devotee against offerings dedicated entirely to the deity.",
                    special_poojas: "Special Poojas",
                    special_poojas_desc: "Elaborate pujas conducted on auspicious days and festivals for special divine grace."
                },
                closing: {
                    card_badge: "Get In Touch",
                    questions: "Have Questions?",
                    office_desc: "Our temple office is open to assist you with any inquiries.",
                    mission_title: "Our Mission",
                    mission_desc: "Preserving our rich spiritual heritage and fostering a space of universal peace and devotion for all who seek divine solace.",
                    visit_donate: "Visit or Donate"
                },
                banner: {
                    slide1: {
                        title: "Thurayilkunnu Sree Subramanya Swami Temple",
                        subtitle: "A place of divine solace and spiritual heritage"
                    },
                    slide2: {
                        title: "Divine Blessings",
                        subtitle: "Experience the presence of Lord Subramanya"
                    },
                    slide3: {
                        title: "Traditional Majesty",
                        subtitle: "A sanctuary for devotees at Thurayilkunnu"
                    }
                }
            },
            about: {
                title: "About the Temple",
                hero_badge: "Our Heritage",
                history_title: "History & Significance",
                history_heading: "Legacy of Thurayilkunnu",
                history_p1: "The Thurayilkunnu Sree Subramanya Swami Temple is an ancient seat of divinity, believed to have been established centuries ago. It stands as a testament to the rich cultural and spiritual heritage of Kerala. The temple architecture follows the traditional Kerala style, with intricate wood carvings and a copper-plated roof that glows in the sunlight.",
                history_p2: "Devotees believe that the idol of Lord Subramanya here is self-manifested (Swayambhu), radiating immense power and grace. The serene atmosphere of the temple complex provides a perfect setting for meditation and prayer.",
                legend_title: "The Legend (Sthala Puranam)",
                legend_heading: "The Divine Manifestation",
                legend_quote: "A sanctuary discovered by sages, blessed by the divine commander.",
                legend_p1: "According to local legends, the sanctity of this place was discovered by a sage who felt a divine presence while meditating on this hill (Kunnu). He found an idol of Lord Subramanya and consecrated it here. Over time, the temple grew in prominence, attracting devotees from far and wide.",
                architecture_title: "Architecture",
                architecture_heading: "Traditional Kerala Artistry",
                architecture_p1: "The temple features a classic Nalukettu structure, with the sanctum sanctorum (Sreekovil) at the center. The walls are adorned with murals depicting scenes from the Skanda Purana. The Chuttambalam (outer structure) encircles the main shrine, providing a pathway for circumambulation (Pradakshina).",
                arch_feat1: "Classic Nalukettu Structure",
                arch_feat2: "Skanda Purana Wall Murals",
                arch_feat3: "Intricate Wood Carvings",
                arch_location: "Traditional Sreekovil at the center of the complex.",
                cta_title: "Experience the Peace Yourself",
                cta_desc: "Join our daily poojas and festivals to witness the divine aura of Thurayilkunnu Sree Subramanya Swami Temple.",
                cta_btn: "Plan Your Visit"
            },
            deities: {
                page_title: "Divine Deities",
                page_intro: "The temple is the abode of Sree Subramanya Swami. The aura of the deity fills the hearts of devotees with peace and devotion.",
                list: {
                    subramanya: {
                        name: "Sree Subramanya Swami",
                        desc: "The presiding deity, Lord Murugan, is worshipped here in his divine form as the commander of the gods. He is the son of Lord Shiva and Goddess Parvati."
                    },
                    ganapathy: {
                        name: "Lord Ganapathy",
                        desc: "The remover of obstacles, Lord Ganesha is worshipped daily for prosperity and success."
                    },
                    ayyappan: {
                        name: "Dharma Sastha (Ayyappan)",
                        desc: "Worshipped as the upholder of Dharma and truth."
                    },
                    nagaraja: {
                        name: "Nagaraja",
                        desc: "The serpent gods are worshipped in the distinct Sarpa Kavu within the temple precinct."
                    }
                }
            },
            offerings_page: {
                title: "Offerings (Vazhipadu)",
                intro: "Devotees can perform various offerings to the deity. Please book your Vazhipadu at the temple counter.",
                table_name: "Offering Name",
                table_price: "Price",
                booking_title: "Booking Information",
                booking_desc: "Vazhipadu counters are open from 5:00 AM to 10:30 AM and 5:30 PM to 8:00 PM. For special poojas like Ganapathy Homam, please book at least one day in advance.",
                list: {
                    pushpanjali: { name: "Pushpanjali", desc: "Offering of flowers and mantras for mental peace." },
                    muttarukkal: { name: "Muttarukkal", desc: "Offering of coconuts to remove obstacles." },
                    payasam: { name: "Payasam Nivedyam", desc: "Sweet pudding offering for prosperity." },
                    homam: { name: "Ganapathy Homam", desc: "Detailed ritual for removing hurdles and new beginnings." },
                    shatrusamhara: { name: "Shatrusamhara Pushpanjali", desc: "For protection from enemies and negativity." },
                    thulabharam: { name: "Thulabharam", desc: "Offering one's weight in items like jaggery, banana, etc." },
                    panchamrutham: { name: "Panchamrutham", desc: "Divine sweet offering made of five ingredients." },
                    bhasmabhishekam: { name: "Bhasmabhishekam", desc: "Sacred ash anointing for health and purity." },
                    palabhishekam: { name: "Palabhishekam", desc: "Milk anointing to please Lord Subramanya." },
                    chuttuvilakku: { name: "Chuttu Vilakku", desc: "Lighting all the lamps around the temple shrine." },
                    vidyarambham: { name: "Vidyarambham", desc: "Initiation into the world of learning and letters." },
                    annadanam: { name: "Annadanam", desc: "Sacred offering of food to the devotees." }
                }
            },
            festivals_page: {
                title: "Temple Festivals",
                intro: "The temple comes alive during festivals, drawing thousands of devotees to witness the grandeur and receive blessings.",
                list: {
                    thaipusam: {
                        name: "Thaipusam",
                        date: "January / February",
                        desc: "A major festival dedicated to Lord Murugan, celebrated with great fervor. Devotees carry Kavadis and perform ritualistic dances."
                    },
                    skanda: {
                        name: "Skanda Sashti",
                        date: "October / November",
                        desc: "A six-day festival commemorating the victory of Lord Subramanya over the demon Surapadman. Usually includes Soorasamharam."
                    },
                    vishu: {
                        name: "Vishu",
                        date: "April",
                        desc: "The Kerala New Year is celebrated with special poojas and the auspicious Vishu Kani darshan early in the morning."
                    },
                    thrikarthika: {
                        name: "Thrikarthika",
                        date: "November / December",
                        desc: "The festival of lights, celebrated on the Karthika star in the month of Vrischikam."
                    }
                }
            },
            contact_page: {
                title: "Contact Us",
                hero_badge: "Get in Touch",
                hero_subtitle: "We are here to answer your spiritual inquiries and provide information about temple services.",
                get_in_touch: "Get in Touch",
                desc: "We are here to answer any questions you may have about temple timings, offerings, or events.",
                address_title: "Address",
                phone_title: "Phone",
                phone_available: "Available during Office Hours",
                email_title: "Email",
                hours_title: "Office Hours",
                hours: "9:00 AM - 5:00 PM (Everyday)",
                hours_sessions: "Morning & Evening Sessions",
                send_title: "Send a Message",
                form_name: "Name",
                form_name_placeholder: "Your Full Name",
                form_email: "Email",
                form_email_placeholder: "yourname@email.com",
                form_message: "Message",
                form_message_placeholder: "How can we help you?",
                form_submit: "Send Message",
                form_success: "Thank you for contacting us. We will get back to you soon.",
                locate_map: "Locate on Maps"
            },
            gallery: {
                hero_badge: "Divine Moments",
                hero_title: "Temple Gallery",
                hero_subtitle: "Exploring the spiritual beauty and architectural grandeur of Thurayilkunnu Sree Subramanya Swami Temple through the lens.",
                footer_title: "Capturing Centuries of Faith",
                footer_desc: "Our gallery is continuously updated with photos from recent festivals and temple rituals. Visit often to stay connected with the divine aura of Thurayilkunnu."
            },
            footer: {
                description: "A sacred center for spiritual heritage and traditional values, serving the Thurayilkunnu community for generations. Experience the divine grace and tranquility.",
                navigation: "Navigation",
                services: {
                    title: "Services",
                    pooja_booking: "Pooja Booking",
                    location_map: "Location Map",
                    festivals: "Temple Festivals",
                    support: "Devotee Support"
                },
                reach_us: "Reach Us",
                address: "Thurayilkunnu, Karunagappally, Kerala",
                all_rights: "All rights reserved.",
                developed_by: "Developed and maintained by TechnoByteInnovations"
            }
        }
    },
    ml: {
        translation: {
            navbar: {
                home: "ഹോം",
                about: "ക്ഷേത്രത്തെക്കുറിച്ച്",
                deities: "ദേവതകൾ",
                festivals: "ഉത്സവങ്ങൾ",
                offerings: "വഴിപാടുകൾ",
                contact: "ബന്ധപ്പെടുക",
                gallery: "ഗാലറി",
                vazhipadu: "വഴിപാടുകൾ",
                online_pooja: "ഓൺലൈൻ പൂജ"
            },
            home: {
                welcome_subtitle: "തലമുറകളായി",
                welcome_title: "തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം",
                welcome_desc1: "തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം ശാന്തിയുടെയും ആത്മീയതയുടെയും സങ്കേതമാണ്. ഭഗവാൻ സുബ്രഹ്മണ്യനായി സമർപ്പിച്ചിരിക്കുന്ന ഈ ക്ഷേത്രം അനുഗ്രഹങ്ങൾക്കും ആന്തരിക ശക്തിക്കും വേണ്ടിയുള്ള ഭക്തരുടെ ആശ്രയകേന്ദ്രമാണ്.",
                welcome_desc2: "പതിറ്റാണ്ടുകളായി കുടുംബങ്ങളെ അനുഗ്രഹിച്ചുവരുന്ന ഞങ്ങളുടെ പുണ്യകർമ്മങ്ങളിലൂടെയും പാരമ്പര്യങ്ങളിലൂടെയും ദിവ്യസാന്നിധ്യം അനുഭവിക്കുക.",
                learn_more: "കൂടുതൽ അറിയാൻ",
                location_chip: "കരുനാഗപ്പള്ളി, കേരളം",
                stats: {
                    heritage: "വർഷത്തെ പാരമ്പര്യം",
                    devotees: "പ്രതിദിന ഭക്തർ",
                    festivals: "വാർഷിക ഉത്സവങ്ങൾ",
                    established: "സ്ഥാപിതം"
                },
                timings: {
                    title: "ക്ഷേത്ര സമയം",
                    card_badge: "ക്ഷേത്ര സമയം",
                    morning: "രാവിലെ",
                    evening: "വൈകുന്നേരം"
                },
                quote: {
                    mantra: "ഓം ശരവണ ഭവ",
                    blessing: "ശ്രീ സുബ്രഹ്മണ്യസ്വാമി നിങ്ങളെ ആരോഗ്യവും ഐശ്വര്യവും നൽകി അനുഗ്രഹിക്കട്ടെ."
                },
                offerings: {
                    section_label: "ഞങ്ങൾ എന്ത് വാഗ്ദാനം ചെയ്യുന്നു",
                    subtitle: "പുണ്യവഴിപാടുകൾ",
                    title: "ക്ഷേത്ര വഴിപാടുകൾ",
                    desc: "ക്ഷേത്രത്തിലെ ദിവ്യമായ അനുഷ്ഠാനങ്ങളിൽ പങ്കുചേരുക.",
                    view_all: "എല്ലാ വഴിപാടുകളും കാണുക",
                    ganapathy_homam: "ഗണപതി ഹോമം",
                    ganapathy_homam_desc: "ഐശ്വര്യത്തിനും തടസ്സനിവാരണത്തിനും ഭഗവാൻ ഗണപതിയുടെ ദിവ്യ അനുഗ്രഹം തേടിക്കൊണ്ടുള്ള പുണ്യ ഹോമം.",
                    vazhipadu: "വഴിപാട്",
                    vazhipadu_desc: "ദൈവത്തിനു കൃതജ്ഞതയും ഭക്തിയും അർപ്പിക്കാൻ ഭക്തർ നടത്തുന്ന ദേവ നിവേദ്യങ്ങൾ.",
                    thulabharam: "തുലാഭാരം",
                    thulabharam_desc: "ഭക്തന്റെ ഭാരം കണക്കാക്കി ദേവന് സമർപ്പിക്കുന്ന അനുഷ്ഠാനം.",
                    special_poojas: "പ്രത്യേക പൂജകൾ",
                    special_poojas_desc: "ശുഭദിനങ്ങളിലും ഉത്സവങ്ങളിലും പ്രത്യേക ദൈവകൃപയ്ക്കായി നടത്തുന്ന വിശദമായ പൂജകൾ."
                },
                closing: {
                    card_badge: "ബന്ധപ്പെടുക",
                    questions: "എന്തെങ്കിലും സംശയമുണ്ടോ?",
                    office_desc: "എന്ത് സംശയങ്ങൾക്കും ഞങ്ങളുടെ ക്ഷേത്ര ഓഫീസ് നിങ്ങളെ സഹായിക്കാൻ സന്നദ്ധമാണ്.",
                    mission_title: "ലക്ഷ്യം",
                    mission_desc: "ഞങ്ങളുടെ സമ്പന്നമായ ആത്മീയ പൈതൃകം സംരക്ഷിക്കുകയും സമാധാനവും ഭക്തിയും ആഗ്രഹിക്കുന്ന എല്ലാവർക്കും ഒരിടം നൽകുകയും ചെയ്യുക.",
                    visit_donate: "സന്ദർശിക്കുക അല്ലെങ്കിൽ സംഭാവന നൽകുക"
                },
                banner: {
                    slide1: {
                        title: "തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം",
                        subtitle: "ആത്മീയ പൈതൃകത്തിന്റെയും ശാന്തിയുടെയും സങ്കേതം"
                    },
                    slide2: {
                        title: "ദിവ്യ അനുഗ്രഹങ്ങൾ",
                        subtitle: "ഭഗവാൻ സുബ്രഹ്മണ്യന്റെ സാന്നിധ്യം അനുഭവിക്കുക"
                    },
                    slide3: {
                        title: "പരമ്പരാഗത പ്രൗഢി",
                        subtitle: "തുറയിൽകുന്നിലെ ഭക്തർക്കുള്ള പുണ്യ സങ്കേതം"
                    }
                }
            },
            about: {
                title: "ക്ഷേത്രത്തെക്കുറിച്ച്",
                hero_badge: "ഞങ്ങളുടെ പൈതൃകം",
                history_title: "ചരിത്രവും പ്രാധാന്യവും",
                history_heading: "തുറയിൽകുന്നിന്റെ പൈതൃകം",
                history_p1: "തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം നൂറ്റാണ്ടുകൾക്ക് മുമ്പ് സ്ഥാപിതമായതെന്ന് വിശ്വസിക്കപ്പെടുന്ന പുരാതനമായ ഒരു പുണ്യസങ്കേതമാണ്. കേരളത്തിന്റെ സമ്പന്നമായ സാംസ്കാരികവും ആത്മീയവുമായ പൈതൃകത്തിന്റെ തെളിവായി ഇത് നിലകൊള്ളുന്നു. പരമ്പരാഗതമായ കേരളീയ വാസ്തുവിദ്യ പിന്തുടരുന്ന ഈ ക്ഷേത്രം മനോഹരമായ കൊത്തുപണികൾ കൊണ്ടും പ്രത്യേക പ്രകാശത്തിൽ തിളങ്ങുന്ന താമ്രപത്രങ്ങൾ പാകിയ മേൽക്കൂരകൊണ്ടും ശ്രദ്ധേയമാണ്.",
                history_p2: "ഇവിടെയുള്ള ഭഗവാൻ സുബ്രഹ്മണ്യന്റെ വിഗ്രഹം സ്വയംഭൂവാണെന്ന് ഭക്തർ വിശ്വസിക്കുന്നു. സമാധാനപൂർണ്ണമായ ക്ഷേത്രാന്തരീക്ഷം ധ്യാനത്തിനും പ്രാർത്ഥനയ്ക്കും ഉചിതമായ ഒരിടമാണ്.",
                legend_title: "ഐതിഹ്യം (സ്ഥലപുരാണം)",
                legend_heading: "ദിവ്യ പ്രകടനം",
                legend_quote: "മുനിമാർ കണ്ടെത്തിയ, ദൈവിക സേനാധിപൻ അനുഗ്രഹിച്ച പുണ്യസ്ഥലം.",
                legend_p1: "പ്രാദേശിക ഐതിഹ്യങ്ങൾ അനുസരിച്ച്, ഈ കുന്നിൽ ധ്യാനിച്ചുകൊണ്ടിരുന്ന ഒരു മുനി ഭഗവാന്റെ സാന്നിധ്യം അനുഭവിക്കുകയും തുടർന്ന് ഇവിടെ വിഗ്രഹം കണ്ടെത്തുകയും പ്രതിഷ്ഠിക്കുകയും ചെയ്തു. കാലക്രമേണ ക്ഷേത്രം കൂടുതൽ പ്രസിദ്ധമാവുകയും ലോകത്തിന്റെ വിവിധ ഭാഗങ്ങളിൽ നിന്ന് ഭക്തരെ ആകർഷിക്കുകയും ചെയ്തു.",
                architecture_title: "വാസ്തുവിദ്യ",
                architecture_heading: "പരമ്പരാഗത കേരളീയ കരകൗശലം",
                architecture_p1: "പരമ്പരാഗത നാലുകെട്ട് മാതൃകയിലുള്ള ക്ഷേത്രത്തിൽ ശ്രീകോവിൽ മധ്യഭാഗത്തായി സ്ഥിതിചെയ്യുന്നു. മതിലുകളിൽ സ്കന്ദപുരാണത്തിലെ ദൃശ്യങ്ങൾ ചിത്രീകരിച്ചിരിക്കുന്നു. പ്രധാന പ്രതിഷ്ഠയെ ചുറ്റിപ്പറ്റിയുള്ള ചുറ്റമ്പലം പ്രദക്ഷിണത്തിനായി ഭക്തർക്ക് വഴിയൊരുക്കുന്നു.",
                arch_feat1: "ക്ലാസിക് നാലുകെട്ട് ഘടന",
                arch_feat2: "സ്കന്ദ പുരാണ ചുവർചിത്രങ്ങൾ",
                arch_feat3: "മനോഹര കൊത്തുപണികൾ",
                arch_location: "സമുച്ചയത്തിന്റെ മധ്യഭാഗത്ത് ശ്രീകോവിൽ.",
                cta_title: "ശാന്തി നേരിൽ അനുഭവിക്കൂ",
                cta_desc: "തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രത്തിന്റെ ദിവ്യ ഭാവം ദർശിക്കാൻ ദൈനംദിന പൂജകളിലും ഉത്സവങ്ങളിലും പങ്കെടുക്കുക.",
                cta_btn: "സന്ദർശനം ആസൂത്രണം ചെയ്യുക"
            },
            deities: {
                page_title: "ദിവ്യ ദേവതകൾ",
                page_intro: "ശ്രീ സുബ്രഹ്മണ്യസ്വാമി കുടികൊള്ളുന്ന പുണ്യധാമമാണിത്. ഭഗവാന്റെ സാന്നിധ്യം ഭക്തരുടെ ഹൃദയങ്ങളിൽ സമാധാനവും ഭക്തിയും നിറയ്ക്കുന്നു.",
                list: {
                    subramanya: {
                        name: "ശ്രീ സുബ്രഹ്മണ്യസ്വാമി",
                        desc: "ദേവസേനാധിപനായി ഭഗവാൻ സുബ്രഹ്മണ്യനെ ഇവിടെ ആരാധിക്കുന്നു. ഭഗവാൻ ശിവന്റെയും പാർവതി ദേവിയുടെയും പുത്രനാണ് ഇദ്ദേഹം."
                    },
                    ganapathy: {
                        name: "ഗണപതി ഭഗവാൻ",
                        desc: "വിഘ്നങ്ങൾ നീക്കുന്ന ഭഗവാൻ ഗണപതിയെ സർവ്വ ഐശ്വര്യങ്ങൾക്കുമായി ദിവസവും ആരാധിക്കുന്നു."
                    },
                    ayyappan: {
                        name: "ധർമ്മശാസ്താവ് (അയ്യപ്പൻ)",
                        desc: "സത്യത്തിന്റെയും ധർമ്മത്തിന്റെയും പരിപാലകനായി ഭഗവാൻ അയ്യപ്പനെ ആരാധിക്കുന്നു."
                    },
                    nagaraja: {
                        name: "നാഗരാജാവ്",
                        desc: "ക്ഷേത്രവളപ്പിലെ പ്രത്യേക സർപ്പക്കാവിൽ നാഗദൈവങ്ങളെ ആരാധിക്കുന്നു."
                    }
                }
            },
            offerings_page: {
                title: "വഴിപാടുകൾ",
                intro: "ഭക്തർക്ക് ഭഗവാന് വിവിധ വഴിപാടുകൾ സമർപ്പിക്കാം. ദയവായി ക്ഷേത്ര കൗണ്ടറിൽ വഴിപാടുകൾ ബുക്ക് ചെയ്യുക.",
                table_name: "വഴിപാടിന്റെ പേര്",
                table_price: "നിരക്ക്",
                booking_title: "ബുക്കിംഗ് വിവരങ്ങൾ",
                booking_desc: "വഴിപാട് കൗണ്ടറുകൾ രാവിലെ 5:00 മുതൽ 10:30 വരെയും വൈകുന്നേരം 5:30 മുതൽ 8:00 വരെയും പ്രവർത്തിക്കും. ഗണപതി ഹോമം പോലുള്ള പ്രത്യേക പൂജകൾക്ക് ഒരു ദിവസം മുമ്പെങ്കിലും ബുക്ക് ചെയ്യുക.",
                list: {
                    pushpanjali: { name: "പുഷ്പാഞ്ജലി", desc: "മനോശാന്തിക്കായി പൂക്കളും മന്ത്രങ്ങളും സമർപ്പിക്കുന്നു." },
                    muttarukkal: { name: "മുട്ടറുക്കൽ", desc: "തടസ്സങ്ങൾ നീങ്ങാൻ നാളികേരം ഉടയ്ക്കുന്നു." },
                    payasam: { name: "പായസം നിവേദ്യം", desc: "ഐശ്വര്യക്കായി പായസം വഴിപാട്." },
                    homam: { name: "ഗണപതി ഹോമം", desc: "തടസ്സങ്ങൾ നീങ്ങാനും പുതിയ സംരംഭങ്ങൾ തുടങ്ങാനും നടത്തുന്ന അനുഷ്ഠാനം." },
                    shatrusamhara: { name: "ശത്രുസംഹാര പുഷ്പാഞ്ജലി", desc: "ശത്രുദോഷത്തിൽ നിന്നും നെഗറ്റീവ് ഊർജ്ജത്തിൽ നിന്നും സംരക്ഷണത്തിന്." },
                    thulabharam: { name: "തുലാഭാരം", desc: "ശർക്കര, കദളിപ്പഴം തുടങ്ങിയ വസ്തുക്കൾ തൂക്കി നൽകുന്ന വഴിപാട്." },
                    panchamrutham: { name: "പഞ്ചാമൃതം", desc: "അഞ്ച് മധുരവസ്തുക്കൾ ചേർത്തുള്ള വിശിഷ്ട നിവേദ്യം." },
                    bhasmabhishekam: { name: "ഭസ്മാഭിഷേകം", desc: "ആരോഗ്യത്തിനും ശുദ്ധിക്കും വേണ്ടിയുള്ള ഭസ്മാഭിഷേകം." },
                    palabhishekam: { name: "പാലഭിഷേകം", desc: "ശ്രീ സുബ്രഹ്മണ്യസ്വാമിക്ക് പ്രീതികരമായ പാലഭിഷേകം." },
                    chuttuvilakku: { name: "ചുറ്റുവിളക്ക്", fix: false, desc: "ക്ഷേത്രത്തിനു ചുറ്റുമുള്ള വിളക്കുകൾ തെളിയിക്കുന്ന വഴിപാട്." },
                    vidyarambham: { name: "വിദ്യാരംഭം", desc: "കുട്ടികളെ അക്ഷരം എഴുത്തിക്കുന്ന പുണ്യകർമ്മം." },
                    annadanam: { name: "അന്നദാനം", desc: "ഭക്തർക്കായി നൽകുന്ന പുണ്യമായ അന്നദാനം." }
                }
            },
            festivals_page: {
                title: "ക്ഷേത്ര ഉത്സവങ്ങൾ",
                intro: "ഉത്സവകാലങ്ങളിൽ ക്ഷേത്രം അതിമനോഹരമായി മാറുന്നു. ആയിരക്കണക്കിന് ഭക്തർ ഈ വിശേഷങ്ങൾക്ക് സാക്ഷിയാകാനും അനുഗ്രഹം തേടാനും എത്തുന്നു.",
                list: {
                    thaipusam: {
                        name: "തൈപ്പൂയം",
                        date: "ജനുവരി / ഫെബ്രുവരി",
                        desc: "ഭഗവാൻ സുബ്രഹ്മണ്യനായി സമർപ്പിച്ചിരിക്കുന്ന പ്രധാന ഉത്സവം. കാവടി ഏന്തിയും ആചാരപരമായ നൃത്തങ്ങൾ ചവിട്ടിയും ഭക്തർ ഈ ദിവസം ആഘോഷിക്കുന്നു."
                    },
                    skanda: {
                        name: "സ്കന്ദ ഷഷ്ഠി",
                        date: "ഒക്ടോബർ / നവംബർ",
                        desc: "ശൂരപദ്മനെ ഭഗവാൻ നിഗ്രഹിച്ചതിന്റെ സ്മരണയ്ക്കായി നടത്തുന്ന ആറ് ദിവസത്തെ ഉത്സവം. ഇതിൽ ശൂരസംഹാരമാണ് പ്രധാന ചടങ്ങ്."
                    },
                    vishu: {
                        name: "വിഷു",
                        date: "ഏപ്രിൽ",
                        desc: "മലയാളികൾ പുതിയ വർഷത്തെ വരവേൽക്കുന്ന വിഷു, ക്ഷേത്രത്തിൽ പ്രത്യേക പൂജകളോടും വിഷുക്കണി ദർശനത്തോടും കൂടി ആഘോഷിക്കുന്നു."
                    },
                    thrikarthika: {
                        name: "തൃക്കാർത്തിക",
                        date: "നവംബർ / ഡിസംബർ",
                        desc: "വൃശ്ചിക മാസത്തിലെ കാർത്തിക നക്ഷത്രത്തിൽ ദീപങ്ങൾ തെളിയിച്ച് ആഘോഷിക്കുന്ന വിജ്ഞാനത്തിന്റെയും വെളിച്ചത്തിന്റെയും ഉത്സവം."
                    }
                }
            },
            contact_page: {
                title: "ബന്ധപ്പെടുക",
                hero_badge: "വിവരങ്ങൾക്കായി",
                hero_subtitle: "ക്ഷേത്ര സേവനങ്ങളെക്കുറിച്ചുള്ള ആത്മീയ അന്വേഷണങ്ങൾക്ക് ഞങ്ങൾ ഇവിടെ ഉണ്ട്.",
                get_in_touch: "വിവരങ്ങൾക്കായി",
                desc: "ക്ഷേത്ര സമയം, വഴിപാടുകൾ അല്ലെങ്കിൽ വിശേഷങ്ങൾ എന്നിവയെക്കുറിച്ചുള്ള സംശയങ്ങൾക്കും ഞങ്ങൾ ലഭ്യമാണ്.",
                address_title: "വിലാസം",
                phone_title: "ഫോൺ",
                phone_available: "ഓഫീസ് സമയത്ത് ലഭ്യം",
                email_title: "ഇമെയിൽ",
                hours_title: "ഓഫീസ് സമയം",
                hours: "9:00 AM - 5:00 PM (എല്ലാ ദിവസവും)",
                hours_sessions: "രാവിലെയും വൈകുന്നേരവും",
                send_title: "സന്ദേശമയക്കുക",
                form_name: "പേര്",
                form_name_placeholder: "നിങ്ങളുടെ പൂർണ്ണ നാമം",
                form_email: "ഇമെയിൽ",
                form_email_placeholder: "yourname@email.com",
                form_message: "സന്ദേശം",
                form_message_placeholder: "ഞങ്ങൾക്ക് എങ്ങനെ സഹായിക്കാം?",
                form_submit: "സന്ദേശം അയക്കുക",
                form_success: "ഞങ്ങളുമായി ബന്ധപ്പെട്ടതിന് നന്ദി. ഞങ്ങൾ ഉടൻ നിങ്ങളെ ബന്ധപ്പെടും.",
                locate_map: "മാപ്പിൽ കണ്ടെത്തുക"
            },
            gallery: {
                hero_badge: "ദിവ്യ മുഹൂർത്തങ്ങൾ",
                hero_title: "ക്ഷേത്ര ഗാലറി",
                hero_subtitle: "ക്യാമറ കണ്ണിലൂടെ തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രത്തിന്റെ ആത്മീയ സൗന്ദര്യവും വാസ്തുശില്പ മഹിമയും ആസ്വദിക്കുക.",
                footer_title: "നൂറ്റാണ്ടുകളുടെ വിശ്വാസം ചിത്രത്തിൽ",
                footer_desc: "സമീപകാല ഉത്സവങ്ങളുടെയും ക്ഷേത്ര അനുഷ്ഠാനങ്ങളുടെയും ഫോട്ടോകൾ ഗാലറിയിൽ നിരന്തരം അപ്ഡേറ്റ് ചെയ്യുന്നു. തുറയിൽകുന്നിന്റെ ദിവ്യ ഭാവവുമായി ബന്ധം നിലനിർത്താൻ ഇടയ്ക്കിടെ സന്ദർശിക്കുക."
            },
            footer: {
                description: "തുറയിൽകുന്ന് സമൂഹത്തിന്റെ ആത്മീയ പൈതൃകത്തിന്റെയും പുരാതന മൂല്യങ്ങളുടെയും പുണ്യകേന്ദ്രം. ദിവ്യമായ കൃപയും ശാന്തിയും അനുഭവിക്കുക.",
                navigation: "നാവിഗേഷൻ",
                services: {
                    title: "സേവനങ്ങൾ",
                    pooja_booking: "പൂജ ബുക്കിംഗ്",
                    location_map: "ലൊക്കേഷൻ മാപ്പ്",
                    festivals: "ക്ഷേത്ര ഉത്സവങ്ങൾ",
                    support: "ഭക്തർക്കുള്ള സഹായം"
                },
                reach_us: "ബന്ധപ്പെടുക",
                address: "തുറയിൽകുന്ന്, കരുനാഗപ്പള്ളി, കേരളം",
                all_rights: "എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.",
                developed_by: "TechnoByteInnovations വികസിപ്പിക്കുകയും പരിപാലിക്കുകയും ചെയ്യുന്നു"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
