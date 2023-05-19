import {
  TemplateKoma,
  TemplateTimetable,
  University,
  User,
} from "@prisma/client";

export type TemplateTimetableWithAll = TemplateTimetable & {
  university: University | null;
  templateKoma: TemplateKoma[];
  user: User | null;
};
