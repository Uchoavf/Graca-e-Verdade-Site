"""
Extrai texto de arquivos .docx e gera posts Markdown para o blog.
.docx é um ZIP com XML — não precisa de bibliotecas externas.

Uso: python3 scripts/extrair_artigos.py
"""

import zipfile
import xml.etree.ElementTree as ET
import os
import re
import json

# Namespace do Word
NS = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'

def extract_text(docx_path):
    """Extrai texto puro de um .docx"""
    paragraphs = []
    with zipfile.ZipFile(docx_path) as z:
        tree = ET.parse(z.open('word/document.xml'))
        root = tree.getroot()
        for p in root.iter(f'{NS}p'):
            texts = []
            for t in p.iter(f'{NS}t'):
                if t.text:
                    texts.append(t.text)
            if texts:
                paragraphs.append(''.join(texts))
    return paragraphs

def guess_category(text):
    """Tenta adivinhar a categoria baseada no conteúdo"""
    t = text.lower()
    if 'pastor' in t or 'ministério' in t or 'igreja' in t:
        return 'teologia'
    if 'oração' in t or 'devocional' in t:
        return 'devocional'
    if 'casamento' in t or 'marido' in t or 'esposa' in t or 'família' in t:
        return 'vida-crista'
    return 'estudo-biblico'

def clean_text(text):
    """Limpa o texto removendo metadados acadêmicos e formatando"""
    # Remove linhas muito curtas (metadados isolados)
    lines = text.split('\n')
    cleaned = []
    skip_until_body = False

    for i, line in enumerate(lines):
        stripped = line.strip()
        if not stripped:
            if cleaned and cleaned[-1] != '':
                cleaned.append('')
            continue

        # Remove cabeçalhos de página
        if stripped.startswith('INSTITUTO BÍBLICO') or stripped.startswith('IBADEM'):
            continue
        if stripped.startswith('Ewerton Uchoa') or 'Uchoa' in stripped and len(stripped) < 50:
            continue
        if stripped.startswith('Lattes:') or stripped.startswith('ORCID:'):
            continue
        if re.match(r'^\d{4}$', stripped):  # Page number
            continue

        # Replace tabs/multiple spaces
        stripped = re.sub(r'\s+', ' ', stripped)
        cleaned.append(stripped)

    # Remove empty lines from start
    while cleaned and not cleaned[0]:
        cleaned.pop(0)

    return '\n\n'.join(
        p for p in '\n'.join(cleaned).split('\n\n')
        if p.strip() and len(p.strip()) > 10
    )

def generate_frontmatter(paragraphs, filename, slug):
    """Gera frontmatter YAML baseado no conteúdo"""
    full_text = '\n'.join(paragraphs)

    # Mapeamento de títulos por arquivo
    TITLES = {
        'o-papel-do-pastor': 'As Funções e o Papel do Pastor nos Dias de Hoje',
        'economia-do-reino-at': 'A Economia do Reino: Princípios Econômicos no Antigo Testamento',
        'economia-do-reino-nt': 'A Economia do Reino: Princípios Econômicos no Novo Testamento',
        'economia-do-reino-comparada': 'A Economia do Reino: Continuidade e Ruptura entre os Testamentos',
        'casamento-biblico': 'A Relação entre Marido e Mulher à Luz da Bíblia',
    }
    title = TITLES.get(slug, paragraphs[0].strip())

    # Encontrar o resumo (primeiro parágrafo longo após RESUMO)
    description = ''
    for i, p in enumerate(paragraphs):
        if 'RESUMO' in p.upper():
            # Pegar o próximo parágrafo longo
            for j in range(i+1, min(i+5, len(paragraphs))):
                if len(paragraphs[j]) > 100:
                    description = paragraphs[j][:250].strip()
                    break
            break

    if not description:
        for p in paragraphs[:30]:
            if len(p) > 100 and 'RESUMO' not in p.upper():
                description = p[:250].strip()
                break

    # Palavras-chave do resumo
    keywords = []
    for p in paragraphs[:30]:
        match = re.search(r'palavras?-chave:?\s*(.+)', p.lower())
        if match:
            raw = match.group(1).replace('.', ';')
            keywords = [k.strip().strip(';.,') for k in re.split(r'[;,]', raw) if k.strip()]
            break

    if not keywords:
        words = re.findall(r'\w+', title.lower())
        stop = {'para', 'como', 'sobre', 'entre', 'pelo', 'pela', 'com', 'sem', 'nos', 'nas', 'dos', 'das', 'uma', 'no', 'na', 'ao', 'aos', 'as', 'os', 'um', 'e', 'de', 'da', 'do', 'que', 'à', 'se'}
        keywords = [w for w in words if len(w) > 3 and w not in stop][:5]

    category = guess_category(full_text)

    return {
        'title': title.strip(),
        'date': '2026-06-25',
        'description': description.strip(),
        'tags': keywords[:6],
        'category': category,
        'author': 'Graça & Verdade',
        'featured': False,
    }

def paragraphs_to_markdown(paragraphs, skip_first=0):
    """Converte parágrafos para Markdown"""
    metadata_patterns = [
        r'^INSTITUTO BÍBLICO',
        r'^IBADEM',
        r'^Ewerton Uchô?a',
        r'^Lattes:',
        r'^ORCID:',
        r'^http',
        r'^Palavras?-chave',
        r'^Diácono',
        r'^Economista',
        r'^Pós-graduação',
        r'^Servidor Público',
        r'^Fiscal Titular',
        r'^Judicial',
        r'^ANANINDEUA',
        r'^\d{4}$',  # Year/standalone number
        r'^Especialista em',
        r'^Graduação em',
    ]
    combined = re.compile('|'.join(metadata_patterns))

    output = []
    started = False

    for i, p in enumerate(paragraphs[skip_first:]):
        stripped = p.strip()
        if not stripped:
            output.append('')
            continue

        if not started:
            if 'RESUMO' in stripped.upper() or len(stripped) > 80:
                started = True
            else:
                continue

        if combined.match(stripped):
            continue

        if re.match(r'^\d{1,4}$', stripped):
            continue

        # Headers (section titles like "2.1 Funções", "3 CONCLUSÃO")
        if re.match(r'^[0-9]+\.?\s+[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ]{3,}', stripped):
            output.append(f'## {stripped}')
        elif re.match(r'^[0-9]+\.[0-9]+\.?\s+', stripped):
            output.append(f'### {stripped}')
        elif stripped in ('REFERÊNCIAS', 'REFERÊNCIA', 'REFERENCIAS'):
            output.append(f'## {stripped}')
        elif stripped == 'RESUMO':
            output.append(f'**Resumo**\n')
        else:
            output.append(stripped)

    return '\n\n'.join(output)

def main():
    artigos_dir = '/tmp/opencode/artigos-luz-biblia'
    output_dir = '/tmp/opencode/graca-e-verdade/src/posts'

    articles = [
        ('Artigo_O_Papel_do_Pastor.docx', 'o-papel-do-pastor'),
        ('Artigo_Economia_do_Reino.docx', 'economia-do-reino-at'),
        ('Artigo_Economia_do_Reino_NT.docx', 'economia-do-reino-nt'),
        ('Artigo_Economia_Comparada.docx', 'economia-do-reino-comparada'),
        ('Artigo_Casamento_Biblico.docx', 'casamento-biblico'),
    ]

    for docx_file, slug in articles:
        path = os.path.join(artigos_dir, docx_file)
        if not os.path.exists(path):
            print(f'Arquivo não encontrado: {path}')
            continue

        print(f'Processando: {docx_file} → {slug}.md')

        paragraphs = extract_text(path)
        full_text = '\n'.join(paragraphs)

        # Generate frontmatter
        fm = generate_frontmatter(paragraphs, docx_file, slug)

        # Generate Markdown body
        # Skip first 10 paragraphs (cover, author info, etc.)
        body = paragraphs_to_markdown(paragraphs, skip_first=15)

        # Build the Markdown file
        md_content = '---\n'
        for key, val in fm.items():
            if isinstance(val, list):
                if len(val) == 0:
                    md_content += f'{key}: []\n'
                else:
                    md_content += f'{key}:\n'
                    for v in val:
                        md_content += f'  - "{v}"\n'
            elif isinstance(val, bool):
                md_content += f'{key}: {str(val).lower()}\n'
            else:
                md_content += f'{key}: "{val}"\n'
        md_content += '---\n\n'
        md_content += body

        out_path = os.path.join(output_dir, f'{slug}.md')
        os.makedirs(output_dir, exist_ok=True)
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(md_content)

        print(f'  ✅ {len(body)} caracteres — {slug}.md')

    print('\nArtigos convertidos com sucesso!')

if __name__ == '__main__':
    main()
