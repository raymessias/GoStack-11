import { container } from 'tsyringe'

import IStoreProvider from './StorageProvider/models/IStorageProvider'
import DiskStoreProvider from './StorageProvider/implementations/DiskStorageProvider'

container.registerSingleton<IStoreProvider>(
  'StorageProvider',
  DiskStoreProvider,
)
