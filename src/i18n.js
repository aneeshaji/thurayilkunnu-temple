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
                online_pooja: "Online Pooja",
                donations: "Donations"
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
                    card_link: "Learn More",
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
                },
                testimonials: {
                    eyebrow: "Devotee Voices",
                    title: "Words of Devotion",
                    subtitle: "Devotees who have found peace, blessings and spiritual renewal at Thurayilkunnu.",
                    list: {
                        r1: {
                            name: "Rajesh Menon",
                            location: "Kollam",
                            quote: "Visiting Thurayilkunnu has been our family's weekly ritual for years. The serene sreekovil and the evening deeparadhana fill us with a peace we find nowhere else."
                        },
                        r2: {
                            name: "Meena Nair",
                            location: "Karunagappally",
                            quote: "My son's Annaprashan and my husband's Thulabharam were both conducted here. The sincerity of the priests and the temple's warmth made every occasion feel deeply sacred."
                        },
                        r3: {
                            name: "Anand Pillai",
                            location: "Kochi",
                            quote: "I travel from Kochi every Thaipusam to witness the Kavad procession. The devotion in the air is overwhelming — it is a spiritual home away from home."
                        }
                    }
                }
            },
            about: {
                title: "About the Temple",
                hero_badge: "Our Heritage",
                hero_subtitle: "A sacred hillock sanctuary established in 1952, consecrated in strict accordance with authentic Kerala tantric traditions.",
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
                page_intro: "The temple is the abode of Sree Subramanya Swami along with revered Upadevathas. The divine aura fills the hearts of devotees with peace and devotion.",
                list: {
                    subramanya: {
                        name: "Sree Subramanya Swami",
                        desc: "The presiding deity, Lord Murugan, is worshipped here in his divine form as the commander of the gods and dispeller of sorrows."
                    },
                    ganapathy: {
                        name: "Lord Ganapathy",
                        desc: "The remover of obstacles, Lord Ganesha is worshipped daily for prosperity, wisdom, and auspicious beginnings."
                    },
                    bhagavathy: {
                        name: "Goddess Bhagavathy",
                        desc: "The divine Mother Goddess (Devi), showering boundless motherly grace, protection, and prosperity upon all devotees."
                    },
                    sivan: {
                        name: "Lord Shiva (Mahadeva)",
                        desc: "The supreme cosmic lord Mahadeva, the auspicious source of all yogic wisdom, peace, and spiritual liberation."
                    },
                    nagaraja: {
                        name: "Nagaraja & Nagayakshi",
                        desc: "The sacred serpent deities worshipped in the serene Sarpa Kavu for family wellness and protection."
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
                    uthrattathi: {
                        name: "Uthrattathi Mahotsavam",
                        date: "Chingam (August / September)",
                        desc: "The grand annual Uthrattathi festival celebrated with special tantric rituals, grand poojas, Panchavadyam, and radiant deeparadhana."
                    },
                    skanda_purana_yajnam: {
                        name: "Skanda Purana Yajnam",
                        date: "Karkidakam / Chingam (July / August)",
                        desc: "A sacred Yajnam (fire sacrifice) conducted with the complete recitation of the Skanda Purana, invoking the supreme grace of Lord Subramanya for the welfare of all devotees."
                    },
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
            panchangam: {
                badge: "Daily Panchangam",
                title: "Today's Panchangam",
                subtitle: "Karunagappally, Kerala • Lahiri Ayanamsa",
                temple_loc: "Thurayilkunnu Temple",
                today: "Today",
                tithi: "Tithi",
                nakshatra: "Nakshatra",
                yoga: "Yoga",
                karana: "Karana",
                weekday: "Weekday",
                paksha: "Paksha",
                sunrise: "Sunrise",
                sunset: "Sunset",
                rahu_kalam: "Rahu Kalam",
                yamagandam: "Yamagandam",
                rahu_note: "Rahu Kalam & Yamagandam are inauspicious periods — avoid starting important events during these times",
                computing: "Computing…",
                error: "Could not compute Panchangam for this date.",
                retry: "Retry",
                shukla_paksha: "Shukla Paksha (Waxing)",
                krishna_paksha: "Krishna Paksha (Waning)"
            },
            notices: {
                banner_badge: "Temple Notice",
                view_all: "View All Notices",
                modal_title: "Temple Notice Board & Announcements",
                short_label: "Notices",
                helpline_note: "For special pooja bookings or festival inquiries, call temple office"
            },
            pwa: {
                title: "Install Temple App",
                desc: "Add to home screen for daily Panchangam, pooja timings & instant notices.",
                install_btn: "Install App"
            },
            donations_page: {
                hero_badge: "Sacred Contribution",
                title: "Donations & E-Hundi",
                subtitle: "Support our temple sacred rituals, Annadanam feeding, and sanctum development",
                intro: "Generosity and selfless contribution (Dana) in the sanctum of Lord Subramanya bring peace, well-being, and divine grace upon your family. Devotees may contribute towards sacred causes through Direct Bank Transfer or UPI QR Code.",
                causes_title: "Sacred Causes & Sevas",
                causes_subtitle: "Choose a dedicated cause for your divine contribution",
                causes: {
                    annadanam: {
                        name: "Annadanam Samarpanam",
                        desc: "Provide sacred meals (prasada oottu) to pilgrims and devotees visiting the sanctum.",
                        amount: "₹1,001 / ₹2,501 / Custom"
                    },
                    renovation: {
                        name: "Temple Renovation & Sreekovil Fund",
                        desc: "Preservation of traditional architecture, sanctum copper roof, and temple courtyard beautification.",
                        amount: "₹2,000 / ₹5,000 / Custom"
                    },
                    nithya_pooja: {
                        name: "Nithya Pooja & Pushpanjali Nidhi",
                        desc: "Ensure daily eternal morning and evening deeparadhana, flower garlands, and archana offerings.",
                        amount: "₹501 / ₹1,001 / Custom"
                    },
                    chuttuvilakku: {
                        name: "Chuttuvilakku & Oil Lamp Seva",
                        desc: "Illuminating hundreds of sacred brass deepams around the temple walls during festive dusks.",
                        amount: "₹500 / ₹1,500 / Custom"
                    }
                },
                bank_card: {
                    title: "Official Bank Transfer (NEFT / RTGS / IMPS)",
                    subtitle: "Direct contribution to Temple Trust Account",
                    acc_name: "Account Name",
                    acc_name_val: "Thurayilkunnu Sree Subramanya Swami Temple Trust",
                    acc_no: "Account Number",
                    acc_no_val: "67012345678",
                    bank_name: "Bank Name",
                    bank_name_val: "State Bank of India (SBI)",
                    branch: "Branch",
                    branch_val: "Karunagappally Branch",
                    ifsc: "IFSC Code",
                    ifsc_val: "SBIN0070054",
                    acc_type: "Account Type",
                    acc_type_val: "Current Account",
                    copy: "Copy",
                    copied: "Copied!"
                },
                upi_card: {
                    title: "Instant UPI / QR Code Payment",
                    subtitle: "Scan with Google Pay, PhonePe, Paytm, BHIM or any UPI App",
                    upi_id_label: "Temple Official UPI ID",
                    upi_id_val: "thurayilkunnutemple@sbi",
                    note: "Instant and 100% secure direct devotee offering to the sacred trust."
                },
                receipt_form: {
                    title: "Donation Acknowledgement & Receipt",
                    subtitle: "Submitted details help us send you official receipt & temple prasadam",
                    name: "Full Name",
                    phone: "Phone / WhatsApp Number",
                    email: "Email Address (Optional)",
                    cause: "Select Cause",
                    amount: "Amount Donated (₹)",
                    utr: "UPI / Bank Transaction UTR / Ref Number",
                    address: "Postal Address (For Prasadam)",
                    submit: "Submit & Confirm via WhatsApp",
                    success: "Thank you! Your donation details have been recorded. Opening WhatsApp for receipt verification...",
                    footer_note: "Thurayilkunnu Sree Subramanya Swami Temple is a registered religious trust. All contributions are utilized transparently for sanctum sevas."
                }
            },
            pooja_schedule: {
                badge: "Sanctum Timings",
                title: "Daily Pooja Timetable",
                subtitle: "Traditional Tantric rituals performed daily at the holy sanctum of Lord Subramanya",
                morning_session: "Morning Nirmalyam & Poojas",
                evening_session: "Evening Sandhya Poojas & Deeparadhana",
                special_days_title: "Special Auspicious Days",
                special_days_desc: "On Skanda Sashti, Thaipooyam, Pradosham, Tuesdays, and Malayalam 1st of every month, special Abhishekam, Kavadi poojas and continuous deepams are held with extended darshan hours.",
                events: [
                    { time: "05:00 AM", name: "Nada Thurakkal & Nirmalya Darshanam", desc: "The holy sanctum opens with conch resonance; devotees witness Lord in yesterday's sacred floral embellishments." },
                    { time: "05:30 AM", name: "Usha Pooja, Abhishekam & Ganapathy Homam", desc: "Dawn abhishekam with pure mountain water, sacred milk, and sacred fire invocation at Lord Ganesha shrine." },
                    { time: "08:30 AM", name: "Ethritha Pooja & Pantheeradi", desc: "Morning mid-hour pooja with sacred floral archana and Naivedyam." },
                    { time: "10:00 AM", name: "Ucha Pooja & Maha Naivedyam", desc: "Noon grand ritual, payasam naivedyam offering to the presiding deity Lord Subramanya." },
                    { time: "10:30 AM", name: "Ucha Nada Adakkal", desc: "Sanctum door closes for afternoon rest until evening." },
                    { time: "05:30 PM", name: "Sandhya Nada Thurakkal", desc: "Sanctum opens for evening rituals as temple courtyard brass oil lamps are lit." },
                    { time: "06:45 PM", name: "Sandhya Deeparadhana", desc: "The grand evening ritual with temple bells, multi-tiered brass oil lamps, and divine camphor aarti." },
                    { time: "07:30 PM", name: "Athazha Pooja", desc: "Night sacred meal offering to Lord Subramanya accompanied by sacred mantras." },
                    { time: "08:00 PM", name: "Thrippuka & Sreekovil Nada Adakkal", desc: "Sanctum sanctified with sacred herbal incense (Ashtagandham), final prayer and sanctum doors close for the night." }
                ]
            },
            dress_code: {
                badge: "Sacred Etiquette",
                title: "Temple Dress Code & Code of Conduct",
                subtitle: "Preserving the spiritual vibrations, purity, and ancient Kerala temple customs",
                gents_title: "Male Devotees",
                gents_rule1: "Traditional Mundu / Dhoti around the waist.",
                gents_rule2: "Upper body bare inside the Chuttambalam (inner temple courtyard). Shirts, vests, banians, coats, and caps must be removed.",
                gents_rule3: "Pants, lungis, and jeans are strictly prohibited inside the Nalambalam.",
                ladies_title: "Female Devotees",
                ladies_rule1: "Traditional Saree, Kerala Set Mundu (Kasavu), Half-Saree (Dhavani), or decent Salwar Kameez / Churidar with Dupatta.",
                ladies_rule2: "Western casuals (shorts, skirts, sleeveless tops, tight jeans) are not permitted inside the sanctum area.",
                sanctum_title: "Holy Sanctum Decorum",
                rule_footwear: "Footwear Prohibited",
                rule_footwear_desc: "Remove footwear at the designated counter outside before stepping into the sacred temple compound.",
                rule_mobile: "No Photography / Silence",
                rule_mobile_desc: "Mobile phones must be on silent mode. Photography & videography inside Nalambalam & Sreekovil are strictly prohibited.",
                rule_purity: "Sacred Cleansing (Snanam)",
                rule_purity_desc: "Devotees should take a purifying bath and visit the temple with pure mind, body, and traditional devotion.",
                rule_silence: "Holy Silence & Peace",
                rule_silence_desc: "Chant divine mantras silently ('Om Saravanabhavaya Namaha') and maintain tranquility within the sanctum."
            },
            administration: {
                badge: "Temple Governance",
                title: "Temple Administration & Office Bearers",
                subtitle: "Dedicated spiritual custodians, priests, and elected trust members guiding the temple affairs",
                spiritual_title: "Spiritual Custodians (തന്ത്രി & മേൽശാന്തി)",
                tantri_role: "Thantri (Chief High Priest / Ritual Custodian)",
                tantri_name: "Brahmasree Kandararu Maheswararu Thantrikal (Family Tradition)",
                tantri_desc: "Supreme ritual authority governing the Vedic & Tantric rites, Prathishta rituals, and festival flag-hoisting.",
                melsanthi_role: "Melsanthi (Head Priest)",
                melsanthi_name: "Sreedharan Namboothiri",
                melsanthi_desc: "Chief sanctum priest conducting daily Nirmalyam, Abhishekam, Ucha Pooja, and Deeparadhana rituals.",
                board_title: "Devaswom Trust Executive Committee",
                president_role: "President",
                president_name: "Sri. K. Radhakrishna Pillai",
                secretary_role: "General Secretary",
                secretary_name: "Sri. M. Suresh Kumar",
                treasurer_role: "Treasurer",
                treasurer_name: "Sri. V. Narayanan Achary",
                vp_role: "Vice President",
                vp_name: "Sri. P. Gopalakrishnan Nair",
                joint_sec_role: "Joint Secretary",
                joint_sec_name: "Sri. Rajendran Pillai",
                advisory_title: "Advisory Council & Seva Samithi",
                advisory_desc: "An elected committee of 15 senior devotees, ward representatives, and festival coordinators ensuring transparent community management.",
                trust_reg_title: "Trust Legal Registration",
                trust_reg_desc: "Thurayilkunnu Sree Subramanya Swami Temple Trust is a registered public charitable and religious trust under the Travancore-Cochin Literary, Scientific and Charitable Societies Registration Act (Est. 1952).",
                office_hours: "Office Timings: 08:00 AM – 12:30 PM & 04:30 PM – 07:30 PM Daily | Helpline: +91 94007 88358"
            },
            vazhipadu_booking: {
                modal_title: "Book Vazhipadu Offering",
                devotee_name: "Devotee Full Name",
                devotee_name_placeholder: "Enter devotee's name (for sankalpam)",
                nakshatram: "Birth Star / Janma Nakshatram",
                nakshatram_select: "Select Devotee's Star (നക്ഷത്രം)",
                pooja_date: "Preferred Pooja Date",
                gotram: "Gotram / Family Name (Optional)",
                gotram_placeholder: "e.g., Shiva Gotram / Illam",
                phone: "WhatsApp / Contact Number",
                phone_placeholder: "+91 98765 43210",
                prasadam_mode: "Prasadam Collection Mode",
                mode_counter: "Collect at Temple Counter",
                mode_postal: "Receive by Speed Post",
                submit_whatsapp: "Confirm & Book via WhatsApp",
                contact_office: "Contact Office Directly",
                validation_alert: "Please fill in Devotee Name, Nakshatram, and Pooja Date.",
                benefit: "Spiritual Benefit",
                timing_note: "Performed daily at sanctum during morning & evening pooja hours."
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
                address: "Thurayilkunnu, Maru: South, Karunagappally, Kollam, Kerala - 690573",
                all_rights: "All rights reserved.",
                developed_by: "Developed and maintained by TechnoByteInnovations"
            }
        }
    },
    ml: {
        translation: {
            navbar: {
                home: "ഹോം",
                about: "ക്ഷേത്രം",
                deities: "ദേവതകൾ",
                festivals: "ഉത്സവങ്ങൾ",
                offerings: "വഴിപാടുകൾ",
                contact: "ബന്ധപ്പെടുക",
                gallery: "ഗാലറി",
                vazhipadu: "വഴിപാടുകൾ",
                online_pooja: "ഓൺലൈൻ പൂജ",
                donations: "സംഭാവന"
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
                    card_link: "കൂടുതലറിയാൻ",
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
                },
                testimonials: {
                    eyebrow: "ഭക്തരുടെ ശബ്ദം",
                    title: "ഭക്തിനിർഭരമായ വാക്കുകൾ",
                    subtitle: "തുറയിൽകുന്നിൽ ശാന്തിയും അനുഗ്രഹവും ആത്മീയ നവീകരണവും കണ്ടെത്തിയ ഭക്തർ.",
                    list: {
                        r1: {
                            name: "രാജേഷ് മേനോൻ",
                            location: "കൊല്ലം",
                            quote: "വർഷങ്ങളായി ഞങ്ങളുടെ കുടുംബത്തിന്റെ പ്രതിവാര ചടങ്ങാണ് തുറയിൽകുന്ന് ദർശനം. ശാന്തമായ ശ്രീകോവിലും വൈകുന്നേരത്തെ ദീപാരാധനയും മറ്റെവിടെയും കിട്ടാത്ത സമാധാനം നൽകുന്നു."
                        },
                        r2: {
                            name: "മീന നായർ",
                            location: "കരുനാഗപ്പള്ളി",
                            quote: "എന്റെ മകന്റെ അന്നപ്രാശനവും ഭർത്താവിന്റെ തുലാഭാരവും ഇവിടെ നടത്തി. തന്ത്രിമാരുടെ ആത്മാർത്ഥതയും ക്ഷേത്രത്തിന്റെ സ്നേഹാത്മകതയും ഓരോ ചടങ്ങിനെയും അതീവ പുണ്യകരമാക്കി."
                        },
                        r3: {
                            name: "ആനന്ദ് പിള്ള",
                            location: "കൊച്ചി",
                            quote: "എല്ലാ തൈപ്പൂയത്തിനും കാവടി ഘോഷയാത്ര കാണാൻ കൊച്ചിയിൽ നിന്നാണ് ഞാൻ എത്തുന്നത്. അവിടത്തെ ഭക്തിയുടെ അനുഭൂതി അതിശക്തമാണ് — വീട്ടിൽ നിന്നകലെയുള്ള ഒരു ആത്മീയ ഭവനമാണ് ഇത്."
                        }
                    }
                }
            },
            about: {
                title: "ക്ഷേത്രത്തെക്കുറിച്ച്",
                hero_badge: "ഞങ്ങളുടെ പൈതൃകം",
                hero_subtitle: "1952-ൽ സ്ഥാപിതമായ, കേരളീയ താന്ത്രിക വിധിപ്രകാരം പ്രതിഷ്ഠിതമായ പുണ്യക്ഷേത്രം.",
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
                page_intro: "ശ്രീ സുബ്രഹ്മണ്യസ്വാമിയും ഉപദേവതകളും കുടികൊള്ളുന്ന പുണ്യധാമമാണിത്. ഭഗവാന്റെ സാന്നിധ്യം ഭക്തരുടെ ഹൃദയങ്ങളിൽ സമാധാനവും ഭക്തിയും നിറയ്ക്കുന്നു.",
                list: {
                    subramanya: {
                        name: "ശ്രീ സുബ്രഹ്മണ്യസ്വാമി",
                        desc: "ദേവസേനാധിപനായി ഭഗവാൻ സുബ്രഹ്മണ്യനെ പ്രധാന പ്രതിഷ്ഠയായി ആരാധിക്കുന്നു. സർവ്വ ദുഃഖങ്ങളും അകറ്റുന്ന കാരുണ്യമൂർത്തി."
                    },
                    ganapathy: {
                        name: "ഗണപതി ഭഗവാൻ",
                        desc: "വിഘ്നങ്ങൾ നീക്കുന്ന ഭഗവാൻ ഗണപതിയെ സർവ്വ ഐശ്വര്യങ്ങൾക്കും വിജയത്തിനുമായി ദിവസവും ആരാധിക്കുന്നു."
                    },
                    bhagavathy: {
                        name: "ശ്രീ ഭഗവതി (ഭദ്രകാളി)",
                        desc: "സർവ്വമംഗളങ്ങളും ഐശ്വര്യങ്ങളും അഭയവും നൽകി അനുഗ്രഹിക്കുന്ന ജഗന്മയയായ ദേവി."
                    },
                    sivan: {
                        name: "പരമശിവൻ (മഹാദേവൻ)",
                        desc: "കൈലാസനാഥനായ പരമശിവൻ, ലോകരക്ഷകനും സർവ്വജ്ഞാനസ്വരൂപനുമായി ശാന്തിയും മുക്തിയും പ്രദാനം ചെയ്യുന്നു."
                    },
                    nagaraja: {
                        name: "നാഗരാജാവും നാഗയക്ഷിയും",
                        desc: "ക്ഷേത്രവളപ്പിലെ പ്രത്യേക സർപ്പക്കാവിൽ നാഗദൈവങ്ങളെ പ്രീതിപ്പെടുത്തി കുടുംബൈശ്വര്യത്തിനായി ആരാധിക്കുന്നു."
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
                    uthrattathi: {
                        name: "ഉത്രട്ടാതി മഹോത്സവം",
                        date: "ചിങ്ങം (ആഗസ്റ്റ് / സെപ്റ്റംബർ)",
                        desc: "ക്ഷേത്രത്തിലെ അതീവ പ്രാധാന്യമുള്ള വാർഷിക ഉത്രട്ടാതി മഹോത്സവം. തന്ത്രിമുഖ്യരുടെ കാർമ്മികത്വത്തിൽ പ്രത്യേക പൂജകൾ, പഞ്ചവാദ്യം, മേളപ്പെരുക്കം, ദീപാരാധന എന്നിവയോടെ ഭക്തിസാന്ദ്രമായി കൊണ്ടാടുന്നു."
                    },
                    skanda_purana_yajnam: {
                        name: "സ്കന്ദ പുരാണ യജ്ഞം",
                        date: "കർക്കടകം / ചിങ്ങം (ജൂലൈ / ആഗസ്റ്റ്)",
                        desc: "സ്കന്ദ പുരാണം പൂർണ്ണമായി പാരായണം ചെയ്ത് നടത്തുന്ന പുണ്യ യജ്ഞം. ഭഗവാൻ സുബ്രഹ്മണ്യ സ്വാമിയുടെ ദിവ്യ അനുഗ്രഹം ഭക്തർക്കും ലോകസമൃദ്ധിക്കും വേണ്ടി ഹോമം ചെയ്ത് ആഘോഷിക്കുന്നു."
                    },
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
            panchangam: {
                badge: "ദൈനിക പഞ്ചാംഗം",
                title: "ഇന്നത്തെ പഞ്ചാംഗം",
                subtitle: "കരുനാഗപ്പള്ളി, കേരളം • ലാഹിരി അയനാംശം",
                temple_loc: "തുറയിൽകുന്ന് ക്ഷേത്രം",
                today: "ഇന്ന്",
                tithi: "തിഥി",
                nakshatra: "നക്ഷത്രം",
                yoga: "യോഗം",
                karana: "കരണം",
                weekday: "ആഴ്ച / വാരം",
                paksha: "പക്ഷം",
                sunrise: "സൂര്യോദയം",
                sunset: "സൂര്യാസ്തമയം",
                rahu_kalam: "രാഹുകാലം",
                yamagandam: "യമഗണ്ഡം",
                rahu_note: "രാഹുകാലവും യമഗണ്ഡവും ശുഭകാര്യങ്ങൾക്ക് വർജ്ജ്യമായ സമയങ്ങളാണ്",
                computing: "കണക്കുകൂട്ടുന്നു…",
                error: "ഈ തീയതിയിലെ പഞ്ചാംഗം ലഭ്യമാക്കാൻ സാധിച്ചില്ല.",
                retry: "വീണ്ടും ശ്രമിക്കുക",
                shukla_paksha: "ശുക്ലപക്ഷം",
                krishna_paksha: "കൃഷ്ണപക്ഷം"
            },
            notices: {
                banner_badge: "ക്ഷേത്ര അറിയിപ്പ്",
                view_all: "എല്ലാ അറിയിപ്പുകളും കാണുക",
                modal_title: "ക്ഷേത്ര അറിയിപ്പുകളും വാർത്തകളും",
                short_label: "അറിയിപ്പുകൾ",
                helpline_note: "വിശേഷാൽ പൂജകൾക്കും വഴിപാടുകൾക്കുമായി ക്ഷേത്ര ഓഫീസുമായി ബന്ധപ്പെടുക"
            },
            pwa: {
                title: "ക്ഷേത്ര ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യുക",
                desc: "ദിവസേനയുള്ള പഞ്ചാംഗത്തിനും പൂജാ സമയങ്ങൾക്കും ഹോം സ്ക്രീനിലേക്ക് ചേർക്കുക.",
                install_btn: "ഇൻസ്റ്റാൾ ചെയ്യുക"
            },
            donations_page: {
                hero_badge: "പുണ്യ സമർപ്പണം",
                title: "കണിക്കയും സംഭാവനയും",
                subtitle: "ക്ഷേത്ര നിത്യപൂജകൾ, അന്നദാനം, പുനരുദ്ധാരണ പ്രവർത്തനങ്ങൾ എന്നിവയിലേക്ക് കൈകോർക്കുക",
                intro: "ഭഗവാൻ സുബ്രഹ്മണ്യന്റെ സന്നിധിയിൽ സമർപ്പിക്കുന്ന ഓരോ സമർപ്പണവും കുടുംബത്തിന് ഐശ്വര്യവും ആയുരാരോഗ്യവും പ്രധാനം ചെയ്യുന്നു. ഭക്തർക്ക് ബാങ്ക് അക്കൗണ്ട് വഴിയോ യുപിഐ ക്യുആർ കോഡ് വഴിയോ നേരിട്ട് സമർപ്പിക്കാവുന്നതാണ്.",
                causes_title: "വിശേഷാൽ സമർപ്പണങ്ങൾ",
                causes_subtitle: "താങ്കളുടെ പുണ്യ സംഭാവനയ്ക്കായി ഒരു സേവ തിരഞ്ഞെടുക്കുക",
                causes: {
                    annadanam: {
                        name: "അന്നദാനം സമർപ്പണം",
                        desc: "ക്ഷേത്രത്തിൽ എത്തുന്ന ഭക്തർക്ക് നിത്യേനയും വിശേഷ ദിവസങ്ങളിലും പ്രസാദമൂട്ട് നൽകുന്നതിലേക്ക്.",
                        amount: "₹1,001 / ₹2,501 / ഇഷ്ടമുള്ള തുക"
                    },
                    renovation: {
                        name: "ക്ഷേത്ര നവീകരണ & വികസന ഫണ്ട്",
                        desc: "പരമ്പരാഗത ശ്രീകോവിൽ സംരക്ഷണം, ചെമ്പ് തകിടുകൾ, ചുറ്റമ്പല നവീകരണം എന്നിവയ്ക്കായി.",
                        amount: "₹2,000 / ₹5,000 / ഇഷ്ടമുള്ള തുക"
                    },
                    nithya_pooja: {
                        name: "നിത്യപൂജ & പുഷ്പാഞ്ജലി നിധി",
                        desc: "നിത്യേനയുള്ള രാവിലത്തെയും വൈകുന്നേരത്തെയും ദീപാരാധന, പൂമാലകൾ, അർച്ചനകൾ എന്നിവ സുഗമമായി നടത്തുന്നതിന്.",
                        amount: "₹501 / ₹1,001 / ഇഷ്ടമുള്ള തുക"
                    },
                    chuttuvilakku: {
                        name: "ചുറ്റുവിളക്ക് സമർപ്പണം",
                        desc: "വിശേഷാൽ ദിവസങ്ങളിൽ ക്ഷേത്രമതിലകത്തെ നൂറുകണക്കിന് ഓട്ടുവിളക്കുകൾ തെളിയിക്കുന്ന വിശേഷാൽ സേവനം.",
                        amount: "₹500 / ₹1,500 / ഇഷ്ടമുള്ള തുക"
                    }
                },
                bank_card: {
                    title: "ഔദ്യോഗിക ബാങ്ക് ട്രാൻസ്ഫർ (NEFT / RTGS / IMPS)",
                    subtitle: "ക്ഷേത്ര ട്രസ്റ്റ് അക്കൗണ്ടിലേക്ക് നേരിട്ട് അയക്കാം",
                    acc_name: "അക്കൗണ്ട് ഉടമ",
                    acc_name_val: "തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ടെമ്പിൾ ട്രസ്റ്റ്",
                    acc_no: "അക്കൗണ്ട് നമ്പർ",
                    acc_no_val: "67012345678",
                    bank_name: "ബാങ്ക്",
                    bank_name_val: "സ്റ്റേറ്റ് ബാങ്ക് ഓഫ് ഇന്ത്യ (SBI)",
                    branch: "ബ്രാഞ്ച്",
                    branch_val: "കരുനാഗപ്പള്ളി ബ്രാഞ്ച്",
                    ifsc: "IFSC കോഡ്",
                    ifsc_val: "SBIN0070054",
                    acc_type: "അക്കൗണ്ട് തരം",
                    acc_type_val: "കറന്റ് അക്കൗണ്ട്",
                    copy: "പകർത്തുക",
                    copied: "പകർത്തി!"
                },
                upi_card: {
                    title: "തത്സമയ UPI / QR കോഡ് പേയ്‌മെന്റ്",
                    subtitle: "Google Pay, PhonePe, Paytm, BHIM എന്നിവ ഉപയോഗിച്ച് സ്കാൻ ചെയ്യുക",
                    upi_id_label: "ക്ഷേത്രത്തിന്റെ ഔദ്യോഗിക UPI ID",
                    upi_id_val: "thurayilkunnutemple@sbi",
                    note: "സുരക്ഷിതമായി ക്ഷേത്ര ട്രസ്റ്റിലേക്ക് നേരിട്ട് എത്തുന്നതാണ്."
                },
                receipt_form: {
                    title: "രസീത് ലഭിക്കുന്നതിനുള്ള വിവരങ്ങൾ",
                    subtitle: "താങ്കൾ നൽകിയ സംഭാവനയുടെ ഔദ്യോഗിക രസീതും പ്രസാദവും അയച്ചുതരുന്നതിനായി നൽകുക",
                    name: "പൂർണ്ണ നാമം",
                    phone: "ഫോൺ / വാട്സാപ്പ് നമ്പർ",
                    email: "ഇമെയിൽ (ഐച്ഛികം)",
                    cause: "ഫണ്ട് തിരഞ്ഞെടുക്കുക",
                    amount: "സമർപ്പിച്ച തുക (₹)",
                    utr: "ബാങ്ക് / UPI ട്രാൻസാക്ഷൻ നമ്പർ (UTR / Ref)",
                    address: "തപാൽ മേൽവിലാസം (പ്രസാദം അയക്കാൻ)",
                    submit: "സമർപ്പിച്ചു രസീത് വാട്സാപ്പിൽ ആവശ്യപ്പെടുക",
                    success: "നന്ദി! വിവരങ്ങൾ രേഖപ്പെടുത്തി. രസീത് സ്ഥിരീകരണത്തിനായി വാട്സാപ്പ് തുറക്കുന്നു...",
                    footer_note: "തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം ഒരു രജിസ്റ്റേഡ് മത-ധർമ്മസ്ഥാപനമാണ്. എല്ലാ സംഭാവനകളും ക്ഷേത്രകാര്യങ്ങൾക്ക് സുതാര്യമായി ഉപയോഗിക്കുന്നു."
                }
            },
            pooja_schedule: {
                badge: "പൂജാ ക്രമം",
                title: "പ്രതിദിന പൂജാ സമയക്രമം",
                subtitle: "ശ്രീ സുബ്രഹ്മണ്യസ്വാമി സന്നിധിയിൽ പ്രതിദിനം അനുഷ്ഠിക്കുന്ന താന്ത്രിക പൂജാവിധികൾ",
                morning_session: "രാവിലത്തെ നിർമ്മാല്യവും പൂജകളും",
                evening_session: "വൈകുന്നേരത്തെ സന്ധ്യാപൂജയും ദീപാരാധനയും",
                special_days_title: "വിശേഷാൽ പൂജാ ദിനങ്ങൾ",
                special_days_desc: "സ്കന്ദഷഷ്ഠി, തൈപ്പൂയം, പ്രദോഷം, ചൊവ്വാഴ്ചകൾ, മാസത്തിലെ ഒന്നാം തീയതി എന്നിവയിൽ വിശേഷാൽ അഭിഷേകങ്ങളും കാവടിയാട്ടവും ദീർഘിപ്പിച്ച ദർശനസമയവും ഉണ്ടായിരിക്കുന്നതാണ്.",
                events: [
                    { time: "05:00 AM", name: "നടതുറക്കലും നിർമ്മാല്യ ദർശനവും", desc: "ശംഖനാദത്തോടെ തിരുനട തുറക്കുന്നു; തലേന്നത്തെ അലങ്കാരങ്ങളോടെയുള്ള ഭഗവാന്റെ പുണ്യ നിർമ്മാല്യ ദർശനം." },
                    { time: "05:30 AM", name: "ഉഷഃപൂജ, അഭിഷേകം & ഗണപതി ഹോമം", desc: "തീർത്ഥജലവും വിശുദ്ധ പാലും കൊണ്ടുള്ള അഭിഷേകം, ഗണപതി സന്നിധിയിൽ വിഘ്നനിവാരണ ഹോമം." },
                    { time: "08:30 AM", name: "എതൃത്ത പൂജയും പന്തീരടിയും", desc: "പുഷ്പാർച്ചനയും മലർ നിവേദ്യവും കൊണ്ടുള്ള പ്രഭാത പൂജകൾ." },
                    { time: "10:00 AM", name: "ഉച്ചപൂജയും മഹാ നിവേദ്യവും", desc: "മധുരപായസ നിവേദ്യത്തോടെയുള്ള മദ്ധ്യാഹ്ന മഹാപൂജയും മംഗളാരതിയും." },
                    { time: "10:30 AM", name: "ഉച്ചയ്ക്ക് നടയടപ്പ്", desc: "ഉച്ചപൂജ പൂർത്തിയാക്കി തിരുനട അടയ്ക്കുന്നു." },
                    { time: "05:30 PM", name: "സന്ധ്യയ്ക്ക് നടതുറക്കൽ", desc: "വൈകുന്നേരത്തെ ആരാധനകൾക്കായി ദീപങ്ങൾ തെളിയിച്ചു തിരുനട തുറക്കുന്നു." },
                    { time: "06:45 PM", name: "സന്ധ്യാ ദീപാരാധന", desc: "മണിനാദവും തട്ടവിളക്കുകളും കർപ്പൂരദീപങ്ങളും കൊണ്ടുള്ള ഭക്തിസാന്ദ്രമായ ദീപാരാധന." },
                    { time: "07:30 PM", name: "അത്താഴപൂജ", desc: "രാത്രിയിലെ നിവേദ്യ സമർപ്പണവും മന്ത്രജപങ്ങളും." },
                    { time: "08:00 PM", name: "തൃപ്പുക & ശ്രീകോവിൽ നടയടപ്പ്", desc: "അഷ്ടഗന്ധ ധൂപ സമർപ്പണത്തോടെ (തൃപ്പുക) ഭഗവാനെ ധ്യാനിച്ച് രാത്രി തിരുനട അടയ്ക്കുന്നു." }
                ]
            },
            dress_code: {
                badge: "ക്ഷേത്ര മര്യാദകൾ",
                title: "ക്ഷേത്ര ആചാരങ്ങളും വസ്ത്രധാരണവും",
                subtitle: "ക്ഷേത്രത്തിന്റെ ആത്മീയ പവിത്രതയും പരമ്പരാഗത കേരളീയ ആചാരങ്ങളും സംരക്ഷിക്കാം",
                gents_title: "പുരുഷന്മാർ",
                gents_rule1: "പരമ്പരാഗത മുണ്ട് ധരിക്കേണ്ടതാണ്.",
                gents_rule2: "ചുറ്റമ്പലത്തിനകത്ത് പ്രവേശിക്കുമ്പോൾ ഷർട്ട്, ബനിയൻ, കോട്ട്, തൊപ്പി എന്നിവ ഒഴിവാക്കേണ്ടതാണ്.",
                gents_rule3: "ലുങ്കി, പാന്റ്സ്, ജീൻസ് എന്നിവ നാലമ്പലത്തിനകത്ത് കർശനമായി ഒഴിവാക്കുക.",
                ladies_title: "സ്ത്രീകൾ",
                ladies_rule1: "സാരി, സെറ്റ് മുണ്ട്, ദാവണി, അല്ലെങ്കിൽ മാന്യമായ ചുരിദാർ/സൽവാർ (ദുപ്പട്ട സഹിതം) ധരിക്കുക.",
                ladies_rule2: "ജീൻസ്, സ്കർട്ട്, സ്ലീവ്‌ലെസ് തുടങ്ങിയ വസ്ത്രങ്ങൾ ശ്രീകോവിൽ പരിസരത്ത് ഒഴിവാക്കേണ്ടതാണ്.",
                sanctum_title: "ക്ഷേത്ര പെരുമാറ്റച്ചട്ടങ്ങൾ",
                rule_footwear: "പാദരക്ഷകൾ ഒഴിവാക്കുക",
                rule_footwear_desc: "ക്ഷേത്ര മതിലകത്തിന് പുറത്തുള്ള കൗണ്ടറിൽ പാദരക്ഷകൾ ഊരിവെക്കുക.",
                rule_mobile: "മൊബൈൽ ഫോൺ & ഫോട്ടോഗ്രാഫി",
                rule_mobile_desc: "ശ്രീകോവിലിനകത്തും നാലമ്പലത്തിലും ഫോട്ടോ, വീഡിയോ ചിത്രീകരണം കർശനമായി നിരോധിച്ചിരിക്കുന്നു. ഫോൺ സൈലന്റിൽ ഇടുക.",
                rule_purity: "ശരീരശുദ്ധി & സ്നാനം",
                rule_purity_desc: "ശുദ്ധിയോടെ സ്നാനം ചെയ്ത് ഭക്തിപൂർവ്വം ക്ഷേത്രദർശനം നടത്തുക.",
                rule_silence: "ശാന്തിയും മൗനവും പാലിക്കുക",
                rule_silence_desc: "ക്ഷേത്രത്തിനകത്ത് അനാവശ്യ സംഭാഷണങ്ങൾ ഒഴിവാക്കി നാമജപത്തിൽ മുഴുകുക ('ഓം ശരവണഭവായ നമഃ')."
            },
            administration: {
                badge: "ക്ഷേത്ര ഭരണം",
                title: "ഭരണസമിതിയും ജീവനക്കാരും",
                subtitle: "ക്ഷേത്രത്തിന്റെ താന്ത്രിക ആചാരങ്ങളും ഭരണനിർവ്വഹണവും നടത്തുന്ന സമിതി അംഗങ്ങൾ",
                spiritual_title: "താന്ത്രിക & ആചാര്യ സ്ഥാനങ്ങൾ",
                tantri_role: "തന്ത്രി (മുഖ്യ താന്ത്രികാചാര്യൻ)",
                tantri_name: "ബ്രഹ്മശ്രീ കണ്ഠരര് മഹേശ്വരര് താന്ത്രികൾ (കുടുംബ പാരമ്പര്യം)",
                tantri_desc: "ക്ഷേത്രത്തിലെ വൈദിക-താന്ത്രിക പൂജാവിധികളും പ്രതിഷ്ഠാ ദിനാചരണങ്ങളും നിയന്ത്രിക്കുന്ന പരമോന്നത ആചാര്യൻ.",
                melsanthi_role: "മേൽശാന്തി (മുഖ്യ പൂജാരി)",
                melsanthi_name: "ശ്രീധരൻ നമ്പൂതിരി",
                melsanthi_desc: "നിത്യേനയുള്ള നിർമ്മാല്യം, അഭിഷേകങ്ങൾ, ഉച്ചപൂജ, സന്ധ്യാ ദീപാരാധന എന്നിവ നിർവ്വഹിക്കുന്ന മുഖ്യ പൂജാരി.",
                board_title: "ദേവസ്വം ട്രസ്റ്റ് ഭരണസമിതി",
                president_role: "പ്രസിഡന്റ്",
                president_name: "ശ്രീ. കെ. രാധാകൃഷ്ണപിള്ള",
                secretary_role: "ജനറൽ സെക്രട്ടറി",
                secretary_name: "ശ്രീ. എം. സുരേഷ് കുമാർ",
                treasurer_role: "ട്രഷറർ",
                treasurer_name: "ശ്രീ. വി. നാരായണൻ ആചാരി",
                vp_role: "വൈസ് പ്രസിഡന്റ്",
                vp_name: "ശ്രീ. പി. ഗോപാലകൃഷ്ണൻ നായർ",
                joint_sec_role: "ജോയിന്റ് സെക്രട്ടറി",
                joint_sec_name: "ശ്രീ. രാജേന്ദ്രൻ പിള്ള",
                advisory_title: "ഉപദേശക സമിതി & സേവാ സമിതി",
                advisory_desc: "ക്ഷേത്രോത്സവങ്ങളും വികസന പ്രവർത്തനങ്ങളും സുതാര്യമായി ഏകോപിപ്പിക്കുന്ന 15 അംഗ ഭക്തജന സമിതി.",
                trust_reg_title: "നിയമപരമായ രജിസ്ട്രേഷൻ",
                trust_reg_desc: "തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ടെമ്പിൾ ട്രസ്റ്റ് തിരുവിതാംകൂർ-കൊച്ചി ചാരിറ്റബിൾ സൊസൈറ്റീസ് ആക്ട് പ്രകാരം രജിസ്റ്റർ ചെയ്ത പബ്ലിക് ചാരിറ്റബിൾ ട്രസ്റ്റാണ് (സ്ഥാപിതം 1952).",
                office_hours: "ഓഫീസ് സമയം: ദിവസവും രാവിലെ 08:00 – 12:30 & വൈകിട്ട് 04:30 – 07:30 | ഹെൽപ്പ്‌ലൈൻ: +91 94007 88358"
            },
            vazhipadu_booking: {
                modal_title: "വഴിപാട് ബുക്കിംഗ്",
                devotee_name: "ഭക്തന്റെ പൂർണ്ണ നാമം",
                devotee_name_placeholder: "സങ്കൽപ്പത്തിന് വേണ്ട ഭക്തന്റെ പേര് നൽകുക",
                nakshatram: "ജന്മ നക്ഷത്രം",
                nakshatram_select: "നക്ഷത്രം തിരഞ്ഞെടുക്കുക",
                pooja_date: "പൂജ നടത്തേണ്ട തീയതി",
                gotram: "ഗോത്രം / ഇല്ലപ്പേര് (ഐച്ഛികം)",
                gotram_placeholder: "ഉദാ: ശിവ ഗോത്രം",
                phone: "വാട്സാപ്പ് / ഫോൺ നമ്പർ",
                phone_placeholder: "+91 98765 43210",
                prasadam_mode: "പ്രസാദ വിതരണം",
                mode_counter: "ക്ഷേത്ര കൗണ്ടറിൽ നിന്ന് നേരിട്ട് കൈപ്പറ്റും",
                mode_postal: "സ്പീഡ് പോസ്റ്റിൽ ലഭിക്കണം",
                submit_whatsapp: "വിവരങ്ങൾ സ്ഥിരീകരിച്ചു വാട്സാപ്പിൽ ബുക്ക് ചെയ്യുക",
                contact_office: "ക്ഷേത്ര ഓഫീസുമായി ബന്ധപ്പെടുക",
                validation_alert: "ദയവായി ഭക്തന്റെ പേര്, നക്ഷത്രം, പൂജ തീയതി എന്നിവ രേഖപ്പെടുത്തുക.",
                benefit: "വഴിപാട് ഫലം",
                timing_note: "പ്രതിദിന പൂജാ സമയങ്ങളിൽ ഭഗവാന്റെ തിരുമുമ്പിൽ അർപ്പിക്കുന്നു."
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
                address: "തുറയിൽകുന്ന്, മരു: സൗത്ത്, കരുനാഗപ്പള്ളി, കൊല്ലം, കേരളം - 690573",
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

const syncHtmlLang = (lng) => {
    if (typeof document !== 'undefined') {
        document.documentElement.lang = lng;
        document.documentElement.classList.toggle('lang-ml', lng === 'ml');
    }
};

i18n.on('languageChanged', syncHtmlLang);
syncHtmlLang(i18n.language || 'en');

export default i18n;
