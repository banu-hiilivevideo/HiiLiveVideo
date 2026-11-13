HiiLiveVideo – Full Starter Package
===================================

इस ZIP में क्या है:
- web/index.html : मोबाइल पर खुलने वाला UI प्रोटोटाइप
- server/ : Node.js + Socket.IO signaling server का शुरुआती नमूना
- firebase/firestore.rules : सुरक्षित Firestore rules का शुरुआती नमूना
- firebase/firebase-setup.txt : Firebase सेटअप की सूची

महत्वपूर्ण सच्चाई:
यह अभी तैयार/प्रकाशित APK नहीं है। इसमें वास्तविक OTP/Google login, वास्तविक वीडियो मीडिया,
coins payment या production admin panel सक्रिय नहीं हैं। Server का Socket.IO हिस्सा केवल
कॉल signaling का नमूना है; वीडियो मीडिया के लिए WebRTC के साथ TURN और आम तौर पर SFU
सेवा (जैसे LiveKit/अन्य प्रदाता) जोड़नी होगी।

मोबाइल से अभी क्या कर सकते हैं:
1. ZIP डाउनलोड करके Android File Manager से Extract करें।
2. web/index.html को Chrome में खोलकर डिजाइन देखें।
3. Firebase Console में प्रोजेक्ट बनाएं; निर्देश firebase/firebase-setup.txt में हैं।

Production launch से पहले आवश्यक:
- Firebase project की Android configuration और Google OAuth setup
- OTP/SMS provider configuration और abuse protection
- Authenticated backend APIs तथा admin custom claims
- WebRTC media server/SFU + TURN credentials
- Random matching, block/report, moderation, age/safety protections
- Google Play Billing और server-side purchase verification
- Privacy policy, terms, data deletion process, Play Store compliance
- Android build/signing से APK/AAB बनाना

Admin:
दिखने वाला Admin preview केवल UI है। असली Admin role server-side claim से ही दें।
अपना पासवर्ड/OTP/API key इस चैट या source code में साझा न करें।
