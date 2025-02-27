import { Test, TestingModule } from '@nestjs/testing'
import { CoffeesService } from './coffees.service'
import { DataSource } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Coffee } from './entities/coffee.entity'
import { Flavor } from './entities/flavor.entity'
import { getConfigToken } from '@nestjs/config'

describe('CoffeesService', () => {
  let service: CoffeesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Coffee), useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: {} },
        { provide: getConfigToken('coffees'), useValue: {} },
      ],
    }).compile()

    service = module.get<CoffeesService>(CoffeesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
