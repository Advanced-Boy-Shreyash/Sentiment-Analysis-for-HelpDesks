import '../database.dart';

class AuthUserUserPermissionsTable
    extends SupabaseTable<AuthUserUserPermissionsRow> {
  @override
  String get tableName => 'auth_user_user_permissions';

  @override
  AuthUserUserPermissionsRow createRow(Map<String, dynamic> data) =>
      AuthUserUserPermissionsRow(data);
}

class AuthUserUserPermissionsRow extends SupabaseDataRow {
  AuthUserUserPermissionsRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => AuthUserUserPermissionsTable();

  int get id => getField<int>('id')!;
  set id(int value) => setField<int>('id', value);

  int get userId => getField<int>('user_id')!;
  set userId(int value) => setField<int>('user_id', value);

  int get permissionId => getField<int>('permission_id')!;
  set permissionId(int value) => setField<int>('permission_id', value);
}
