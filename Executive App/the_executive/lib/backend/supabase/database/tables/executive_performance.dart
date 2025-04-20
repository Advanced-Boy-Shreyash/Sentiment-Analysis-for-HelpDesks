import '../database.dart';

class ExecutivePerformanceTable extends SupabaseTable<ExecutivePerformanceRow> {
  @override
  String get tableName => 'executive_performance';

  @override
  ExecutivePerformanceRow createRow(Map<String, dynamic> data) =>
      ExecutivePerformanceRow(data);
}

class ExecutivePerformanceRow extends SupabaseDataRow {
  ExecutivePerformanceRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => ExecutivePerformanceTable();

  int get id => getField<int>('id')!;
  set id(int value) => setField<int>('id', value);

  String? get executiveId => getField<String>('executive_id');
  set executiveId(String? value) => setField<String>('executive_id', value);

  String get executiveName => getField<String>('executive_name')!;
  set executiveName(String value) => setField<String>('executive_name', value);

  String get status => getField<String>('status')!;
  set status(String value) => setField<String>('status', value);

  int get performanceScore => getField<int>('performance_score')!;
  set performanceScore(int value) => setField<int>('performance_score', value);

  int get totalCalls => getField<int>('total_calls')!;
  set totalCalls(int value) => setField<int>('total_calls', value);

  int get resolvedCalls => getField<int>('resolved_calls')!;
  set resolvedCalls(int value) => setField<int>('resolved_calls', value);

  double get avgHandlingTime => getField<double>('avg_handling_time')!;
  set avgHandlingTime(double value) =>
      setField<double>('avg_handling_time', value);

  double get satisfactionScore => getField<double>('satisfaction_score')!;
  set satisfactionScore(double value) =>
      setField<double>('satisfaction_score', value);

  DateTime? get createdAt => getField<DateTime>('created_at');
  set createdAt(DateTime? value) => setField<DateTime>('created_at', value);
}
