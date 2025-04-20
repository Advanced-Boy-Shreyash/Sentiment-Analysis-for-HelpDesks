import '../database.dart';

class AuthUserGroupsTable extends SupabaseTable<AuthUserGroupsRow> {
  @override
  String get tableName => 'auth_user_groups';

  @override
  AuthUserGroupsRow createRow(Map<String, dynamic> data) =>
      AuthUserGroupsRow(data);
}

class AuthUserGroupsRow extends SupabaseDataRow {
  AuthUserGroupsRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => AuthUserGroupsTable();

  int get id => getField<int>('id')!;
  set id(int value) => setField<int>('id', value);

  int get userId => getField<int>('user_id')!;
  set userId(int value) => setField<int>('user_id', value);

  int get groupId => getField<int>('group_id')!;
  set groupId(int value) => setField<int>('group_id', value);
}
