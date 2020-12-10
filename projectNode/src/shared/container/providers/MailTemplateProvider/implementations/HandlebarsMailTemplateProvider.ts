import handlebars from 'handlebars'

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO'
import IMailtemplateProvider from '../models/IMailTemplateProvider'

class HandlebarsMailTemplateProvider implements IMailtemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template)

    return parseTemplate(variables)
  }
}

export default HandlebarsMailTemplateProvider
