import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Share,
  Platform,
} from 'react-native';
import { useLanguage } from '@/context/LanguageContext';
import { TEMPLE_NOTICES, TempleNotice } from '@/constants/notices';
import {
  Megaphone,
  Bell,
  BellRing,
  Share2,
  Calendar,
  Phone,
  MessageCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  CheckCircle2,
  Flame,
  Landmark,
  HeartHandshake,
} from 'lucide-react-native';

const CONTAINER_MAX_WIDTH = 640;
const TEMPLE_PHONE = '+919400788358';
const TEMPLE_PHONE_DISPLAY = '+91 94007 88358';

type FilterCategory = 'all' | 'festival' | 'pooja' | 'annadanam' | 'development' | 'general';

export default function NoticesScreen() {
  const { isMalayalam } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNoticeIds, setExpandedNoticeIds] = useState<Record<string, boolean>>({
    n1: true, // Expand first urgent notice by default
  });

  const categories: { key: FilterCategory; labelEn: string; labelMl: string; icon: any }[] = [
    { key: 'all', labelEn: 'All Notices', labelMl: 'എല്ലാം', icon: Megaphone },
    { key: 'festival', labelEn: 'Festivals', labelMl: 'ഉത്സവങ്ങൾ', icon: Sparkles },
    { key: 'pooja', labelEn: 'Poojas', labelMl: 'പൂജകൾ', icon: Flame },
    { key: 'annadanam', labelEn: 'Annadanam', labelMl: 'അന്നദാനം', icon: HeartHandshake },
    { key: 'development', labelEn: 'Development', labelMl: 'വികസനം', icon: Landmark },
    { key: 'general', labelEn: 'General', labelMl: 'പൊതുവായവ', icon: Info },
  ];

  const filteredNotices = useMemo(() => {
    return TEMPLE_NOTICES.filter((notice) => {
      const matchesCategory =
        selectedCategory === 'all' || notice.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      const title = (isMalayalam ? notice.titleMl : notice.titleEn).toLowerCase();
      const summary = (isMalayalam ? notice.summaryMl : notice.summaryEn).toLowerCase();
      const tag = (isMalayalam ? notice.tagMl : notice.tagEn).toLowerCase();
      return title.includes(query) || summary.includes(query) || tag.includes(query);
    });
  }, [selectedCategory, searchQuery, isMalayalam]);

  const toggleExpand = (id: string) => {
    setExpandedNoticeIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleWhatsAppAction = (notice: TempleNotice) => {
    const msg = isMalayalam
      ? notice.whatsappMessageMl || notice.whatsappMessageEn || 'സ്വാമി ശരണം!'
      : notice.whatsappMessageEn || notice.whatsappMessageMl || 'Swami Saranam!';
    const url = `https://wa.me/${TEMPLE_PHONE}?text=${encodeURIComponent(msg)}`;
    Linking.openURL(url);
  };

  const handleShareNotice = async (notice: TempleNotice) => {
    const title = isMalayalam ? notice.titleMl : notice.titleEn;
    const summary = isMalayalam ? notice.summaryMl : notice.summaryEn;
    const date = isMalayalam ? notice.dateMl : notice.dateEn;
    const shareText = `📢 *തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം അറിയിപ്പ്* 📢\n\n📌 *${title}*\n🗓 ${date}\n\n${summary}\n\nകൂടുതൽ വിവരങ്ങൾക്ക്: ${TEMPLE_PHONE_DISPLAY}\nസ്വാമി ശരണം! ✨`;

    try {
      if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: title,
          text: shareText,
        });
      } else {
        await Share.share({
          message: shareText,
          title: title,
        });
      }
    } catch {
      // User dismissed or share not supported
    }
  };

  const handlePhoneCall = () => {
    Linking.openURL(`tel:${TEMPLE_PHONE}`);
  };

  const handleOfficeWhatsApp = () => {
    const msg = isMalayalam
      ? 'സ്വാമി ശരണം! തുറയിൽകുന്ന് ക്ഷേത്ര അറിയിപ്പുകളെ സംബന്ധിച്ച് അറിയാൻ ആഗ്രഹിക്കുന്നു.'
      : 'Swami Saranam! I would like to inquire about temple notices and events.';
    Linking.openURL(`https://wa.me/${TEMPLE_PHONE}?text=${encodeURIComponent(msg)}`);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.centerWrapper}>
        {/* Header Hero Banner */}
        <View style={styles.heroCard}>
          <View style={styles.heroBadgeRow}>
            <View style={styles.heroBadge}>
              <BellRing size={13} color="#F59E0B" />
              <Text style={styles.heroBadgeText}>
                {isMalayalam ? 'ഔദ്യോഗിക അറിയിപ്പുകൾ' : 'OFFICIAL ANNOUNCEMENTS'}
              </Text>
            </View>
            <View style={styles.livePulseBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.livePulseText}>
                {isMalayalam ? 'തത്സമയം' : 'LIVE'}
              </Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>
            {isMalayalam ? 'ക്ഷേത്ര അറിയിപ്പ് പലക' : 'Temple Notice Board'}
          </Text>
          <Text style={styles.heroSubtitle}>
            {isMalayalam
              ? 'തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രത്തിലെ വിശേഷാൽ പൂജകൾ, ഉത്സവങ്ങൾ, അന്നദാനം, ഭരണസമിതി അറിയിപ്പുകൾ എന്നിവ ഇവിടെ തത്സമയം അറിയാം.'
              : 'Stay informed with real-time updates on festivals, special poojas, Annadanam drives, and administrative announcements from Thurayilkunnu Temple.'}
          </Text>

          {/* Quick Stat Pill */}
          <View style={styles.statPillRow}>
            <View style={styles.statPill}>
              <Calendar size={13} color="#D97706" />
              <Text style={styles.statPillText}>
                {isMalayalam ? 'കൊല്ലവർഷം 1201' : 'Malayalam Era 1201'}
              </Text>
            </View>
            <View style={styles.statPill}>
              <Megaphone size={13} color="#D97706" />
              <Text style={styles.statPillText}>
                {TEMPLE_NOTICES.length} {isMalayalam ? 'അറിയിപ്പുകൾ' : 'Circulars'}
              </Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={16} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={
              isMalayalam
                ? 'അറിയിപ്പുകൾ തിരയുക (ഉത്സവം, പൂജ, അന്നദാനം)...'
                : 'Search circulars (festival, pooja, annadanam)...'
            }
            placeholderTextColor="#78716C"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearchBtn}>
              <Text style={styles.clearSearchText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Category Horizontal Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterChipScroll}
          style={styles.filterChipContainer}
        >
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isSelected = selectedCategory === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                style={[styles.filterChip, isSelected && styles.filterChipActive]}
                onPress={() => setSelectedCategory(cat.key)}
                activeOpacity={0.8}
              >
                <IconComponent
                  size={13}
                  color={isSelected ? '#1C1917' : '#D97706'}
                />
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected && styles.filterChipTextActive,
                  ]}
                >
                  {isMalayalam ? cat.labelMl : cat.labelEn}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Notice List */}
        <View style={styles.noticeList}>
          {filteredNotices.length === 0 ? (
            <View style={styles.emptyCard}>
              <Info size={32} color="#78716C" />
              <Text style={styles.emptyTitle}>
                {isMalayalam ? 'അറിയിപ്പുകൾ ഒന്നും കണ്ടെത്തിയില്ല' : 'No Circulars Found'}
              </Text>
              <Text style={styles.emptyDesc}>
                {isMalayalam
                  ? 'മറ്റ് വിഭാഗങ്ങളിലോ തിരച്ചിൽ വാക്കുകളിലോ പരിശോധിക്കുക.'
                  : 'Try selecting a different category or clearing your search term.'}
              </Text>
              <TouchableOpacity
                style={styles.resetFilterBtn}
                onPress={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                <Text style={styles.resetFilterBtnText}>
                  {isMalayalam ? 'എല്ലാ അറിയിപ്പുകളും കാണുക' : 'Show All Notices'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredNotices.map((notice, index) => {
              const isExpanded = !!expandedNoticeIds[notice.id];
              const isUrgent = notice.isUrgent;

              return (
                <View
                  key={notice.id}
                  style={[
                    styles.noticeCard,
                    isUrgent && styles.noticeCardUrgent,
                  ]}
                >
                  {/* Top Bar with Badges */}
                  <View style={styles.cardHeader}>
                    <View style={styles.cardTagRow}>
                      <View
                        style={[
                          styles.categoryTag,
                          notice.category === 'festival' && styles.tagFestival,
                          notice.category === 'pooja' && styles.tagPooja,
                          notice.category === 'annadanam' && styles.tagAnnadanam,
                          notice.category === 'development' && styles.tagDevelopment,
                        ]}
                      >
                        <Text style={styles.categoryTagText}>
                          {isMalayalam ? notice.tagMl : notice.tagEn}
                        </Text>
                      </View>

                      {notice.isNew && (
                        <View style={styles.newBadge}>
                          <Text style={styles.newBadgeText}>
                            {isMalayalam ? 'പുതിയത്' : 'NEW'}
                          </Text>
                        </View>
                      )}

                      {isUrgent && (
                        <View style={styles.urgentBadge}>
                          <Bell size={10} color="#FFFFFF" />
                          <Text style={styles.urgentBadgeText}>
                            {isMalayalam ? 'പ്രധാനം' : 'URGENT'}
                          </Text>
                        </View>
                      )}
                    </View>

                    <Text style={styles.noticeDate}>
                      {isMalayalam ? notice.dateMl : notice.dateEn}
                    </Text>
                  </View>

                  {/* Title */}
                  <Text style={styles.noticeTitle}>
                    {isMalayalam ? notice.titleMl : notice.titleEn}
                  </Text>

                  {/* Summary */}
                  <Text style={styles.noticeSummary}>
                    {isMalayalam ? notice.summaryMl : notice.summaryEn}
                  </Text>

                  {/* Expandable Details */}
                  {isExpanded && (
                    <View style={styles.expandedDetailsBox}>
                      <View style={styles.detailsHeader}>
                        <CheckCircle2 size={13} color="#F59E0B" />
                        <Text style={styles.detailsHeaderText}>
                          {isMalayalam ? 'വിശദ വിവരങ്ങൾ' : 'Detailed Announcement'}
                        </Text>
                      </View>
                      <Text style={styles.noticeDetailsText}>
                        {isMalayalam ? notice.detailsMl : notice.detailsEn}
                      </Text>
                    </View>
                  )}

                  {/* Action Buttons Row */}
                  <View style={styles.cardActionsRow}>
                    <TouchableOpacity
                      style={styles.expandToggleBtn}
                      onPress={() => toggleExpand(notice.id)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.expandToggleText}>
                        {isExpanded
                          ? isMalayalam
                            ? 'ചുരുക്കുക'
                            : 'Show Less'
                          : isMalayalam
                          ? 'കൂടുതൽ വിവരങ്ങൾ'
                          : 'Read More'}
                      </Text>
                      {isExpanded ? (
                        <ChevronUp size={14} color="#D97706" />
                      ) : (
                        <ChevronDown size={14} color="#D97706" />
                      )}
                    </TouchableOpacity>

                    <View style={styles.actionButtonsGroup}>
                      <TouchableOpacity
                        style={styles.shareBtn}
                        onPress={() => handleShareNotice(notice)}
                        activeOpacity={0.8}
                        accessibilityLabel="Share Notice"
                      >
                        <Share2 size={14} color="#FCD34D" />
                      </TouchableOpacity>

                      {notice.actionTextEn && (
                        <TouchableOpacity
                          style={styles.primaryActionBtn}
                          onPress={() => handleWhatsAppAction(notice)}
                          activeOpacity={0.85}
                        >
                          <MessageCircle size={13} color="#1C1917" />
                          <Text style={styles.primaryActionBtnText}>
                            {isMalayalam
                              ? notice.actionTextMl || 'വിവരങ്ങൾക്ക്'
                              : notice.actionTextEn || 'Inquire'}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </View>

        {/* Help & Contact Notice Board Section */}
        <View style={styles.contactCard}>
          <View style={styles.contactHeader}>
            <Megaphone size={18} color="#F59E0B" />
            <Text style={styles.contactTitle}>
              {isMalayalam ? 'ക്ഷേത്ര ഭരണസമിതി ഓഫീസ്' : 'Temple Administration Office'}
            </Text>
          </View>
          <Text style={styles.contactSubtitle}>
            {isMalayalam
              ? 'ക്ഷേത്രത്തിലെ പൂജകൾ, വഴിപാടുകൾ, ഉത്സവങ്ങൾ, വിവാഹ ബുക്കിംഗ് എന്നിവയെക്കുറിച്ചുള്ള നേരിട്ടുള്ള വിവരങ്ങൾക്ക് ഓഫീസുമായി ബന്ധപ്പെടാം.'
              : 'For personalized inquiries, pooja bookings, festival sponsorships, or notice publication, reach out to the Devaswom office.'}
          </Text>

          <View style={styles.contactTimingsRow}>
            <Calendar size={13} color="#9CA3AF" />
            <Text style={styles.contactTimingText}>
              {isMalayalam
                ? 'ദർശന സമയം: 05:00 AM – 12:00 PM | 05:00 PM – 08:00 PM'
                : 'Darshan Hours: 05:00 AM – 12:00 PM | 05:00 PM – 08:00 PM'}
            </Text>
          </View>

          <View style={styles.contactButtonRow}>
            <TouchableOpacity
              style={styles.callBtn}
              onPress={handlePhoneCall}
              activeOpacity={0.8}
            >
              <Phone size={14} color="#FCD34D" />
              <Text style={styles.callBtnText}>
                {TEMPLE_PHONE_DISPLAY}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.whatsappHelpBtn}
              onPress={handleOfficeWhatsApp}
              activeOpacity={0.8}
            >
              <MessageCircle size={14} color="#1C1917" />
              <Text style={styles.whatsappHelpBtnText}>
                {isMalayalam ? 'WhatsApp സഹായം' : 'WhatsApp Desk'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0A09',
  },
  scrollContent: {
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  centerWrapper: {
    width: '100%',
    maxWidth: CONTAINER_MAX_WIDTH,
  },

  /* Hero Card */
  heroCard: {
    backgroundColor: '#1C1917',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.3)',
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 119, 6, 0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
  },
  heroBadgeText: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  livePulseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 5,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  livePulseText: {
    color: '#10B981',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: '#FEF3C7',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  heroSubtitle: {
    color: '#D6D3D1',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
  },
  statPillRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#292524',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(120, 113, 108, 0.3)',
  },
  statPillText: {
    color: '#E7E5E4',
    fontSize: 11,
    fontWeight: '600',
  },

  /* Search Bar */
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1917',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(120, 113, 108, 0.35)',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#F5F5F4',
    fontSize: 13,
    paddingVertical: 0,
  },
  clearSearchBtn: {
    padding: 4,
  },
  clearSearchText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  /* Category Filter Chips */
  filterChipContainer: {
    marginBottom: 16,
  },
  filterChipScroll: {
    gap: 8,
    paddingRight: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1917',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.3)',
  },
  filterChipActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#FCD34D',
  },
  filterChipText: {
    color: '#E7E5E4',
    fontSize: 12,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#1C1917',
    fontWeight: '800',
  },

  /* Notice List */
  noticeList: {
    gap: 14,
    marginBottom: 20,
  },
  noticeCard: {
    backgroundColor: '#1C1917',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.22)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  noticeCardUrgent: {
    borderColor: 'rgba(245, 158, 11, 0.55)',
    backgroundColor: '#201A15',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  cardTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  categoryTag: {
    backgroundColor: 'rgba(217, 119, 6, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.3)',
  },
  tagFestival: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  tagPooja: {
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    borderColor: 'rgba(249, 115, 22, 0.4)',
  },
  tagAnnadanam: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  tagDevelopment: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderColor: 'rgba(59, 130, 246, 0.4)',
  },
  categoryTagText: {
    color: '#FCD34D',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  newBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '800',
  },
  urgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 3,
  },
  urgentBadgeText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '800',
  },
  noticeDate: {
    color: '#A8A29E',
    fontSize: 11,
    fontWeight: '500',
  },
  noticeTitle: {
    color: '#FEF3C7',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 8,
  },
  noticeSummary: {
    color: '#D6D3D1',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },

  /* Expanded Details */
  expandedDetailsBox: {
    backgroundColor: 'rgba(41, 37, 36, 0.7)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  detailsHeaderText: {
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  noticeDetailsText: {
    color: '#E7E5E4',
    fontSize: 12.5,
    lineHeight: 19,
  },

  /* Card Actions */
  cardActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(120, 113, 108, 0.2)',
    flexWrap: 'wrap',
    gap: 8,
  },
  expandToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  expandToggleText: {
    color: '#D97706',
    fontSize: 11.5,
    fontWeight: '700',
  },
  actionButtonsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  shareBtn: {
    backgroundColor: 'rgba(217, 119, 6, 0.2)',
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(252, 211, 77, 0.3)',
  },
  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 5,
  },
  primaryActionBtnText: {
    color: '#1C1917',
    fontSize: 11.5,
    fontWeight: '800',
  },

  /* Empty State */
  emptyCard: {
    backgroundColor: '#1C1917',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(120, 113, 108, 0.3)',
  },
  emptyTitle: {
    color: '#FEF3C7',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 6,
  },
  emptyDesc: {
    color: '#A8A29E',
    fontSize: 12.5,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  resetFilterBtn: {
    backgroundColor: '#292524',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D97706',
  },
  resetFilterBtnText: {
    color: '#FCD34D',
    fontSize: 12,
    fontWeight: '700',
  },

  /* Office Help Card */
  contactCard: {
    backgroundColor: '#1C1917',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.35)',
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  contactTitle: {
    color: '#FEF3C7',
    fontSize: 16,
    fontWeight: '700',
  },
  contactSubtitle: {
    color: '#D6D3D1',
    fontSize: 12.5,
    lineHeight: 18,
    marginBottom: 12,
  },
  contactTimingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#292524',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    marginBottom: 14,
  },
  contactTimingText: {
    color: '#E7E5E4',
    fontSize: 11,
    fontWeight: '500',
  },
  contactButtonRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  callBtn: {
    flex: 1,
    minWidth: 140,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(217, 119, 6, 0.25)',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(252, 211, 77, 0.4)',
  },
  callBtnText: {
    color: '#FCD34D',
    fontSize: 12,
    fontWeight: '700',
  },
  whatsappHelpBtn: {
    flex: 1,
    minWidth: 140,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59E0B',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 6,
  },
  whatsappHelpBtnText: {
    color: '#1C1917',
    fontSize: 12,
    fontWeight: '800',
  },
});
