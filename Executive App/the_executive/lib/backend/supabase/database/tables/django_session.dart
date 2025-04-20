import '../database.dart';

class DjangoSessionTable extends SupabaseTable<DjangoSessionRow> {
  @override
  String get tableName => 'django_session';

  @override
  DjangoSessionRow createRow(Map<String, dynamic> data) =>
      DjangoSessionRow(data);
}

class DjangoSessionRow extends SupabaseDataRow {
  DjangoSessionRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => DjangoSessionTable();

  String get sessionKey => getField<String>('session_key')!;
  set sessionKey(String value) => setField<String>('session_key', value);

  String get sessionData => getField<String>('session_data')!;
  set sessionData(String value) => setField<String>('session_data', value);

  DateTime get expireDate => getField<DateTime>('expire_date')!;
  set expireDate(DateTime value) => setField<DateTime>('expire_date', value);
}
