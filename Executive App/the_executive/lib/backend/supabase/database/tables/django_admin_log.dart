import '../database.dart';

class DjangoAdminLogTable extends SupabaseTable<DjangoAdminLogRow> {
  @override
  String get tableName => 'django_admin_log';

  @override
  DjangoAdminLogRow createRow(Map<String, dynamic> data) =>
      DjangoAdminLogRow(data);
}

class DjangoAdminLogRow extends SupabaseDataRow {
  DjangoAdminLogRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => DjangoAdminLogTable();

  int get id => getField<int>('id')!;
  set id(int value) => setField<int>('id', value);

  DateTime get actionTime => getField<DateTime>('action_time')!;
  set actionTime(DateTime value) => setField<DateTime>('action_time', value);

  String? get objectId => getField<String>('object_id');
  set objectId(String? value) => setField<String>('object_id', value);

  String get objectRepr => getField<String>('object_repr')!;
  set objectRepr(String value) => setField<String>('object_repr', value);

  int get actionFlag => getField<int>('action_flag')!;
  set actionFlag(int value) => setField<int>('action_flag', value);

  String get changeMessage => getField<String>('change_message')!;
  set changeMessage(String value) => setField<String>('change_message', value);

  int? get contentTypeId => getField<int>('content_type_id');
  set contentTypeId(int? value) => setField<int>('content_type_id', value);

  int get userId => getField<int>('user_id')!;
  set userId(int value) => setField<int>('user_id', value);
}
