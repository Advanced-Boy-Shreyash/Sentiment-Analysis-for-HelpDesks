import '../database.dart';

class DjangoContentTypeTable extends SupabaseTable<DjangoContentTypeRow> {
  @override
  String get tableName => 'django_content_type';

  @override
  DjangoContentTypeRow createRow(Map<String, dynamic> data) =>
      DjangoContentTypeRow(data);
}

class DjangoContentTypeRow extends SupabaseDataRow {
  DjangoContentTypeRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => DjangoContentTypeTable();

  int get id => getField<int>('id')!;
  set id(int value) => setField<int>('id', value);

  String get appLabel => getField<String>('app_label')!;
  set appLabel(String value) => setField<String>('app_label', value);

  String get model => getField<String>('model')!;
  set model(String value) => setField<String>('model', value);
}
