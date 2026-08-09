import { Download, Eye, FileSpreadsheet, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function DocumentItem({ name, type, meta, size }: { name: string; type: 'pdf' | 'xlsx' | 'docx'; meta: string; size: string }) {
    const Icon = type === 'xlsx' ? FileSpreadsheet : FileText
    return (
        <Card size="sm">
            <CardHeader className="grid-cols-[auto_1fr] items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary"><Icon className="size-5" /></span>
                <div><CardTitle className="text-sm">{name}</CardTitle><p className="mt-1 text-xs text-muted-foreground">{meta}</p></div>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">{size}</CardContent>
            <CardFooter className="justify-end gap-2"><Button variant="outline" size="sm"><Eye data-icon="inline-start" />Preview</Button><Button size="sm"><Download data-icon="inline-start" />Download</Button></CardFooter>
        </Card>
    )
}
