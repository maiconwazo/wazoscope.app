interface UserPeopleApi {
  genders: GenderPeopleApi[];
  birthdays: BirthdayPeopleApi[];
}

interface GenderPeopleApi {
  metadata: Metadata;
  value: string;
  formattedValue: string;
}

interface BirthdayPeopleApi {
  metadata: Metadata;
  date: DatePeopleApi;
}

interface DatePeopleApi {
  year: number;
  month: number;
  day: number;
}

interface Metadata {
  primary: boolean;
  source: Source;
}

interface Source {
  type: string;
  id: string;
}
