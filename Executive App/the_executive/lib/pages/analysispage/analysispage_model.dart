import '/auth/supabase_auth/auth_util.dart';
import '/backend/gemini/gemini.dart';
import '/backend/supabase/supabase.dart';
import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'dart:ui';
import '/index.dart';
import 'analysispage_widget.dart' show AnalysispageWidget;
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

class AnalysispageModel extends FlutterFlowModel<AnalysispageWidget> {
  ///  State fields for stateful widgets in this page.

  // Stores action output result for [Gemini - Generate Text] action in analysispage widget.
  String? biforgetAudio;
  // Stores action output result for [Gemini - Generate Text] action in analysispage widget.
  String? dominantEmotion;
  // Stores action output result for [Gemini - Generate Text] action in analysispage widget.
  String? improvementSuggetions;

  @override
  void initState(BuildContext context) {}

  @override
  void dispose() {}
}
