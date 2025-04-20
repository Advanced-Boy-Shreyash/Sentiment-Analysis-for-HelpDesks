import '../database.dart';

class AuthUserTable extends SupabaseTable<AuthUserRow> {
  @override
  String get tableName => 'auth_user';

  @override
  AuthUserRow createRow(Map<String, dynamic> data) => AuthUserRow(data);
}

class AuthUserRow extends SupabaseDataRow {
  AuthUserRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => AuthUserTable();

  int get id => getField<int>('id')!;
  set id(int value) => setField<int>('id', value);

  String get password => getField<String>('password')!;
  set password(String value) => setField<String>('password', value);

  DateTime? get lastLogin => getField<DateTime>('last_login');
  set lastLogin(DateTime? value) => setField<DateTime>('last_login', value);

  bool get isSuperuser => getField<bool>('is_superuser')!;
  set isSuperuser(bool value) => setField<bool>('is_superuser', value);

  String get username => getField<String>('username')!;
  set username(String value) => setField<String>('username', value);

  String get firstName => getField<String>('first_name')!;
  set firstName(String value) => setField<String>('first_name', value);

  String get lastName => getField<String>('last_name')!;
  set lastName(String value) => setField<String>('last_name', value);

  String get email => getField<String>('email')!;
  set email(String value) => setField<String>('email', value);

  bool get isStaff => getField<bool>('is_staff')!;
  set isStaff(bool value) => setField<bool>('is_staff', value);

  bool get isActive => getField<bool>('is_active')!;
  set isActive(bool value) => setField<bool>('is_active', value);

  DateTime get dateJoined => getField<DateTime>('date_joined')!;
  set dateJoined(DateTime value) => setField<DateTime>('date_joined', value);
}
