import { TransitionStatus } from 'react-transition-group/Transition'

type ClassNameMapper = PartialRecord<Partial<TransitionStatus>, string | undefined>

export type { ClassNameMapper }
