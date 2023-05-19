import { TemplateKoma, TemplateTimetable } from "@prisma/client";

export type TemplateKomaWithAll = TemplateKoma & {
  templateTimetable: TemplateTimetable;
};
