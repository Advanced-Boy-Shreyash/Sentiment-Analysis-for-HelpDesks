import '../database.dart';

class DashboardStatsTable extends SupabaseTable<DashboardStatsRow> {
  @override
  String get tableName => 'dashboard_stats';

  @override
  DashboardStatsRow createRow(Map<String, dynamic> data) =>
      DashboardStatsRow(data);
}

class DashboardStatsRow extends SupabaseDataRow {
  DashboardStatsRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => DashboardStatsTable();

  int get id => getField<int>('id')!;
  set id(int value) => setField<int>('id', value);

  String get statName => getField<String>('stat_name')!;
  set statName(String value) => setField<String>('stat_name', value);

  double get statValue => getField<double>('stat_value')!;
  set statValue(double value) => setField<double>('stat_value', value);

  double? get trendValue => getField<double>('trend_value');
  set trendValue(double? value) => setField<double>('trend_value', value);

  bool? get trendIsPositive => getField<bool>('trend_is_positive');
  set trendIsPositive(bool? value) =>
      setField<bool>('trend_is_positive', value);

  DateTime get statDate => getField<DateTime>('stat_date')!;
  set statDate(DateTime value) => setField<DateTime>('stat_date', value);

  DateTime? get createdAt => getField<DateTime>('created_at');
  set createdAt(DateTime? value) => setField<DateTime>('created_at', value);
}
