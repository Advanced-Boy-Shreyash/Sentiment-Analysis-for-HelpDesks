import '../database.dart';

class AuthGroupPermissionsTable extends SupabaseTable<AuthGroupPermissionsRow> {
  @override
  String get tableName => 'auth_group_permissions';

  @override
  AuthGroupPermissionsRow createRow(Map<String, dynamic> data) =>
      AuthGroupPermissionsRow(data);
}

class AuthGroupPermissionsRow extends SupabaseDataRow {
  AuthGroupPermissionsRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => AuthGroupPermissionsTable();

  int get id => getField<int>('id')!;
  set id(int value) => setField<int>('id', value);

  int get groupId => getField<int>('group_id')!;
  set groupId(int value) => setField<int>('group_id', value);

  int get permissionId => getField<int>('permission_id')!;
  set permissionId(int value) => setField<int>('permission_id', value);
}
