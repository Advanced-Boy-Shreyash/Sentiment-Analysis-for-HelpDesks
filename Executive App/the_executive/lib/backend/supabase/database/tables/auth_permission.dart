import '../database.dart';

class AuthPermissionTable extends SupabaseTable<AuthPermissionRow> {
  @override
  String get tableName => 'auth_permission';

  @override
  AuthPermissionRow createRow(Map<String, dynamic> data) =>
      AuthPermissionRow(data);
}

class AuthPermissionRow extends SupabaseDataRow {
  AuthPermissionRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => AuthPermissionTable();

  int get id => getField<int>('id')!;
  set id(int value) => setField<int>('id', value);

  String get name => getField<String>('name')!;
  set name(String value) => setField<String>('name', value);

  int get contentTypeId => getField<int>('content_type_id')!;
  set contentTypeId(int value) => setField<int>('content_type_id', value);

  String get codename => getField<String>('codename')!;
  set codename(String value) => setField<String>('codename', value);
}
