import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import fs from 'fs';
import path from 'path';

export function loadEnv() {
  const env = process.env.NODE_ENV;

  let specificFile = '.env.local';
  if (env === 'test') {
    specificFile = '.env.test';
  } else if (env === 'compose' || env === 'docker' || env === 'production') {
    specificFile = '.env.compose';
  } else if (env === 'local' || env === 'development') {
    specificFile = '.env.local';
  }

  // 1. Prioridade para arquivos .env comuns (se existir no diretório atual ou raiz)
  const commonPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(commonPath)) {
    const commonEnvs = dotenv.config({ path: commonPath });
    dotenvExpand.expand(commonEnvs);
  }

  // 2. Carrega o arquivo específico do ambiente (.env.local, .env.compose, .env.test)
  // O dotenv não sobrescreve variáveis já definidas pelo .env comum, garantindo a prioridade do comum
  const specificPath = path.resolve(process.cwd(), specificFile);
  if (fs.existsSync(specificPath)) {
    const specificEnvs = dotenv.config({ path: specificPath });
    dotenvExpand.expand(specificEnvs);
  } else {
    // Fallback relativo
    const fallbackEnvs = dotenv.config({ path: specificFile });
    dotenvExpand.expand(fallbackEnvs);
  }

  // Expande variáveis interpoladas no process.env (ex: DATABASE_URL com ${POSTGRES_USER})
  dotenvExpand.expand({ parsed: process.env } as any);
}
