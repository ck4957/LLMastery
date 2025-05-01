# Content Storage Architecture

This document outlines the content storage approach for LLMastery, explaining how lesson content is stored, retrieved, and managed.

## Overview

LLMastery uses a hybrid storage approach:

1. **Database Storage**: For metadata and small content
2. **Supabase Storage**: For larger lesson content, versioned files, and rich media

This approach provides better scalability, easier content management, and a clear separation between content and metadata.

## Storage Structure

### Supabase Storage Organization

```
lesson-content/
├── lessons/
│   ├── fundamentals/
│   │   ├── beginner/
│   │   │   └── <lesson_id>_v<version>.md
│   │   ├── intermediate/
│   │   └── advanced/
│   ├── prompting/
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   └── ...other categories...
├── resources/
│   ├── images/
│   ├── code_samples/
│   └── attachments/
└── community/
    └── user_contributions/
        └── <user_id>/
```

### Naming Convention

Files follow this naming pattern:

- `<lesson_id>_v<version>.<format>`
  - Example: `550e8400-e29b-41d4-a716-446655440000_v1.md`

## Database Schema

The lessons table has been extended with new fields to support this storage model:

```sql
ALTER TABLE lessons
  ALTER COLUMN content DROP NOT NULL,
  ADD COLUMN content_storage_path TEXT,
  ADD COLUMN source_type TEXT, -- 'expert', 'ai-assisted', 'external', 'community'
  ADD COLUMN external_source_url TEXT,
  ADD COLUMN contributor_id UUID REFERENCES user_profiles(user_id),
  ADD COLUMN license_type TEXT,
  ADD COLUMN attribution_text TEXT;
```

## Content Retrieval

Content is retrieved using the `getLessonById` function in `lessons.ts` service:

```typescript
export async function getLessonById(id: string): Promise<Lesson | null> {
  // First fetch lesson metadata from database
  const { data, error } = await supabase
    .from("lessons")
    .select(`*, quizzes (*), challenges (*)`)
    .eq("id", id)
    .single();

  if (error) return null;

  // If content is stored in Supabase Storage, fetch it
  if (data && data.content_storage_path) {
    try {
      const { data: fileData, error: downloadError } = await supabase.storage
        .from("lesson-content")
        .download(data.content_storage_path);

      if (!downloadError) {
        const content = await fileData.text();
        return { ...data, content } as Lesson;
      }
    } catch (error) {
      console.error("Error downloading content:", error);
    }
  }

  return data as Lesson;
}
```

## Content Creation and Updates

When creating or updating content:

1. **New Content**:

   - Create the content file in markdown or appropriate format
   - Upload it to Supabase Storage following the naming convention
   - Store the path in the `content_storage_path` field

2. **Content Updates**:
   - Create a new version of the file (increment version number)
   - Upload to Supabase Storage
   - Update the `content_storage_path` and `content_version` fields

Example code for uploading content:

```typescript
async function uploadLessonContent(
  lessonId: string,
  content: string,
  version: number,
  category: string,
  level: string,
  format: string = "md"
): Promise<string> {
  const path = `lessons/${category}/${level}/${lessonId}_v${version}.${format}`;

  const { error } = await supabase.storage
    .from("lesson-content")
    .upload(path, content, {
      contentType: format === "md" ? "text/markdown" : "text/plain",
      upsert: false, // Prevents overwriting existing versions
    });

  if (error) throw error;

  return path;
}
```

## Content Source Options

LLMastery supports different content sources:

1. **Expert-Created Content**: High-quality, carefully crafted lessons by subject matter experts
2. **AI-Assisted Content**: Content drafted by AI and reviewed/refined by experts
3. **External Content**: Licensed or curated from trusted sources
4. **Community-Contributed**: Content submitted by community members (requires approval)

The `source_type` field in the lessons table tracks the origin of each lesson.

## Migration Strategy

For existing content:

1. Create a database backup before migration
2. Run the migration script to:
   - Generate files for existing content
   - Upload to Supabase Storage
   - Update database records with storage paths
3. Validate content displays correctly before removing database content

## Best Practices

1. **Version Control**: Always increment version number for content updates
2. **Offline Access**: Cache frequently accessed content on the client
3. **Error Handling**: Fallback to database content if storage fetching fails
4. **Content Validation**: Validate markdown/content before upload
5. **Permissions**: Use RLS policies to control content access
6. **Backup**: Regularly backup both database and storage
