import { Search } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const sectors = ['All Sectors', 'Infrastructure', 'Energy', 'Healthcare', 'ICT', 'Defense']
const budgetOptions = [
    { value: 'under-1', label: 'Under $1M' },
    { value: '1-50', label: '$1M—$50M' },
    { value: '50-500', label: '$50M—$500M' },
    { value: '500-plus', label: '$500M+' },
]
const authorityOptions = ['Roads & Highways Dept', 'ICT Ministry', 'Ministry of Health']

export type BrowseFilterProps = {
    sector: string
    onSectorChange: (value: string) => void
    query: string
    onQueryChange: (value: string) => void
    budgets: string[]
    onBudgetToggle: (value: string) => void
    deadline: string
    onDeadlineChange: (value: string) => void
    authorities: string[]
    onAuthorityToggle: (value: string) => void
    idPrefix?: string
}

export function BrowseFilters({ sector, onSectorChange, query, onQueryChange, budgets, onBudgetToggle, deadline, onDeadlineChange, authorities, onAuthorityToggle, idPrefix = 'desktop' }: BrowseFilterProps) {
    return (
        <FieldGroup>
            <Field>
                <FieldLabel htmlFor={`${idPrefix}-refine`}>Search filters</FieldLabel>
                <InputGroup>
                    <InputGroupAddon><Search aria-hidden="true" /></InputGroupAddon>
                    <InputGroupInput id={`${idPrefix}-refine`} value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Refine results..." />
                </InputGroup>
            </Field>
            <FieldSet>
                <FieldLegend variant="label">Sectors</FieldLegend>
                <ToggleGroup type="single" value={sector} onValueChange={(value) => value && onSectorChange(value)} className="flex flex-wrap justify-start">
                    {sectors.map((item) => <ToggleGroupItem key={item} value={item} size="sm" className="rounded-full">{item}</ToggleGroupItem>)}
                </ToggleGroup>
            </FieldSet>
            <FieldSet>
                <FieldLegend variant="label">Estimated value</FieldLegend>
                <FieldGroup className="gap-3">
                    {budgetOptions.map((budget, index) => {
                        const id = `${idPrefix}-budget-${index}`
                        return <Field key={budget.value} orientation="horizontal"><Checkbox id={id} checked={budgets.includes(budget.value)} onCheckedChange={() => onBudgetToggle(budget.value)} /><FieldLabel htmlFor={id} className="font-normal">{budget.label}</FieldLabel></Field>
                    })}
                </FieldGroup>
            </FieldSet>
            <Field>
                <FieldLabel>Submission deadline</FieldLabel>
                <Select value={deadline} onValueChange={onDeadlineChange}>
                    <SelectTrigger><SelectValue placeholder="Choose deadline" /></SelectTrigger>
                    <SelectContent><SelectGroup><SelectItem value="7">This week</SelectItem><SelectItem value="30">Next 30 days</SelectItem><SelectItem value="any">Any date</SelectItem></SelectGroup></SelectContent>
                </Select>
            </Field>
            <FieldSet>
                <FieldLegend variant="label">Issuing authority</FieldLegend>
                <FieldGroup className="gap-3">
                    {authorityOptions.map((authority, index) => {
                        const id = `${idPrefix}-authority-${index}`
                        return <Field key={authority} orientation="horizontal"><Checkbox id={id} checked={authorities.includes(authority)} onCheckedChange={() => onAuthorityToggle(authority)} /><FieldLabel htmlFor={id} className="font-normal">{authority}</FieldLabel></Field>
                    })}
                </FieldGroup>
            </FieldSet>
        </FieldGroup>
    )
}
