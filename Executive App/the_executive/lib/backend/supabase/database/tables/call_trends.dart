import '../database.dart';

class CallTrendsTable extends SupabaseTable<CallTrendsRow> {
  @override
  String get tableName => 'call_trends';

  @override
  CallTrendsRow createRow(Map<String, dynamic> data) => CallTrendsRow(data);
}

class CallTrendsRow extends SupabaseDataRow {
  CallTrendsRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => CallTrendsTable();

  int get id => getField<int>('id')!;
  set id(int value) => setField<int>('id', value);

  String get dayName => getField<String>('day_name')!;
  set dayName(String value) => setField<String>('day_name', value);

  int get callCount => getField<int>('call_count')!;
  set callCount(int value) => setField<int>('call_count', value);

  DateTime? get createdAt => getField<DateTime>('created_at');
  set createdAt(DateTime? value) => setField<DateTime>('created_at', value);
}
