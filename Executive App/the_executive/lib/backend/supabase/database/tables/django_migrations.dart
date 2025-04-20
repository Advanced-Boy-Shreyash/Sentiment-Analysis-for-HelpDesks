import '../database.dart';

class DjangoMigrationsTable extends SupabaseTable<DjangoMigrationsRow> {
  @override
  String get tableName => 'django_migrations';

  @override
  DjangoMigrationsRow createRow(Map<String, dynamic> data) =>
      DjangoMigrationsRow(data);
}

class DjangoMigrationsRow extends SupabaseDataRow {
  DjangoMigrationsRow(Map<String, dynamic> data) : super(data);

  @override
  SupabaseTable get table => DjangoMigrationsTable();

  int get id => getField<int>('id')!;
  set id(int value) => setField<int>('id', value);

  String get app => getField<String>('app')!;
  set app(String value) => setField<String>('app', value);

  String get name => getField<String>('name')!;
  set name(String value) => setField<String>('name', value);

  DateTime get applied => getField<DateTime>('applied')!;
  set applied(DateTime value) => setField<DateTime>('applied', value);
}
