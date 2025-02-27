import { Test, TestingModule } from '@nestjs/testing'
import { CoffeesService } from './coffees.service'
import { DataSource, ObjectLiteral, Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Coffee } from './entities/coffee.entity'
import { Flavor } from './entities/flavor.entity'
import { getConfigToken } from '@nestjs/config'
import { NotFoundException } from '@nestjs/common'

type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>

const createMockRepository = <
  T extends ObjectLiteral = any,
>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
})

describe('CoffeesService', () => {
  let service: CoffeesService
  let coffeeRepository: MockRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        { provide: getConfigToken('coffees'), useValue: {} },
      ],
    }).compile()

    service = module.get<CoffeesService>(CoffeesService)
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1'
        const expectedCoffee = {}

        coffeeRepository.findOne!.mockResolvedValue(expectedCoffee)
        const coffee = await service.findOne(coffeeId)
        expect(coffee).toEqual(expectedCoffee)
      })
    })

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const coffeeId = '1'
        coffeeRepository.findOne!.mockResolvedValue(undefined)

        try {
          await service.findOne(coffeeId)
          expect(false).toBeTruthy()
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException)
          expect(error.message).toEqual(`Coffee #${coffeeId} not found`)
        }
      })
    })
  })
})
