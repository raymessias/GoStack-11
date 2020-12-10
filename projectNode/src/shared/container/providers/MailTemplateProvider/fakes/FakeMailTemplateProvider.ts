import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO'
import IMailtemplateProvider from '../models/IMailTemplateProvider'

class FakeMailTemplateProvider implements IMailtemplateProvider {
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template
  }
}

export default FakeMailTemplateProvider
