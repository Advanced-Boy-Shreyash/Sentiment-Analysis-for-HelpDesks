import '../database.dart';

class AuthGroupTable extends SupabaseTable<AuthGroupRow> {
  @override
  String get tableName => 'auth_group';

  @override
  AuthGroupRow createRow(Map<String, dynamic> data) => AuthGroupRow(data);
}

class AuthGroupRow extends SupabaseDataRow {
  AuthGroupRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => AuthGroupTable();

  int get id => getField<int>('id')!;
  set id(int value) => setField<int>('id', value);

  String get name => getField<String>('name')!;
  set name(String value) => setField<String>('name', value);
}
