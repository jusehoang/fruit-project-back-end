import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
const YAML_CONFIF_FILE = '../../../environment.yml';

export default () => {
    return yaml.load(readFileSync(join(__dirname, YAML_CONFIF_FILE), 'utf8')) as Record<string, any>;
}
