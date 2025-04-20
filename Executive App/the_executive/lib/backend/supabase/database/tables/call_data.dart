import '../database.dart';

class CallDataTable extends SupabaseTable<CallDataRow> {
  @override
  String get tableName => 'call_data';

  @override
  CallDataRow createRow(Map<String, dynamic> data) => CallDataRow(data);
}

class CallDataRow extends SupabaseDataRow {
  CallDataRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => CallDataTable();

  int get id => getField<int>('id')!;
  set id(int value) => setField<int>('id', value);

  String get audioUrl => getField<String>('audio_url')!;
  set audioUrl(String value) => setField<String>('audio_url', value);

  String get transcription => getField<String>('transcription')!;
  set transcription(String value) => setField<String>('transcription', value);

  String get emotionAnalysis => getField<String>('emotion_analysis')!;
  set emotionAnalysis(String value) =>
      setField<String>('emotion_analysis', value);

  String get suggestions => getField<String>('suggestions')!;
  set suggestions(String value) => setField<String>('suggestions', value);

  String get email => getField<String>('email')!;
  set email(String value) => setField<String>('email', value);

  DateTime get createdAt => getField<DateTime>('created_at')!;
  set createdAt(DateTime value) => setField<DateTime>('created_at', value);
}
