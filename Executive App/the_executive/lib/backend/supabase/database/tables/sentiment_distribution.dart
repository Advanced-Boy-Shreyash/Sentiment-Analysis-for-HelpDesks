import '../database.dart';

class SentimentDistributionTable
    extends SupabaseTable<SentimentDistributionRow> {
  @override
  String get tableName => 'sentiment_distribution';

  @override
  SentimentDistributionRow createRow(Map<String, dynamic> data) =>
      SentimentDistributionRow(data);
}

class SentimentDistributionRow extends SupabaseDataRow {
  SentimentDistributionRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => SentimentDistributionTable();

  int get id => getField<int>('id')!;
  set id(int value) => setField<int>('id', value);

  String get sentimentType => getField<String>('sentiment_type')!;
  set sentimentType(String value) => setField<String>('sentiment_type', value);

  int get percentage => getField<int>('percentage')!;
  set percentage(int value) => setField<int>('percentage', value);

  DateTime? get createdAt => getField<DateTime>('created_at');
  set createdAt(DateTime? value) => setField<DateTime>('created_at', value);
}
