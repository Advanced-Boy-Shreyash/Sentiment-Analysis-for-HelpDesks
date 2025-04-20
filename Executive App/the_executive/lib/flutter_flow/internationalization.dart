import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

const _kLocaleStorageKey = '__locale_key__';

class FFLocalizations {
  FFLocalizations(this.locale);

  final Locale locale;

  static FFLocalizations of(BuildContext context) =>
      Localizations.of<FFLocalizations>(context, FFLocalizations)!;

  static List<String> languages() => ['en', 'mr', 'hi'];

  static late SharedPreferences _prefs;
  static Future initialize() async =>
      _prefs = await SharedPreferences.getInstance();
  static Future storeLocale(String locale) =>
      _prefs.setString(_kLocaleStorageKey, locale);
  static Locale? getStoredLocale() {
    final locale = _prefs.getString(_kLocaleStorageKey);
    return locale != null && locale.isNotEmpty ? createLocale(locale) : null;
  }

  String get languageCode => locale.toString();
  String? get languageShortCode =>
      _languagesWithShortCode.contains(locale.toString())
          ? '${locale.toString()}_short'
          : null;
  int get languageIndex => languages().contains(languageCode)
      ? languages().indexOf(languageCode)
      : 0;

  String getText(String key) =>
      (kTranslationsMap[key] ?? {})[locale.toString()] ?? '';

  String getVariableText({
    String? enText = '',
    String? mrText = '',
    String? hiText = '',
  }) =>
      [enText, mrText, hiText][languageIndex] ?? '';

  static const Set<String> _languagesWithShortCode = {
    'ar',
    'az',
    'ca',
    'cs',
    'da',
    'de',
    'dv',
    'en',
    'es',
    'et',
    'fi',
    'fr',
    'gr',
    'he',
    'hi',
    'hu',
    'it',
    'km',
    'ku',
    'mn',
    'ms',
    'no',
    'pt',
    'ro',
    'ru',
    'rw',
    'sv',
    'th',
    'uk',
    'vi',
  };
}

/// Used if the locale is not supported by GlobalMaterialLocalizations.
class FallbackMaterialLocalizationDelegate
    extends LocalizationsDelegate<MaterialLocalizations> {
  const FallbackMaterialLocalizationDelegate();

  @override
  bool isSupported(Locale locale) => _isSupportedLocale(locale);

  @override
  Future<MaterialLocalizations> load(Locale locale) async =>
      SynchronousFuture<MaterialLocalizations>(
        const DefaultMaterialLocalizations(),
      );

  @override
  bool shouldReload(FallbackMaterialLocalizationDelegate old) => false;
}

/// Used if the locale is not supported by GlobalCupertinoLocalizations.
class FallbackCupertinoLocalizationDelegate
    extends LocalizationsDelegate<CupertinoLocalizations> {
  const FallbackCupertinoLocalizationDelegate();

  @override
  bool isSupported(Locale locale) => _isSupportedLocale(locale);

  @override
  Future<CupertinoLocalizations> load(Locale locale) =>
      SynchronousFuture<CupertinoLocalizations>(
        const DefaultCupertinoLocalizations(),
      );

  @override
  bool shouldReload(FallbackCupertinoLocalizationDelegate old) => false;
}

class FFLocalizationsDelegate extends LocalizationsDelegate<FFLocalizations> {
  const FFLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) => _isSupportedLocale(locale);

  @override
  Future<FFLocalizations> load(Locale locale) =>
      SynchronousFuture<FFLocalizations>(FFLocalizations(locale));

  @override
  bool shouldReload(FFLocalizationsDelegate old) => false;
}

Locale createLocale(String language) => language.contains('_')
    ? Locale.fromSubtags(
        languageCode: language.split('_').first,
        scriptCode: language.split('_').last,
      )
    : Locale(language);

bool _isSupportedLocale(Locale locale) {
  final language = locale.toString();
  return FFLocalizations.languages().contains(
    language.endsWith('_')
        ? language.substring(0, language.length - 1)
        : language,
  );
}

final kTranslationsMap = <Map<String, Map<String, String>>>[
  // uploadpage
  {
    'qzcykyyk': {
      'en': 'Select Audio File',
      'hi': 'ऑडियो फ़ाइल चुनें',
      'mr': 'ऑडिओ फाइल निवडा',
    },
    'xspqw780': {
      'en':
          'Choose an audio file (.mp3, .wav) to upload for sentiment analysis',
      'hi':
          'भावना विश्लेषण के लिए अपलोड करने हेतु एक ऑडियो फ़ाइल (.mp3, .wav) चुनें',
      'mr':
          'भावना विश्लेषणासाठी अपलोड करण्यासाठी एक ऑडिओ फाइल (.mp3, .wav) निवडा.',
    },
    '9rpr2hvf': {
      'en': 'Tap to select audio file',
      'hi': 'ऑडियो फ़ाइल चुनने के लिए टैप करें',
      'mr': 'ऑडिओ फाइल निवडण्यासाठी टॅप करा',
    },
    '5ngzqkfu': {
      'en': 'OR',
      'hi': '',
      'mr': '',
    },
    'wc8wl5sc': {
      'en': 'View Call History',
      'hi': '',
      'mr': '',
    },
    '89dyqhl5': {
      'en': 'Submit for Analysis',
      'hi': 'विश्लेषण के लिए सबमिट करें',
      'mr': 'विश्लेषणासाठी सबमिट करा',
    },
    'e3182w2g': {
      'en': 'Upload',
      'hi': 'अपलोड करें',
      'mr': 'अपलोड करा',
    },
    'l4rwv36s': {
      'en': 'Logout',
      'hi': '',
      'mr': '',
    },
  },
  // analysispage
  {
    'l0xrt3ui': {
      'en': 'Call Analysis',
      'hi': '',
      'mr': '',
    },
    'zr0gla1t': {
      'en': 'Logout',
      'hi': '',
      'mr': '',
    },
    'n3n60jfe': {
      'en': 'Call Transcript',
      'hi': 'कॉल ट्रांसक्रिप्ट',
      'mr': 'कॉल ट्रान्सक्रिप्ट',
    },
    'o3gl3088': {
      'en': 'Dominant Emotions',
      'hi': 'प्रबल भावनाएँ',
      'mr': 'प्रभावी भावना',
    },
    'l7ck68bd': {
      'en': 'Executive Suggestions',
      'hi': 'कार्यकारी सुझाव',
      'mr': 'कार्यकारी सूचना',
    },
    'iq2zagfa': {
      'en': 'Call History',
      'hi': '',
      'mr': '',
    },
  },
  // loginpage
  {
    '4sy4u1r4': {
      'en': 'Welcome Back',
      'hi': '',
      'mr': '',
    },
    '0apvg6kz': {
      'en': 'Sign in to continue your journey',
      'hi': '',
      'mr': '',
    },
    '20e2izic': {
      'en': 'Email',
      'hi': '',
      'mr': '',
    },
    'oviuif5z': {
      'en': 'Password',
      'hi': '',
      'mr': '',
    },
    '815r17h8': {
      'en': 'Forgot Password?',
      'hi': '',
      'mr': '',
    },
    'is7167ej': {
      'en': 'Sign In',
      'hi': '',
      'mr': '',
    },
    'dtpm6o5t': {
      'en': '....',
      'hi': '',
      'mr': '',
    },
  },
  // CreateAccount3
  {
    'yz34rpq0': {
      'en': 'brand.ai',
      'hi': '',
      'mr': '',
    },
    'v2r26rdw': {
      'en': 'Get Started',
      'hi': '',
      'mr': '',
    },
    'f4s6ntad': {
      'en': 'Let\'s get started by filling out the form below.',
      'hi': '',
      'mr': '',
    },
    '22dk5c7v': {
      'en': 'Name',
      'hi': '',
      'mr': '',
    },
    '76htfoka': {
      'en': 'Email',
      'hi': '',
      'mr': '',
    },
    '5quw3qh1': {
      'en': 'Password',
      'hi': '',
      'mr': '',
    },
    'aq7rk9mj': {
      'en': 'C-Password',
      'hi': '',
      'mr': '',
    },
    'm3ga8ceu': {
      'en': 'Create Account',
      'hi': '',
      'mr': '',
    },
    'lu09c555': {
      'en': 'Sign in',
      'hi': '',
      'mr': '',
    },
    'am0b749b': {
      'en': 'Home',
      'hi': '',
      'mr': '',
    },
  },
  // callhistory
  {
    '2rympur8': {
      'en': 'Your recent conversations',
      'hi': '',
      'mr': '',
    },
    'f8xxxi81': {
      'en': 'Sarah Johnson',
      'hi': '',
      'mr': '',
    },
    'vrzp7gm8': {
      'en': 'Excited',
      'hi': '',
      'mr': '',
    },
    'my5cfk5m': {
      'en': 'Yesterday, 3:45 PM',
      'hi': '',
      'mr': '',
    },
    'i3ahf7gw': {
      'en': '\"\\\"Sarah',
      'hi': '',
      'mr': '',
    },
    'jv5v28or': {
      'en': 'Michael Chen',
      'hi': '',
      'mr': '',
    },
    'p9xfihlv': {
      'en': 'Concerned',
      'hi': '',
      'mr': '',
    },
    'q5vanlc9': {
      'en': 'Jan 15, 2:20 PM',
      'hi': '',
      'mr': '',
    },
    '2vdt6j4x': {
      'en': '\"\\\"Michael',
      'hi': '',
      'mr': '',
    },
    '8lnmtz00': {
      'en': 'Emily Rodriguez',
      'hi': '',
      'mr': '',
    },
    'nzewtfr0': {
      'en': 'Frustrated',
      'hi': '',
      'mr': '',
    },
    'mtqqvv57': {
      'en': 'Jan 12, 11:05 AM',
      'hi': '',
      'mr': '',
    },
    '37j0sfbi': {
      'en': '\"\\\"Emily',
      'hi': '',
      'mr': '',
    },
    'b3m95cxq': {
      'en': 'David Wilson',
      'hi': '',
      'mr': '',
    },
    '2p7zlmp5': {
      'en': 'Calm',
      'hi': '',
      'mr': '',
    },
    'o9qabh1r': {
      'en': 'Jan 10, 9:15 AM',
      'hi': '',
      'mr': '',
    },
    'etpty27f': {
      'en': '\"\\\"David',
      'hi': '',
      'mr': '',
    },
    '5juofi3d': {
      'en': 'Call History',
      'hi': '',
      'mr': '',
    },
  },
  // historypage
  {
    'zpnrds6l': {
      'en': 'Call Analysis',
      'hi': '',
      'mr': '',
    },
    'n366xt6h': {
      'en': 'Logout',
      'hi': '',
      'mr': '',
    },
    'd1tzv4ul': {
      'en': 'Call Transcript',
      'hi': 'कॉल ट्रांसक्रिप्ट',
      'mr': 'कॉल ट्रान्सक्रिप्ट',
    },
    'fw0w281d': {
      'en': 'Dominant Emotions',
      'hi': 'प्रबल भावनाएँ',
      'mr': 'प्रभावी भावना',
    },
    '6ndo70vb': {
      'en': 'Executive Suggestions',
      'hi': 'कार्यकारी सुझाव',
      'mr': 'कार्यकारी सूचना',
    },
  },
  // Miscellaneous
  {
    'f7wpylhb': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'b2jfbrl8': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'o9zw6ytj': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'pjcgp1f4': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'oia4y048': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'ovqip37j': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'x12wq4mr': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'niw5kk33': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'hu9hfcdn': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'z5p9u9kw': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'wihzrxdo': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'pglin2y1': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'w0zwmp2a': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'fr6hop03': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'atq2ngo4': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'r4q86hn6': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'dslrp5tl': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'ynuqku23': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    '1ma8q4gm': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'l3jdhvgp': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    '2v4r2mud': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    '179309iv': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'zo03mhtf': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    'cjpav6mw': {
      'en': '',
      'hi': '',
      'mr': '',
    },
    '563d9oem': {
      'en': '',
      'hi': '',
      'mr': '',
    },
  },
].reduce((a, b) => a..addAll(b));
